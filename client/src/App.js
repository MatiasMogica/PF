import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Error404 from "./components/Errors/index";
import Home from "./pages/Home";
import VideogameDetails from "./pages/VideogameDetails";
import Add from "./pages/Add";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.videogames.logIn);
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/videogames/:id"} component={VideogameDetails} />
        <Route exact path={"/videogame/add"} component={Add} />
        <Route exact path={"/login"} component={SignIn}>
          {user.status ? <Redirect to="/" /> : null}
        </Route>
        <Route exact path={"/register"} component={Register}>
          {user.status ? <Redirect to="/" /> : null}
        </Route>
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
