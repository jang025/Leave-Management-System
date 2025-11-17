const roleCheck = (requiredRole) => {
  return (req, res, next) => {
    // check if user is authenticated
    if (!req.user || !req.user.role) {
      res.status(401).json({ msg: "Unauthorized: no valid token or role" });
      return;
    }
    // check if user has the right permissions
    if (req.user.role !== requiredRole) {
      res.status(403).json({ msg: "Forbidden: insufficient permissions" });
      return;
    }
    next();
  };
};

module.exports = { roleCheck };
