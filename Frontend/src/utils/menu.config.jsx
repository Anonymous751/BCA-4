// src/utils/menu.config.js
export const menuConfig = {
  Guest: [
     { name: "Blogs", path: "guest/blogs" },
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ],
  Reader: [ // Explore Blogs / Favourites / Notiofications  / Profile / Change Password 
     { name: " Explore Blogs", path: "/blogs" },
     { name: " Favourites", path: "----" },
     { name: "Notifications", path: "-----" },
    { name: "Settings", path: "" },
    { name: "Profile", path: "profile" },
  ],
  Author: [ // dashboard, create blog / my blogs / profile/ change-password / blog stats 
    { name: "Dashboard", path: "/author" },
    { name: "Create Blog", path: "/author/create-blog" },
     { name: "My Blogs", path: "/blogs" },
     { name: "Blog Stats", path: "----" },
    { name: "Profile", path: "profile" },
  ],
  Admin: [ // Dashboard / Blogs // Users / Profile / Settings / Change password / Logout 
    { name: "Dashboard", path: "/admin/dashboard" },
     { name: "Blogs", path: "/admin/blogs" },
    { name: "Users", path: "/admin/users" }, 
    { name:"Profile" , path: "/admin/profile"},
    { name:"Settings" , path: "/admin/settings"}

  ],
};
