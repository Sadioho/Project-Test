import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles({
  root: {
    background: (props) => props.background || "white",
    border: (props) => props.border || 0,
    color: (props) => props.color || "white",
    width: (props) => props.width || 150,
    padding: (props) => props.padding || "10px",
    borderRadius: (props) => props.borderRadius,
    margin: (props) => props.margin || "5px auto",
    float: (props) => props.float,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
    textTransform: "capitalize",
    transition: "all 0.5s",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: (props) => props.backgroundColor || "#ffa726",
      color: "white",
    },
  },
});

export default function ButtonV2(props) {
  const { children, ...other } = props;
  const classes = styles({
    ...other,
  });
  return (
    <Button className={classes.root} {...other}>
      {children || "Button Custom"}
    </Button>
  );
}
