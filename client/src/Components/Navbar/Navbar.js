import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/apiRequest";
import { useNavigate } from "react-router";
import { createAxios } from "../../createInstance";
import "./Navbar.css";
import { logOutSuccess } from "../../redux/authSlice";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };
  return (
    <nav className="navbar-container">
      <div className="navbara">
        <Link to="/" className="navbar-home">
          Home
        </Link>
        {user ? (
          <>
            <p className="navbar-user">
              Hi, <span> {user.username} </span>{" "}
            </p>
            <Link to="/logout" className="navbar-logout" onClick={handleLogout}>
              {" "}
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-login">
              Login
            </Link>
            <Link to="/register" className="navbar-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
