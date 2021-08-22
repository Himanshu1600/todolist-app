import React from "react";
import Todoapp from "./Todoapp";
import Login from "./Login";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Login name="Login " />} />
        <Route
          exact
          path="/todo"
          component={() => <Todoapp name="Todoapp " />}
        />
      </Switch>
    </div>
  );
}

export default App;
