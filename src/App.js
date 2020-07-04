import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Index } from "./components/layout/Index";
import { TracksContext } from "./context/TracksContext";
import { useTracks } from "./hooks/tracks.hooks";
import { Lyrics } from "./components/tracks/Lyrics";

function App() {
  const { tracks, header, updateData } = useTracks();
  return (
    <TracksContext.Provider value={{ tracks, header, updateData }}>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </TracksContext.Provider>
  );
}

export default App;
