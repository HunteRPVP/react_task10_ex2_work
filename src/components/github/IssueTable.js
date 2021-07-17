import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Grid, Tooltip } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import DetailInfoDialog from "./DetailInfoDialog";
import AddIssueDialog from "./AddIssueDialog";
import ReplyDialog from "./ReplyDialog";
import LockIcon from "@material-ui/icons/Lock";
import RefreshIcon from "@material-ui/icons/Refresh";

export class IssueTable extends Component {
  lock = (issueId) => {
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues/" +
        issueId +
        "/lock",
      {
        method: "PUT",
        body: JSON.stringify({
          owner: "HunteRPVP",
          repo: "react_task10_ex2_work",
          issue_number: issueId,
          lock_reason: "resolved",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization:
            "Basic " +
            btoa("HunteRPVP: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"),
        },
      }
    ).then(() => console.log("Залочено"));
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues/" +
        issueId,
      {
        method: "PATCH",
        body: JSON.stringify({
          owner: "HunteRPVP",
          repo: "react_task10_ex2_work",
          issue_number: issueId,
          state: "closed",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization:
            "Basic " +
            btoa("HunteRPVP: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"),
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  columns = [
    { field: "status", headerName: "Статус обращения", width: 210 },
    {
      field: "creationDate",
      headerName: "Дата и время создания",
      width: 240,
    },
    {
      field: "number",
      headerName: "Порядковый номер",
      width: 230,
    },
    { field: "issueName", headerName: "Название", width: 250 },
    {
      field: "profile",
      headerName: "Имя и ссылка на профиль пользователя, создавшего обращение",
      width: 270,
      renderCell: (acc) => {
        return <a href={acc.value.url}>{acc.value.login}</a>;
      },
    },
    {
      field: "link",
      headerName: "Ссылка на обращение",
      width: 230,
      renderCell: (url) => {
        return (
          <Tooltip title="Перейти к обращению в GitHub">
            <Button
              onClick={() => {
                window.open(url.value);
              }}
            >
              <GitHubIcon />
            </Button>
          </Tooltip>
        );
      },
    },
    {
      field: "actions",
      headerName: "Действия",
      width: 300,
      renderCell: (id) => {
        return (
          <div>
            <Tooltip title="Перейти на страницу комментариев данного обращения">
              <Button
                onClick={() => {
                  this.props.history.push("/comments/" + id.value);
                }}
              >
                <EditIcon />
              </Button>
            </Tooltip>
            {this.state.rows.find((row) => row.id === id.value).status ===
              "open" && (
              <>
                <DetailInfoDialog
                  issue={this.state.rows.find((row) => row.id === id.value)}
                />
                <ReplyDialog issueId={id.value} />
                <Tooltip title="Заблокировать и закрыть обращение">
                  <Button
                    onClick={() => {
                      this.lock(id.value);
                    }}
                  >
                    <LockIcon />
                  </Button>
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
  ];

  state = {
    rows: [],
  };

  render() {
    return (
      <Grid container style={{ height: "800px" }}>
        <Grid item xs={10}>
          <DataGrid
            rows={this.state.rows}
            columns={this.columns}
            pageSize={10}
            sortingOrder={["desc", "asc"]}
            sortModel={[
              {
                field: "number",
                sort: "asc",
              },
            ]}
          />
          <AddIssueDialog />
        </Grid>
        <Grid item xs={2}>
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
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues?state=all"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json.map((issue) => {
          temp.push({
            id: issue.number,
            status: issue.state,
            creationDate: moment(issue.created_at).format(
              "DD.MM.yyyy HH:mm:ss"
            ),
            number: issue.number,
            issueName: issue.title,
            profile: { url: issue.user.html_url, login: issue.user.login },
            link: issue.html_url,
            actions: issue.number,
            body: issue.body,
            updateDate: moment(issue.updated_at).format("DD.MM.yyyy HH:mm:ss"),
          });
          return "successful";
        });
        this.setState({ rows: temp });
      });
  }

  componentDidMount() {
    this.updateInfo();
  }
}

export default IssueTable;
