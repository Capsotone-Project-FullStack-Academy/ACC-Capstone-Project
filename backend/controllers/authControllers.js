const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("./authMiddleware");
const userCarts = require("../data/usersCart");
const allUsers = require("../data/AllUser"); // Import user data

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Login route to generate and return a JWT token
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "" && password === "") {
    const user = { username: "validUser" };

    // Generate a JWT token and return it
    const token = jwt.sign(user, 'vR6$YwK@L$QXg7^zE#4t2pUx*');
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials." });
  }
});

app.get('/my-cart', (req, res) => {
  const { userId } = req.query;
  console.log('Received userId:', userId);

  // Attempt to find user cart...
  const userCart = userCarts.find((cart) => cart.userId === parseInt(userId));

  if (!userCart) {
    return res.status(404).json({ message: 'User cart not found' });
  }

  res.status(200).json({ userCart });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
