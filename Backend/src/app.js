const express = require("express");
require("dotenv").config();


const { connectDB } = require("./config/database");

const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
// app.get("/admin", adminAuth, (req, res) => {
//   console.log("admin is active");
//   res.send("admin is active access given");
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

//     const isUpdateAllowed = Object.keys(data).every((key) => {
//       ALLOWED_UPDATES.includes(key);
//     });

//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed for the requested values");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }

//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });

//     console.log(user);
//     res.send("User updated sucessfully");
//   } catch (err) {
//     res.send(400).send("Update Failed" + err.message);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete({ _id: userId });
//   } catch (err) {
//     res.send(400).send("Something went wrong" + err.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("Database is sucessfully connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is sucessfully listening to the server 1111...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected"+err);
  });
