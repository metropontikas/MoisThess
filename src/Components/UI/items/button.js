import { useEffect, useState } from "react";

const Button = (props) => {
  const [isCurrent, setCurrent] = useState(false);

  useEffect(() => {
    setCurrent(props.isCurrent);
  }, [props.isCurrent]);

  const date = new Date(props.forecastDate * 1000).toLocaleString("en-UK", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return <button onClick={handleClick}>{!isCurrent ? date : "Current"}</button>;
};

export default Button;
