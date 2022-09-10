import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";

import Error404 from "./components/Errors/index";
import Home from "./pages/Home";
import VideogameDetails from "./pages/VideogameDetails";
import Add from "./pages/Add";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { localStorageUser } from "./redux/slices/videogamesSlice";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Edit from "./pages/Edit/Edit";
import CartContainer from "./components/Cart/CartContainer"

function App() {
  const user = useSelector((state) => state.videogames.logIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(localStorageUser(JSON.parse(window.localStorage.getItem("user"))));
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  
  const {cartItems, amount} = useSelector((state) => state.cart)
  

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems))
      localStorage.setItem('amount', JSON.stringify(amount))
  }, [cartItems, amount])


  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/videogames/:id"} component={VideogameDetails} />
        <Route exact path={'/cart'} component={CartContainer}/>

        <Route exact path={"/register"} component={Register}>
          {user.status ? <Redirect to="/" /> : null}
        </Route>
        <Route exact path={"/signIn"} component={SignIn}>
          {user.status ? <Redirect to="/" /> : null}
        </Route>
        {user.admin ? (

          <>
            <Route exact path={"/adminPanel"} component={AdminPanel} />
            <Route exact path={"/videogame/add"} component={Add} />
            <Route exact path={"/edit/:id"} component={Edit} />
          </>

        ) : null}

        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
