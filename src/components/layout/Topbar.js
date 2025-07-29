import { useState } from "react";
import routes from "../navigation/Routes";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from "../display/ThemeSwitch";
import { useGlobalContext } from "../../config/GlobalContext";
const Topbar = ({
  showSearch = true,
  showNavMenu = true,
  showUserMenu = true,
  showThemeToggle = true,
  showIcons = true,
  user = { name: "User", avatar: "https://i.pravatar.cc/30" },
  onProfile = () => {
    console.log("Profile clicked");
  },
  onLogout = () => {
    console.log("Logout clicked");
  },
}) => {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { singlePageWebsite } = useGlobalContext();
  // const handleRouteClick = (item) => {
  //   if (item.label === "Logout") {
  //   } else {
  //   }
  //   setNavbarOpen(false);
  // };

  // Close navbar when user menu actions are clicked
  const handleProfileClick = () => {
    onProfile();
    setShowProfileModal(true);
    setNavbarOpen(false);
  };
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setNavbarOpen(false);
  };

  // Close navbar when clicking outside (backdrop)
  const handleNavbarBackdrop = (e) => {
    if (e.target.classList.contains("navbar-collapse")) {
      setNavbarOpen(false);
    }
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onLogout();
  };
  const handleLogoutCancel = () => setShowLogoutModal(false);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setNavbarOpen(false);
  };

  const handleRouteClick = (item) => {
    if (!singlePageWebsite && item.label === "Logout") return; // Avoid route change for logout
    setNavbarOpen(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm sticky-top fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap">
        {/* Brand */}
        <Link to="/" className="navbar-brand fw-bold">
          Ankit's Portfolio
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={navbarOpen}
          onClick={() => setNavbarOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center Menu Items */}
        <div
          className={`navbar-collapse collapse flex-grow-1${
            navbarOpen ? " show" : ""
          }`}
          id="navbarContent"
          onClick={handleNavbarBackdrop}
        >
          <div className="d-flex flex-column flex-lg-row w-100 align-items-lg-center justify-content-lg-between">
            {/* Nav Menu */}
            {showNavMenu && (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                {routes
                  .filter((item) => item.showIn?.includes("topbar"))
                  .map((item, idx) => (
                    <li className="nav-item" key={idx}>
                      {singlePageWebsite ? (
                      <button
  className={`nav-link d-flex align-items-center px-3 py-2 btn btn-link ${
    location.hash === `#${item.href.replace("/", "")}`
      ? "active bg-primary text-white"
      : "text-body"
  } ${item.danger ? "text-danger" : ""} rounded hover-bg-light`}
  onClick={() => handleScrollToSection(item.href.replace("/", ""))}
>
  {showIcons && item.icon && (
    <i className={`bi ${item.icon} me-1`}></i>
  )}
  {item.label}
</button>

                      ) : (
                        <Link
                          to={item.href}
                          className={`nav-link d-flex align-items-center px-3 py-2 ${
                            location.pathname === item.href ? "active" : ""
                          } ${item.danger ? "text-danger" : ""}`}
                          onClick={() => handleRouteClick(item)}
                        >
                          {showIcons && item.icon && (
                            <i className={`bi ${item.icon} me-1`}></i>
                          )}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            )}
            {/* Search bar, hidden if showSearch is false */}
            {showSearch && (
              <form className="d-flex me-lg-3 my-2 my-lg-0" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-light" type="submit">
                  Search
                </button>
              </form>
            )}
            {showThemeToggle && <ThemeSwitch enableThemeAlert={true} />}
            {/* User menu, hidden if showUserMenu is false */}
            {showUserMenu && (
              <ul className="navbar-nav mb-2 mb-lg-0 ms-lg-3">
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center bg-transparent border-0"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="rounded-circle me-2"
                      width="30"
                      height="30"
                    />
                    <span className="text-white">{user.name}</span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={handleProfileClick}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleLogoutCancel}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleLogoutCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogoutConfirm}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
      />

      {/* Custom Styling */}
      <style jsx="true">{`
        .navbar-nav .nav-link {
          transition: background 0.3s, color 0.3s;
        }

        .navbar-nav .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .navbar-nav .nav-link.active {
          font-weight: 600;
          // border-bottom: 2px solid #fff;
          color: white;
        }
      `}</style>
    </nav>
  );
};

// Flexible ProfileModal component
const ProfileModal = ({ show, onClose, user }) => {
  if (!show) return null;
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Profile</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            <img
              src={user.avatar}
              alt="avatar"
              className="rounded-circle mb-3"
              width="80"
              height="80"
            />
            <h6>{user.name}</h6>
            {user.email && <p className=" mb-0">{user.email}</p>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfileModal };
export default Topbar;
