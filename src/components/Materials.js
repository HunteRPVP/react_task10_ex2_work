import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export class Materials extends Component {
  state = {
    themes: [
      {
        id: 1,
        theme:
          "Создание проекта курса в Трелло. Создание репозитория на GitHub. Файл ReadMe. Markdown язык разметки. Базовые команды Git. npm. Package.json. Создание проекта на stackblitz.com",
        links: [
          "https://metanit.com/web/react/1.1.php",
          "https://ru.reactjs.org/tutorial/tutorial.html",
          "https://www.youtube.com/embed/sL6VvWOAuLE",
          "https://www.youtube.com/embed/JfpCicDUMKc",
          "https://www.youtube.com/playlist?list=PL7Nh93imVuXyiJKz6YrELUACjXWfAXlwW",
          "https://www.youtube.com/embed/RJoNVnFWxRs",
        ],
      },
      {
        id: 2,
        theme:
          "Создание React-приложения. Установка расширения React Developer Tools. Введение в React. Виртуальный DOM. Основы JSX.",
        links: [
          "https://www.youtube.com/embed/v8q0e0bqJXk",
          "https://ru.reactjs.org/docs/introducing-jsx.html",
          "https://metanit.com/web/react/1.3.php",
        ],
      },
      {
        id: 3,
        theme: "Рендеринг элементов. Компоненты и пропсы.",
        links: [
          "https://ru.reactjs.org/docs/rendering-elements.html",
          "https://metanit.com/web/react/2.1.php",
          "https://www.youtube.com/embed/IXXO2-xnI8U",
        ],
      },
      {
        id: 4,
        theme: "Обработка событий и состояние компонента",
        links: [
          "https://ru.reactjs.org/docs/state-and-lifecycle.html",
          "https://metanit.com/web/react/2.4.php",
          "https://www.youtube.com/embed/Q7FkSWMf2Qo",
        ],
      },
      {
        id: 5,
        theme: "Жизненный цикл компонента. Управление ресурсами.",
        links: [
          "https://www.youtube.com/embed/O8f6aXqpGHw",
          "https://metanit.com/web/react/2.6.php",
          "https://ru.reactjs.org/docs/react-component.html",
        ],
      },
      {
        id: 6,
        theme: "Управление ресурсами. Условный рендеринг",
        links: [
          "https://www.youtube.com/embed/RfHw3oQRbgg",
          "https://www.youtube.com/embed/hZcKg7c7lbQ",
          "https://www.youtube.com/embed/hzB0CvJANn8",
        ],
      },
      {
        id: 7,
        theme: "Списки и ключи",
        links: [
          "https://www.youtube.com/embed/LeysYaa8iW4",
        ],
      },
      {
        id: 8,
        theme: "Подъём состояния. Композиция против наследования.",
        links: [
          "https://www.youtube.com/embed/dENUw979QiY",
          "https://www.youtube.com/embed/qdaDgC_xU0w",
          "https://www.youtube.com/embed/a2DkRBnp4ns",
        ],
      },
      {
        id: 9,
        theme: "Формы. Валидация форм. Refs. Контекст",
        links: [
          "https://www.youtube.com/embed/Q_UvAaKSK90",
          "https://www.youtube.com/embed/Tln-wtsp8do",
          "https://www.youtube.com/embed/LIkIM5u1mCk",
        ],
      },
      {
        id: 10,
        theme: "Маршрутизация",
        links: [
          "https://www.youtube.com/embed/5X5ZLWdAnt4",
          "https://www.youtube.com/embed/z7rhAp56Xvw",
          "https://www.youtube.com/embed/aHv_3g2Fw8A",
        ],
      },
      {
        id: 11,
        theme: "Хуки. Основные хуки",
        links: [
          "https://www.youtube.com/embed/hQRPsKzpo34",
          "https://www.youtube.com/embed/hwPo6OLBbD8",
          "https://www.youtube.com/embed/QPEB3ZQLTZY",
        ],
      },
      {
        id: 12,
        theme: "Введение в Flux и Redux. Дополнительные хуки React",
        links: [
          "https://www.youtube.com/embed/l4tKCCGUeMo",
          "https://www.youtube.com/embed/WLVjYRBoDgU?list=PLqHlAwsJRxANFIgAf7BO8hNYdvipLERxQ",
          "https://www.youtube.com/embed/BGKbJ2aXCog",
        ],
      },
      {
        id: 13,
        theme: "Введение в React Redux",
        links: [
          "https://www.youtube.com/embed/hpR-X2hTcqg",
          "https://www.youtube.com/embed/dgM9OGVfKCQ",
          "https://github.com/devSchacht/translations/tree/master/articles/tal-kol-redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps",
        ],
      },
      {
        id: 14,
        theme: "Введение в MobX",
        links: [
          "https://www.youtube.com/embed/Yqz4rA85o68",
          "https://mobx.js.org/observable-state.html",
          "https://mobx.js.org/configuration.html",
        ],
      },
      {
        id: 15,
        theme: "Основы тестирования",
        links: [
          "https://create-react-app.dev/docs/running-tests",
          "https://www.youtube.com/embed/Ex2j4oIweDk",
          "https://www.youtube.com/embed/v4pycbXkP1Y?list=PLNkWIWHIRwMEsMUc0B-lYb7DTLroWlKLK",
        ],
      },
    ],
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
                  <TableCell>Ссылки на материалы</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.themes.map(({ id, theme, links }) => (
                  <TableRow key={id}>
                    <TableCell>{theme}</TableCell>
                    <TableCell>
                      <ul>
                        {links.map((link, i) => (
                            <li key={i}>
                              <a href={link}>{link}</a>
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
      </Grid>
    );
  }
}

export default Materials;
