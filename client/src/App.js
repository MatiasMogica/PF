import './App.css';
import {Route, Switch} from 'react-router-dom'
import Error404 from './components/Errors/index';
import Home from './pages/Home';
import Details from './pages/Details';
import Add from './pages/Add';
function App() {
  return (
    <div>
      <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/videogames/:id'} component={Details} />
        <Route exact path={'/videogame/add'} component={Add} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
