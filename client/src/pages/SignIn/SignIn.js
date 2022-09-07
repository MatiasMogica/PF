import NavBar from "../../components/NavBar";
import Login from "../../components/Login/Login";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div>
      <NavBar />
      <div>
        <Login />
        <div>Google</div>
        <p>
          Or
          <Link to="/register" className={"linkStyle"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
