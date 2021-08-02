import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export class Review extends Component {
  render() {
    return (
      <Grid container style={{ marginTop: "80px" }}>
        <Grid item xs={3} />
        <Grid item xs={5}>
          <Paper>
            <h1>Обратная связь о курсе</h1>
            <Typography>
                Курс мне очень понравился, я очень многому научился и теперь могу спокойно пользоваться React, Redux, MobX и так далее.
                Единственное, я хочу заметить, что данный курс можно подсократить, как минимум, на один месяц.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Review;
