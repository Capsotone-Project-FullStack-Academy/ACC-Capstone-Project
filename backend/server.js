const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const allUsers = require('../backend/data/AllUser');
const userCarts = require('../backend/data/usersCart');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Use body-parser middleware

app.get('/', (req, res) => {
  res.send('Hello from the ecommerce-backend!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve user data from your data source
  const user = allUsers.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Successful login, obtain the userId from user data
  const userId = user.id;

  // Find the user's cart data by matching userId
  const userCart = userCarts.find((cart) => cart.userId === userId);

  if (!userCart) {
    return res.status(404).json({ message: 'User cart not found' });
  }

  res.status(200).json({ success: true, user, userCart });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
