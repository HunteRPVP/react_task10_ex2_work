import React, { Component } from "react";
import { Grid, Paper, Tooltip, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ReplyDialog from "./ReplyDialog";
import RefreshIcon from "@material-ui/icons/Refresh";

export class Comments extends Component {
  state = {
    comments: [],
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <Grid container style={{ marginTop: "30px" }}>
        <Grid item xs={3} />
        <Grid item xs={5}>
          <p>Комментарии из обращения №{id}</p>
          <TableContainer elevation={3} component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Имя комментирующего</TableCell>
                  <TableCell>Комментарий</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>{comment.username}</TableCell>
                    <TableCell>{comment.body}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ReplyDialog issueId={id} />
        </Grid>
        <Grid item xs={2}>
          <br />
          <br />
          <br />
          <Tooltip title="Обновить таблицу">
            <Button
              onClick={() => {
                this.updateInfo();
              }}
            >
              <RefreshIcon style={{ height: "50px", width: "50px" }} />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }

  updateInfo() {
    let temp = [];
    const { id } = this.props.match.params;
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues/" +
        id +
        "/comments"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json.map((comment) => {
          temp.push({
            id: comment.id,
            username: comment.user.login,
            body: comment.body,
          });
          return "successful";
        });
        this.setState({ comments: temp });
      });
  }

  componentDidMount() {
    this.updateInfo();
  }
}

export default Comments;
