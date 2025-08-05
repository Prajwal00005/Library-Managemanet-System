import { verifyJWT } from "../utils/jwt.js";

const auth = async (req, res, next) => {
  try {
    let token;

    // 1. Check for token in cookies (commonly used in web apps)
    if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken;
    }

    // 2. Check for token in Authorization header (commonly used in APIs)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Extract token after "Bearer"
    }

    // 3. If no token is found, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not provided",
      });
    }

    // 4. Verify the token and decode the payload
    const decoded = verifyJWT(token);

    // 5. Attach decoded user info to the request object for later use
    req.user = decoded;

    // 6. Proceed to the next middleware or route
    next();
  } catch (err) {
    // Handle invalid or expired token
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

export default auth;
