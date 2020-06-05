import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import Main from "./page/main";
import Results from "./page/results";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query = useQuery();

  return (
    <Switch>
      <Route path="/results">
        <Results bundle={query.get("bundle")} version={query.get("version")} />
      </Route>

      <Route path="/">
        <Main />
      </Route>
    </Switch>
  );
}

export default App;
