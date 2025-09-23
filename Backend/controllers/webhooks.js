const { Webhook } = require("svix");
const User = require("../models/user.js");

// Api Controller function to manage clerk user with database
const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address, // Clerk gives `email_addresses`
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await User.create(userData);

        return res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);

        return res.status(200).json({
          success: true,
          message: "User updated successfully",
        });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      }

      default:
        return res.status(200).json({
          success: true,
          message: "Event ignored",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ✅ Correct CommonJS export
module.exports = { clerkWebhooks };
