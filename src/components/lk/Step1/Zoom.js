import React from "react";
import { Button, Paper } from "@material-ui/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Zoom = ({ component, onZoomChange }) => {
  const handleZoom = (e) => {
    onZoomChange(e.target.innerHTML);
  };
  return (
    <Paper elevation={3}>
      <div className="innerPaper">
        <p>Выберите блок для увелечения изображения</p>
        {component !== "" && (
          <div className="zoom">
            <h3>Используйте колесо мышки для увелечения</h3>
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={2}
              doubleClick="disabled"
            >
              <TransformComponent>{component}</TransformComponent>
            </TransformWrapper>
          </div>
        )}
        <br />
        <Button
          variant="outlined"
          onClick={(e) => {
            handleZoom(e);
          }}
        >
          Основная информация
        </Button>
        <br />
        <Button
          variant="outlined"
          onClick={(e) => {
            handleZoom(e);
          }}
        >
          Паспортные данные
        </Button>
        <br />
        <Button
          variant="outlined"
          onClick={(e) => {
            handleZoom(e);
          }}
        >
          Адрес регистрации
        </Button>
      </div>
    </Paper>
  );
};

export default Zoom;
