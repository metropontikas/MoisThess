import "./button.scss";

let content;

const Button = (props) => {
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

  if (props.day == -1) {
    content = "Right Now";
  } else if (props.day == 0) {
    content = "Today";
  } else if (props.day == 1) {
    content = "Tomorrow";
  } else {
    content = date;
  }

  return <button onClick={handleClick}>{content}</button>;
};

export default Button;
