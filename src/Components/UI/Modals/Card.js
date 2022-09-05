import "./Card.css";

const Card = (props) => {
  const classes = "card " + props.className;

  if (props.onClick) {
    return (
      <div className={classes} onClick={props.onClick}>
        {props.children}
      </div>
    );
  }

  return <div className={classes}>{props.children}</div>;
};

export default Card;
