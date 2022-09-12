import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";

import Error404 from "./components/Errors/index";
import Home from "./pages/Home";
import VideogameDetails from "./pages/VideogameDetails";
import Add from "./pages/Add";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { localStorageUser } from "./redux/slices/logInSlice";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Edit from "./pages/Edit/Edit";

import CartContainer from "./components/Cart/CartContainer"
import SuccessPayment from "./components/SuccessPayment";
import FailurePayment from "./components/FailurePayment";
import UserDetailsOptions from "./pages/UserDetails&Options/UserDetails&Options";

function App() {
  const user = useSelector((state) => state.logIn.logIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(localStorageUser(JSON.parse(window.localStorage.getItem("user"))));
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const { cartItems, amount } = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("amount", JSON.stringify(amount));
  }, [cartItems, amount]);

  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/videogames/:id"} component={VideogameDetails} />
        <Route exact path={'/cart'} component={CartContainer}/>
        <Route exact path={'/success'} component={SuccessPayment} />
        <Route exact path={'/failure'} component={FailurePayment} />
        <Route exact path={"/register"} component={Register}>
          {user.status ? <Redirect to="/" /> : null}
        </Route>
        <Route exact path={"/signIn"} component={SignIn}>
          {user.status ? <Redirect to="/" /> : null}
        </Route>
        <Route exact path={"/profile"} component={Profile}>
          {!user.status ? <Redirect to="/" /> : null}
        </Route>

        {user.admin ? (
          <>
            <Route exact path={"/adminPanel"} component={AdminPanel} />
            <Route exact path={"/videogame/add"} component={Add} />
            <Route exact path={"/edit/:id"} component={Edit} />
            <Route exact path={"/users/:id"} component={UserDetailsOptions} />
          </>
        ) : null}
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;

