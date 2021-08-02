import React, { Component } from "react";
import { Grid, Paper, Tooltip, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RefreshIcon from "@material-ui/icons/Refresh";

export class ProjectsList extends Component {
  state = {
    themes: [
      {
        id: 1,
        theme:
          "Создание проекта курса в Трелло. Создание репозитория на GitHub. Файл ReadMe. Markdown язык разметки. Базовые команды Git. npm. Package.json. Создание проекта на stackblitz.com",
      },
      {
        id: 2,
        theme:
          "Создание React-приложения. Установка расширения React Developer Tools. Введение в React. Виртуальный DOM. Основы JSX.",
      },
      {
        id: 3,
        theme: "Рендеринг элементов. Компоненты и пропсы.",
      },
      {
        id: 4,
        theme: "Обработка событий и состояние компонента",
      },
      {
        id: 5,
        theme: "Жизненный цикл компонента. Управление ресурсами.",
      },
      {
        id: 6,
        theme: "Управление ресурсами. Условный рендеринг",
      },
      {
        id: 7,
        theme: "Списки и ключи",
      },
      {
        id: 8,
        theme: "Подъём состояния. Композиция против наследования.",
      },
      {
        id: 9,
        theme: "Формы. Валидация форм. Refs. Контекст",
      },
      {
        id: 10,
        theme: "Маршрутизация",
      },
      {
        id: 11,
        theme: "Хуки. Основные хуки",
      },
      {
        id: 12,
        theme: "Введение в Flux и Redux. Дополнительные хуки React",
      },
      {
        id: 13,
        theme: "Введение в React Redux",
      },
      {
        id: 14,
        theme: "Введение в MobX",
      },
      {
        id: 15,
        theme: "Основы тестирования",
      },
    ],
    hw: [],
  };

  render() {
    return (
      <Grid container style={{ marginTop: "30px" }}>
        <Grid item xs={3} />
        <Grid item xs={5}>
          <TableContainer elevation={3} component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Тема</TableCell>
                  <TableCell>Ссылка на домашнюю работу</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.themes.map(({ id, theme }) => (
                  <TableRow key={id}>
                    <TableCell>{theme}</TableCell>
                    <TableCell>
                      <ul>
                        {this.state.hw
                          .filter((work) => {
                            return work.url
                              .toString()
                              .includes("react_hw" + id + "_")
                              ? work
                              : null;
                          })
                          .map(({ id, url, name }) => (
                            <li key={id}>
                              <a href={url}>{name}</a>
                            </li>
                          ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
    fetch(
      "https://api.github.com/users/HunteRPVP/repos?per_page=100&direction=desc"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json.map((repo) => {
          temp.push({
            id: repo.id,
            url: repo.html_url,
            name: repo.name,
          });
          return "successful";
        });
        this.setState({ hw: temp });
      });
  }

  componentDidMount() {
    this.updateInfo();
  }
}

export default ProjectsList;
