import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import BrandLogo from "../topbar/BrandLogo";
import NavMenu from "../topbar/NavMenu";
import SearchBar from "../topbar/SearchBar";
import UserMenu from "../topbar/UserMenu";
import ThemeSwitch from "../display/ThemeSwitch";
import LogoutModal from "../topbar/LogoutModal";
import ProfileModal from "../topbar/ProfileModal";

const Topbar = ({showSearch = true,
  showNavMenu = true,
  showUserMenu = true,
  showThemeToggle = true,
  showIcons = true,}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = () => setShowProfileModal(true);
  const handleLogoutClick = () => setShowLogoutModal(true);
  
  const handleLogoutConfirm = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3 shadow-sm sticky-top fixed-top">
      <div className="container-fluid">
        <BrandLogo />
        {/* Pass navbar toggle logic */}
        {showNavMenu && (
          <NavMenu
            navbarOpen={navbarOpen}
            setNavbarOpen={setNavbarOpen}
            onRouteClick={() => setNavbarOpen(false)}
            showIcons={showIcons}
          />
        )}
        {showSearch && <SearchBar />}
        {showThemeToggle &&(
        <ThemeSwitch enableThemeAlert />
        )}
        {showUserMenu && (
        <UserMenu
          user={user}
          onProfile={handleProfileClick}
          onLogout={handleLogoutClick}
        />
        )}
      </div>

{showLogoutModal && (
  <LogoutModal
    show={showLogoutModal}
    onConfirm={handleLogoutConfirm}
    onCancel={() => setShowLogoutModal(false)}
  />
)}

{showProfileModal && (
  <ProfileModal
    show={showProfileModal}
    onClose={() => setShowProfileModal(false)}
  />
)}

    </nav>
  );
};


export default Topbar;
