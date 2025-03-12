const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./lib/connectDB")
dotenv.config(); 

const postRoutes = require("./routes/post.route"); 
const commentRoutes = require("./routes/comment.route"); 

const app = express();

app.use(cors()); 


app.use(express.json());

connectDB();


app.use("/api/posts", postRoutes); 
app.use("/api/comments", commentRoutes);



app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
