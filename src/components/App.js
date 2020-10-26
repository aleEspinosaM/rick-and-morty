import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Characters from './characters';
import Episodes from './episodes';
import Location from './location';
import './App.scss';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Characters} />
          <Route path="/location" component={Location} />
          <Route path="/:characterId/episodes" component={Episodes} />
        </Switch>
    </Router>
  );
}

export default App;
