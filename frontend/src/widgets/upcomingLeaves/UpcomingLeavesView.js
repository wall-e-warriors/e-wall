import React from "react";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from "./UpcomingLeaves.module.css";
import * as PropTypes from "prop-types";

function UpcomingLeavesView(props) {
  return (
    <div>
      {
        <CardContent>
          <List>{props.leavesData.map(response => cardInfo(response))}</List>
        </CardContent>
      }
    </div>
  );
}

function cardInfo(response) {
  return (
    <ListItem divider={true} key={response.userName} className={styles.heading}>
      {
        <div>
          <Typography variant="caption"> Name: </Typography>
          <Typography> {response.userFullName} </Typography>
          <Typography variant="caption"> Start Date: </Typography>
          <Typography> {response.startDate} </Typography>
          <Typography variant="caption"> End Date: </Typography>
          <Typography> {response.endDate} </Typography>
        </div>
      }
    </ListItem>
  );
}

UpcomingLeavesView.propTypes = {
  leavesData: PropTypes.array.isRequired
};

export default UpcomingLeavesView;
