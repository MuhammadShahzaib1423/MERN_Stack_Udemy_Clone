// server.js// Load environment variables
import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
;
import connectionDb from "./config/connectiondb.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import { educatorRouter } from "./routes/educatorroutes.js";
import { clerkMiddleware } from "@clerk/express";
import { connectCloudinary } from "./config/cloudinary.js";
import courseRouter from "./routes/course.js";
import userRoutes from "./routes/userroutes.js";
// Initialize express app
const app = express();
// Connect to database & cloudinary
connectionDb();
await connectCloudinary();
// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
// Routes
app.get("/", (req, res) => {
  res.send("API is running....");
});
app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use('/api/course',express.json(), courseRouter); 
app.use('/api/user', express.json(), userRoutes);
app.use('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
