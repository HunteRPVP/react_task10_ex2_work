import React from "react";
import "./App.css";
import { Grid, Button } from "@material-ui/core";
import Routing from "./components/Routing";

class App extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Button></Button>
        </Grid>
        <Grid item xs={12}>
          <Routing history={history} />
        </Grid>
      </Grid>
    );
  }
}

export default App;
