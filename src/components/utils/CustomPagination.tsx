import { createStyles, makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    ul: {
      justifyContent: "center",
    },
  })
);

interface Props {
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number;
  totalPage: number;
}

const PaginationControlled: React.FC<Props> = ({
  handleChange,
  page,
  totalPage,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={totalPage}
        page={page}
        onChange={handleChange}
        shape="rounded"
        classes={{ ul: classes.ul }}
      />
    </div>
  );
};

export default PaginationControlled;
