import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import menuItems from "./menu-items";
import { useState, useEffect } from "react";
import Logo from "../assets/images/splitup-logo.png";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const { sidebarTheme } = useContext(ThemeContext);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const useType = useSelector((item) => item?.user?.user?.user_type);

  useEffect(() => {
    setActiveMenu("Dashboard");
  }, []);

  const handleCloseSidebar = () => {
    toggleSidebar();
  };

  const handleMenuClick = (title) => {
    setActiveMenu(title);
  };

  const filterMenuItems = menuItems.filter((item) =>
    item.showTo.includes(useType)
  );

  return (
    <div
      className={`sidebar ${showSidebar ? "show" : ""}`}
      style={{
        backgroundColor: sidebarTheme.backgroundColor,
        color: sidebarTheme.textColor,
      }}
    >
      {showSidebar ? (
        <>
          <div className="side-logo">
            <img src={Logo} alt="" />
          </div>
          <button onClick={handleCloseSidebar} className="toggle-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {filterMenuItems?.map((nav, index) => {
            return (
              <div className="side-menu" key={index}>
                <Link
                  className={`side-link ${
                    activeMenu === nav.title ? "active" : ""
                  }`}
                  to={nav.url}
                  onClick={() => handleMenuClick(nav.title)}
                >
                  <span className="side-menu-icon">{nav.icon}</span>
                  <span className="side-menu-name">{nav.title}</span>
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="hide-this-sidebar">
            <div className="side-logo">
              {" "}
              <img src={Logo} alt="" />
            </div>
            <ul className="sidebar-menu">
              {filterMenuItems?.map((nav, index) => {
                return (
                  <div className="side-menu" key={index}>
                    <Link
                      className={`side-link ${
                        activeMenu === nav.title ? "active" : ""
                      }`}
                      to={nav.url}
                      onClick={() => handleMenuClick(nav.title)}
                    >
                      <span className="side-menu-icon">{nav.icon}</span>
                    </Link>
                  </div>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
