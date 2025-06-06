import { Icon } from "@iconify/react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: <Icon icon="ri:dashboard-3-line" width="24" height="24" />,
    showTo: ["User", "center", "user"],
  },

  // {
  //   title: "Application",
  //   url: "/application",
  //   icon: <Icon icon="ri:dashboard-3-line" width="24" height="24" />,
  //   showTo: ["user"],
  // },
  // {
  //   title: "Parent Declaration",
  //   url: "/declration-form",
  //   icon: <Icon icon="ri:dashboard-3-line" width="24" height="24" />,
  //   showTo: ["user"],
  // },
  // {
  //   title: "Center",
  //   url: "/center",
  //   icon: (
  //     <Icon
  //       icon="fa6-solid:building-user"
  //       width="24"
  //       height="24"
  //       style={{ marginLeft: "2px" }}
  //     />
  //   ),
  //   showTo: ["admin"],
  // },

  // {
  //   title: "Agent List",
  //   url: "/agent-list",
  //   icon: (
  //     <Icon
  //       icon="lets-icons:user-box-duotone"
  //       width="29"
  //       height="29"
  //       style={{ marginLeft: "-5px" }}
  //     />
  //   ),
  //   showTo: ["User"],
  // },
  // {
  //   title: "Buyer List",
  //   url: "/parents-list",
  //   icon: (
  //     <Icon
  //       icon="lets-icons:user-box-duotone"
  //       width="29"
  //       height="29"
  //       style={{ marginLeft: "-5px" }}
  //     />
  //   ),
  //   showTo: ["User"],
  // },
  {
    title: "Exhibitor List",
    url: "/vendor-list",
    icon: (
      <Icon
        icon="lets-icons:user-box-duotone"
        width="29"
        height="29"
        style={{ marginLeft: "-5px" }}
      />
    ),
    showTo: ["User"],
  },
  {
    title: "Exhibitor Member",
    url: "/vendor-members",
    icon: (
      <Icon
        icon="lets-icons:user-box-duotone"
        width="29"
        height="29"
        style={{ marginLeft: "-5px" }}
      />
    ),
    showTo: ["User"],
  },
  {
    title: "Exhibitor Staff",
    url: "/vendor-staff",
    icon: (
      <Icon
        icon="lets-icons:user-box-duotone"
        width="29"
        height="29"
        style={{ marginLeft: "-5px" }}
      />
    ),
    showTo: ["User"],
  },

  // {
  //   title: "Application List",
  //   url: "/application-list",
  //   icon: <Icon icon="lets-icons:file-dock-fill" width="27" height="27" />,
  //   showTo: ["admin", "center"],
  // },
  // {
  //   title: "Category List",
  //   url: "/category-list",
  //   icon: <Icon icon="lets-icons:file-dock-fill" width="27" height="27" />,
  //   showTo: ["admin", "center"],
  // },
  // {
  //   title: "Modules",
  //   url: "/video",
  //   icon: <Icon icon="majesticons:video" width="27" height="27" />,
  //   showTo: ["admin", "center"],
  // },
  // {
  //   title: "Vendoer List",
  //   url: "/product-list",
  //   icon: <Icon icon="lets-icons:file-dock-fill" width="27" height="27" />,
  //   showTo: ["admin", "center"],
  // },
  // {
  //   title: "Event Management",
  //   url: "/testimonial-list",
  //   icon: <Icon icon="bi:chat-left-heart-fill" width="22" height="22" />,
  //   showTo: ["admin", "center"],
  // },

 
  // {
  //   title: "Discussion Board",
  //   url: "/kanban-board",
  //   icon: <Icon icon="lets-icons:file-dock-fill" width="27" height="27" />,
  //   showTo: ["admin"],
  // },
  // {
  //   title: "Hours",
  //   url: "/hours",
  //   icon: <Icon icon="lets-icons:file-dock-fill" width="27" height="27" />,
  //   showTo: ["admin"],
  // },
  // {
  //   title: "Settings",
  //   icon: <Icon icon="ri:settings-3-line" width="27" height="27" />,
  //   showTo: ["admin"],
  //   submenu: [
  //     {
  //       title: "Hours",
  //       url: "/hours",
  //       icon: <Icon icon="tabler:clock-hour-4" width="27" height="27" />,
  //       showTo: ["admin"],
  //     },
  //   ],
  // },
];

export default menuItems;
