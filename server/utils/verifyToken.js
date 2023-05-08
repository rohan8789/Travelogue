import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const cooki = req.cookies.refreshToken;
  console.log(req);
  console.log(cooki);
  if (!cooki) {
    return res.status(404).json({ message: "Unauthorized " });
  }

  jwt.verify(cooki, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      
      res.status(400).json({ message: "Invalid TOken" });
    }
    req.id = user.id;
  });
  next();
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGUxNDA5OWVjNjk2NDAwM2MwODI3MCIsImlhdCI6MTY4MzQ0OTUzOH0.Uj9sMV39vbNus47uNlU_Qyzmc2jDn9zqMzyqLX3_r8E