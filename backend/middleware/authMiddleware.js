const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get the token from the request's headers
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token with your secret key (replace 'YOUR_SECRET_KEY' with your actual secret key)
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return an unauthorized response
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = verifyToken;
