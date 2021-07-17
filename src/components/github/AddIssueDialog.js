import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddBoxIcon from "@material-ui/icons/AddBox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, Tooltip } from "@material-ui/core";

const schema = yup.object().shape({
  title: yup.string().required("Необходимо ввести название обращения"),
  body: yup.string().required("Необходимо ввести тело обращения"),
});

export default function AddIssueDialog() {
  const [open, setOpen] = React.useState(false);
  const titleRef = React.useRef();
  const bodyRef = React.useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues",
      {
        method: "POST",
        body: JSON.stringify({
          owner: "HunteRPVP",
          repo: "react_task10_ex2_work",
          title: titleRef.current.value,
          body: bodyRef.current.value,
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
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Создать обращение">
        <Button
          style={{ height: "50px", width: "50px" }}
          onClick={handleClickOpen}
        >
          <AddBoxIcon
            color="primary"
            style={{ height: "50px", width: "50px" }}
          />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          Создать новое обращение
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              id="title"
              label="Название обращения"
              variant="outlined"
              {...register("title")}
              name="title"
              error={!!errors?.title}
              helperText={errors?.title?.message}
              inputRef={titleRef}
              style={{ width: "80%" }}
            />
            <br />
            <br />
            <TextField
              id="body"
              label="Тело обращения"
              variant="outlined"
              name="body"
              {...register("body")}
              error={!!errors?.body}
              helperText={errors?.body?.message}
              inputRef={bodyRef}
              multiline
              style={{ width: "80%" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отменить</Button>
            <Button type="submit" onClick={() => onSubmit}>
              Создать
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
