import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Analyzer from "./routes/Analyzer";
import Watcher from "./routes/Watcher";

class App extends Component {
  render() {
    return (
      <HashRouter basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <Route exact path={"/"} component={Analyzer} />
          <Route path={"/watcher"} component={Watcher} />
        </React.Fragment>
      </HashRouter>
    );
  }
}

export default App;
