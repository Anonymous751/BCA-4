export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRoles = req.user.roles; // from requireAuth middleware
    const hasAccess = userRoles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
      return res.status(403).json({ error: "Forbidden. Reader don't have Permission to Create Blog" });
    }
    next();
  };
};
