// src/utils/menu.config.js
export const menuConfig = {
  Guest: [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ],
  Reader: [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
  ],
  Author: [
    { name: "Home", path: "/" },
    { name: "Create Blog", path: "/blogs/create" },
    { name: "Profile", path: "/profile" },
  ],
  Admin: [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Blogs", path: "/admin/blogs" },
  ],
};
