import React, { useEffect, useState } from "react";
import { format_second_to_minutes } from "../helpers/index";

const Clock = (props) => {
  const [timeDown, setTimeDown] = useState(2700);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const timer = timeDown;

      if (timer > 0) setTimeDown(timer - 1);
    }, 1000);

    props.setTimeCountDown(timeDown);

    if (timeDown === 0) {
      props.handleFinishV2();
      props.setTimePause(0);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [timeDown,props]);

  return <>{format_second_to_minutes(timeDown)}</>;
};

export default Clock;
