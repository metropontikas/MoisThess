import Card from "../Modals/Card";
import "./ChartBar.scss";

let content;
let barFillHeight;

function getWeekday(unixDate) {
  return new Date(unixDate * 1000).toLocaleString("en-UK", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });
}

const ChartBar = (props) => {
  barFillHeight = Math.round((props.maxTemp / 50) * 100) + "%";

  if (props.index == 0) {
    content = "Today";
  } else if (props.index == 1) {
    content = "Tomorrow";
  } else {
    content = getWeekday(props.day);
  }

  return (
    <div className="chart-bar">
      <Card className="chart-bar__inner" onClick={props.onClick}>
        <div className="chart-bar__fill" style={{ height: barFillHeight }}>
          <p> {props.maxTemp.toFixed(0)}°C</p>
        </div>
      </Card>
      <div className="chart-bar__label">{content}</div>
    </div>
  );
};

export default ChartBar;
