import jwt from "jsonwebtoken";
//When a middleware function is defined it typically takes 3 arguments res, req, next
const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: "false", message: err.message });
  }
};

export default authUser;
