import Chart from "./Chart/Chart";
import "./weather-card.scss";

function getCardinalDirection(angle) {
  const directions = [
    "↑ N",
    "↗ NE",
    "→ E",
    "↘ SE",
    "↓ S",
    "↙ SW",
    "← W",
    "↖ NW",
  ];
  return directions[Math.round(angle / 45) % 8];
}
function convertSpeed(data) {
  return (3.6 * data).toFixed(2);
}

const WeatherCard = (props) => {
  const imgurl = `http://openweathermap.org/img/wn/${props.icon}.png`;

  const time = (
    <h4>
      {props.date.toLocaleTimeString("en-US", {
        timeZone: "Europe/Athens",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })}
    </h4>
  );

  return (
    <>
      <div className="current-weather-card-info">
        <h1>Thessaloniki</h1>
        <p>
          {props.date.toLocaleString("en-UK", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="current-weather-card-header">
        <h2>{!props.isForecast ? "Current" : ""} Weather</h2>
        {!props.isForecast ? time : null}
      </div>
      <div className="current-weather-card-content ">
        <div className="current-weather">
          <div className="current-weather-info">
            <img src={imgurl} />
            <h1>{props.temp}°C</h1>
          </div>
          <p>{props.description}</p>
        </div>
        <div className="current-weather-extra">
          <div className="detail-item">
            <p>Feels Like: </p>
            <h4>{props.feels_like}°C</h4>
          </div>
        </div>
      </div>
      <div className="current-weather-details">
        <div className="left">
          <div className="detail-item">
            <p>Pressure: </p>
            <p>{props.pressure} mb</p>
          </div>
          <div className="detail-item">
            <p>Wind Speed: </p>
            <p>{convertSpeed(props.wind_speed)} km/h</p>
          </div>
          <div className="detail-item">
            <p>Clouds Cover: </p>
            <p>{props.clouds}%</p>
          </div>
        </div>
        <div className="right">
          <div className="detail-item">
            <p>Humidity: </p>
            <p>{props.humidity}%</p>
          </div>
          <div className="detail-item">
            <p>Wind Direction: </p>
            <p>{getCardinalDirection(props.wind_deg)}</p>
          </div>
        </div>
      </div>
      <Chart />
    </>
  );
};
export default WeatherCard;
