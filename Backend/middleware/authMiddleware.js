import { clerkClient } from "@clerk/express";

const protectEducator = async(req,res,next)=>{

    try{
       const { userId } = req.auth();
       console.log("User ID from auth:", userId);

        const user = await clerkClient.users.getUser(userId);
        if(user.publicMetadata.role !== "educator"){
            return res.status(403).json({ success: false, message: "Access denied. Educator role required." });
        }
        next();

    }
    catch(error){
        console.error("Error in educator middleware:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export default protectEducator;