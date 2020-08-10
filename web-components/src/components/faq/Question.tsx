import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ReactHtmlParser from 'react-html-parser';

interface QuestionProps {
  question: string;
  answer: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  question: {
    cursor: 'pointer',
  },
}));

const Question = ({ question, answer }: QuestionProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (): void => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <div>
      <div className={classes.question} onClick={handleClick}>
        {question}
      </div>
      <Collapse component="div" in={open} timeout="auto" unmountOnExit>
        {ReactHtmlParser(answer)}
      </Collapse>
    </div>
  );
};

export default Question;
