import './App.css';
import {Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div>
      <h1>PF - Grupo 15</h1>
      <Switch>
        <Route exact path={'/videogames'} /* component={} */ />
        <Route exact path={'/videogames/:id'} /* component={} */ />
        <Route exact path={'videogames/add'} /* component={} */ />
      </Switch>
    </div>
  );
}

export default App;
