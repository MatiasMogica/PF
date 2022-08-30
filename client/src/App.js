import './App.css';
import {Route, Switch} from 'react-router-dom'
import Error404 from './components/Errors/index';
function App() {
  return (
    <div>
      <h1>PF - Grupo 15</h1>
      <Switch>
        <Route exact path={'/videogames'} /* component={} */ />
        <Route exact path={'/videogames/:id'} /* component={} */ />
        <Route exact path={'videogames/add'} /* component={} */ />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
