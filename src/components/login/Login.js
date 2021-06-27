import { Grid } from "@material-ui/core";
import { AppBar, Tab, Paper } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { Component } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "./Login.css";

export class Login extends Component {
  state = {
    tabValue: this.props.match.params.form,
  };

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
    window.history.replaceState(null, "New Page Title", "/login/" + newValue);
  };

  render() {
    const { tabValue } = this.state;
    const { history } = this.props;
    return (
      <Grid container>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Paper className="paper">
            <h1>Личный кабинет клиента</h1>
            <p>
              Войдите или зарегистрируйтесь в личном кабинете. При регистрации
              укажите действующий номер телефона, на него будет направлен пароль
              через смс.
            </p>
            <TabContext value={tabValue}>
              <AppBar position="static">
                <TabList onChange={this.handleChange} centered>
                  <Tab label="вход" value="signin" />
                  <Tab label="регистрация" value="signup" />
                </TabList>
              </AppBar>
              <TabPanel value="signin">
                <Signin history={history} />
              </TabPanel>
              <TabPanel value="signup">
                <Signup history={history} />
              </TabPanel>
            </TabContext>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
