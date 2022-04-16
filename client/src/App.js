import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

const App = () => {
  return (
    <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/other">Other Page</Link>
        </div>
        <Route exact path='/' component={Fib} />
        <Route path='/other' component={OtherPage} />
    </Router>
  );
}

export default App;
