import { Container, makeStyles } from "@material-ui/core";
import React from "react";

import clsx from "clsx";
import BgTop from "../../image/top-right.png";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "70px 10px",
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <div className="header__content">
      <Container maxWidth="lg" className={clsx(classes.content)}>
        <div className="header__content_title">
          <h1>The Ultimate Mobile And Web App For QLTS Preparation</h1>
          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            maiores facilis quidem alias dolores necessitatibus numquam
            inventore quaerat itaque praesentium! Tempora laboriosam cum
            sapiente praesentium inventore vitae natus, veniam ad!
          </h4>
        </div>
        <img src={BgTop} alt="" />
      </Container>
    </div>
  );
}
