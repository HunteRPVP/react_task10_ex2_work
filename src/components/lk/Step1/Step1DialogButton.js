import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Step1DialogButton({ summary, history }) {
  const [open, setOpen] = React.useState(false);
  console.log(summary.about.fio.split(" ")[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleContinue = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(summary),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    history.push("/lk/step2");
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const fi =
    summary.about.fio.split(" ")[1] + " " + summary.about.fio.split(" ")[2];
  const { phoneNum } = summary.contactInfo;

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Продолжить
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Продолжите заполнение заявки
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {fi}, вы можете продолжить заполнение заявки оформление которой
            начали ранее. Для это подтвердите свой номер телефона {phoneNum}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleContinue()} color="primary">
            Продолжить
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Создать новую заявку
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
