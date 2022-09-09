import "./App.css";
import { Route, Switch } from "react-router-dom";
import {useSelector} from "react-redux"
import Error404 from "./components/Errors/index";
import Home from "./pages/Home";
import VideogameDetails from "./pages/VideogameDetails";
import Add from "./pages/Add";
import Login from "./pages/Login";

function App() {
  const user = useSelector((state) => state.videogames.logIn);
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/videogames/:id"} component={VideogameDetails} />
        <Route exact path={"/videogame/add"} component={Add} />
        <Route exact path={"/signIn"} component={Login} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
