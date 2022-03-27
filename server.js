const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


const verifyToken = require("./middleware/verify-token");

var corOptions = {
  origin: "https://localhost:8081",
};



app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



const directoryRouter = require("./routes/directoryRouter.js");
const authRouter = require("./routes/authRouter.js");

app.use("/api/auth", authRouter);
app.use("/api/directory", verifyToken, directoryRouter);




app.get("/", (req, res) => {
  res.json({ message: "Directory App. by Rahim Resul YAĞ" });
});



const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
  console.log(`server is runningon port ${PORT}`);
});
