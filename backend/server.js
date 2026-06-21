const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bcrypt=require("bcryptjs");
const authMiddleware = require("./middleware/auth");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const foodRoutes = require("./routes/foodRoutes");
const User=require("./models/User");
const app=express(); //express server creating(creates express application object)
const FoodItem = require("./models/Food");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Cloud Connected Successfully");
})
.catch((error)=>{
    console.log("MongoDB Connection Failed", error);
})

app.get("/",(req,res)=>{
    res.send("Backend server is running");
});
app.post("/api/register",async(req,res)=>{
    try{
        const{fullname,email,password}=req.body;
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({
                message:"Email already Registered",
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            fullname:fullname,
            email:email,
            password:hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            message:"Registration Successful",
        });
    }catch(error){
        res.status(500).json({
            message:"Registration failed",
            error:error.message
        });
    };
})

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: existingUser._id,
                fullname: existingUser.fullname,
                email: existingUser.email
            }
        });

    } catch (error) {
        console.log(error);


        res.status(500).json({
            message: "Login Failed",
            error: error.message
        });
    }
});

app.put("/api/change-password", authMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Change Password",
      error: error.message,
    });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const { name, category, quantity, expiryDate } = req.body;

    const item = new FoodItem({
      name,
      category,
      quantity,
      expiryDate,
    });

    await item.save();

    res.status(201).json({
      message: "Item Added Successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Add Item",
      error: error.message,
    });
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const items = await FoodItem.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetch Items",
      error: error.message,
    });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Item Updated Successfully",
      updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Update Item",
      error: error.message,
    });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Delete Item",
      error: error.message,
    });
  }
});
app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetch Profile",
      error: error.message,
    });
  }
});


app.put("/api/update-profile", authMiddleware, async (req, res) => {
  try {
    const { fullname } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.fullname = fullname;

    await user.save();

    res.status(200).json({
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Update Profile",
      error: error.message,
    });
  }
});

app.listen(process.env.PORT,()=>{
      console.log(`Server running on port ${process.env.PORT}`);
})