import React from "react";
import { LinearProgress } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
      width: "10%",
      display: "inline-block"
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

const ProgressLk = ({
  progress1,
  progress2,
  progress3,
  aboutRef,
  passportRef,
  addressRef,
}) => {
  return (
    <div className="progressBar">
      <button className="roundBtn" onClick={() => aboutRef.current.focus()}>
        1
      </button>
      <BorderLinearProgress variant="determinate" value={progress1} />
      <button className="roundBtn" onClick={() => passportRef.current.focus()}>
        2
      </button>
      <BorderLinearProgress variant="determinate" value={progress2} />
      <button className="roundBtn" onClick={() => addressRef.current.focus()}>
        3
      </button>
      <BorderLinearProgress variant="determinate" value={progress3} />
    </div>
  );
};

export default ProgressLk;
