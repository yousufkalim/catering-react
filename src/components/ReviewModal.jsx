// Init
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// styles
const useStyles = makeStyles({});

const ReviewModal = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="body1" className={classes.iconText}>
        {/* {vendor.final_rating} ({vendor?.ratings?.length} reviews) */}
      </Typography>
    </div>
  );
};

export default ReviewModal;
