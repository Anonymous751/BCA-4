// src/utils/menu.config.js
export const menuConfig = {
  Guest: [
<<<<<<< HEAD
     { name: "Blogs", path: "guest/blogs" },
=======
    { name: "Blogs", path: "guest/blogs" },
>>>>>>> 68ee815 (AlMost-85)
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ],
<<<<<<< HEAD
  Reader: [ // Explore Blogs / Favourites / Notiofications  / Profile / Change Password 
<<<<<<< HEAD
     { name: " Explore Blogs", path: "/blogs" },
     { name: " Favourites", path: "----" },
=======
     { name: " Explore Blogs", path: "/reader/blogs" },
     { name: " Favourites", path: "/reader/favourites" },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
     { name: "Notifications", path: "-----" },
    { name: "Settings", path: "" },
    { name: "Profile", path: "profile" },
  ],
  Author: [ // dashboard, create blog / my blogs / profile/ change-password / blog stats 
<<<<<<< HEAD
    { name: "Dashboard", path: "/author" },
    { name: "Create Blog", path: "/author/create-blog" },
     { name: "My Blogs", path: "/blogs" },
=======
    { name: "Dashboard", path: "/author/author-dashboard" },
    { name: "Create Blog", path: "/author/create-blog" },
     { name: "My Blogs", path: "/blogs/my-blog" },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
     { name: "Blog Stats", path: "----" },
    { name: "Profile", path: "profile" },
  ],
  Admin: [ // Dashboard / Blogs // Users / Profile / Settings / Change password / Logout 
    { name: "Dashboard", path: "/admin/dashboard" },
     { name: "Blogs", path: "/admin/blogs" },
    { name: "Users", path: "/admin/users" }, 
    { name:"Profile" , path: "/admin/profile"},
    { name:"Settings" , path: "/admin/settings"}

=======
  Reader: [
    // Explore Blogs / Favourites / Notiofications  / Profile / Change Password
    { name: " Explore Blogs", path: "/reader/blogs" },
    { name: " Favourites", path: "/reader/favourites" },
    { name: "Notifications", path: "-----" },
    { name: "Settings", path: "" },
    { name: "Profile", path: "profile" },
  ],
  Author: [
    // dashboard, create blog / my blogs / profile/ change-password / blog stats
    { name: "Dashboard", path: "/author/author-dashboard" },
    { name: "Create Blog", path: "/author/create-blog" },
    { name: "My Blogs", path: "/author/blogs/my-blog" },
    { name: "Blog Stats", path: "/author/stats" },
    { name: "Profile", path: "profile" },
  ],
  Admin: [
    // Dashboard / Blogs // Users / Profile / Settings / Change password / Logout
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Blogs", path: "/admin/blogs" },
    { name: "Users", path: "/admin/users" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Settings", path: "/admin/settings" },
>>>>>>> 68ee815 (AlMost-85)
  ],
};
