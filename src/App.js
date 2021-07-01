import React from "react";
import "./App.css";
import { Grid, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Routing from "./components/Routing";

class App extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Grid container>
        <Grid item xs={1} className="backGridItem">
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item xs={11}>
          <Routing history={history} />
        </Grid>
      </Grid>
    );
  }
}

export default App;
