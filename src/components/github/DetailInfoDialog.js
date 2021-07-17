import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@material-ui/core";

const schema = yup.object().shape({
  body: yup.string().required("Необходимо ввести тело обращения"),
});

export default function DetailInfoDialog({ issue }) {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState("");
  const bodyRef = React.useRef();
  const [checked, setChecked] = React.useState(false);
  const [body, setBody] = React.useState(issue.body);

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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onSubmit = () => {
    fetch(
      "https://api.github.com/repos/HunteRPVP/react_task10_ex2_work/issues/" +
        issue.number,
      {
        method: "PATCH",
        body: JSON.stringify({
          owner: "HunteRPVP",
          repo: "react_task10_ex2_work",
          issue_number: issue.number,
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
    setBody(bodyRef.current.value);
  };

  return (
    <>
      <Tooltip title="Просмотреть дополнительную инфомрацию">
        <Button onClick={handleClickOpen}>
          <LaunchIcon />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Информация об обращении {issue.issueName}
        </DialogTitle>
        <DialogContent>
          Дата и время последнего изменения: {issue.updateDate}
          <br />
          <br />
          <Accordion
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Тело обращения</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ marginLeft: "20px" }}
              >
                <Typography>{body}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                  }
                  label="Изменить тело обращения?"
                />
                <br />
                {checked && (
                  <>
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
                      style={{ width: "400px" }}
                    />
                    <br />
                    <Button type="submit" onClick={() => onSubmit}>
                      Изменить
                    </Button>
                  </>
                )}
              </form>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
