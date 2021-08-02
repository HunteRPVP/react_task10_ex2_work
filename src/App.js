import React from "react";
import "./App.css";
import { Grid, Button, Tooltip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Routing from "./components/Routing";
import GitHubIcon from "@material-ui/icons/GitHub";
import AddIssueDialog from "./components/github/AddIssueDialog";
import HomeIcon from "@material-ui/icons/Home";
import FolderSharedIcon from '@material-ui/icons/FolderShared';

class App extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Grid container>
        <Grid item xs={1} className="backGridItem">
          <br />
          <br />
          <Tooltip title="Назад">
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIcon style={{ height: "50px", width: "50px" }} />
            </Button>
          </Tooltip>
          <br />
          <br />
          <Tooltip title="Перейти на страницу с обращениями">
            <Button
              onClick={() => {
                history.push("/issues/");
              }}
            >
              <GitHubIcon style={{ height: "50px", width: "50px" }} />
            </Button>
          </Tooltip>
          <br />
          <br />
          <Tooltip title="Перейти на страницу с моими проектами">
            <Button
              onClick={() => {
                history.push("/projects/");
              }}
            >
              <FolderSharedIcon style={{ height: "50px", width: "50px" }} />
            </Button>
          </Tooltip>
          <br />
          <br />
          <AddIssueDialog />
          <br />
          <Tooltip title="Вернуться на главную страницу">
            <Button
              onClick={() => {
                history.push("/");
              }}
            >
              <HomeIcon style={{ height: "50px", width: "50px" }} />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={11}>
          <Routing history={history} />
        </Grid>
      </Grid>
    );
  }
}

export default App;
