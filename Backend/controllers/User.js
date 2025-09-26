import dotenv from "dotenv";
 dotenv.config();
import Course from "../models/course.js";

import User from "../models/user.js";
import { Purchase } from "../models/Purchase.js";
import Stripe from "stripe";

export const getUserData = async (req, res) =>{
    try{
        const userId = req.auth.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({user});
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

//Users Enrolled Courses with Lecture Links

export const userEnrolledCourses = async (req,res) =>{
    try{
            const userId = req.auth.userId;
            const userData = await User.findById(userId).populate('enrolledCourses');

res.json({success:true, enrolledCourses: userData.enrolledCourses});
    }
    catch(error){
        res.status(500).json({message:error.message})
    }


}

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res
        .status(404)
        .json({ success: false, message: "User or Course not found" });
    }

    // ✅ Correct discounted price
    const discountedPrice =
      courseData.coursePrice -
      (courseData.coursePrice * courseData.discount) / 100;

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: discountedPrice.toFixed(2), // store string for consistency
    };

    const newPurchase = await Purchase.create(purchaseData);

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
      
  

    const currency = process.env.CURRENCY?.toLowerCase() || "usd";

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          // ✅ Must be an integer in cents (smallest currency unit)
          unit_amount: Math.round(discountedPrice * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}loading/my-enrollments`,
      cancel_url: `${origin}/`,
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    res.status(200).json({
      success: true,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
