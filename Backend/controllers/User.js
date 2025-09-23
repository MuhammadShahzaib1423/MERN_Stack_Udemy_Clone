
const User = require('../models/user');

const registerUser = async ( req, res) =>{
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser = new User({
            name,email,password,role
        })
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }
    catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });

        }
        const user = await User.findOne({
            email,password
        });
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        

    }
    catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}