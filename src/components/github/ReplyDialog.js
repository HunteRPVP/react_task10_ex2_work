import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReplyIcon from "@material-ui/icons/Reply";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
  Tooltip,
} from "@material-ui/core";

const schema = yup.object().shape({
  body: yup.string().required("Необходимо ввести тело обращения"),
});

export default function ReplyDialog({ issueId }) {
  const [open, setOpen] = React.useState(false);
  const bodyRef = React.useRef();
  const [comments, setComments] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    let temp = [];
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues/" +
        issueId +
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
        setComments(temp);
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues/" +
        issueId +
        "/comments",
      {
        method: "POST",
        body: JSON.stringify({
          owner: "HunteRPVP",
          repo: "react_task10_ex2_work",
          issue_number: issueId,
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

    if (checked) {
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
      )
        .then((response) => response.json())
        .then((json) => console.log("Залочено"));
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
    }
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Прокомментировать">
        <Button onClick={handleClickOpen}>
          <ReplyIcon />
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
        <DialogTitle id="alert-dialog-title">Прокомментировать</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {comments[comments.length - 1]?.body && (
              <Typography>
                Последний комментарий: {comments[comments.length - 1]?.body} от{" "}
                {comments[comments.length - 1]?.username}
              </Typography>
            )}
            <br />
            <br />
            <TextField
              id="body"
              label="Тело комментария"
              variant="outlined"
              name="body"
              {...register("body")}
              error={!!errors?.body}
              helperText={errors?.body?.message}
              inputRef={bodyRef}
              multiline
              style={{ width: "80%" }}
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Закрыть обращение?"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отменить</Button>
            <Button type="submit" onClick={() => onSubmit}>
              Добавить комментарий
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
