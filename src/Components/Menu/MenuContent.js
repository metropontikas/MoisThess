import { useDispatch, useSelector } from "react-redux";
import { getWeatherData, getForecast } from "../../Store/weatherSlice";

import Button from "../UI/Modals/button";
import "./menuContent.scss";

const MenuContent = (props) => {
  const { forecastData } = useSelector((store) => store.data);
  const dispatch = useDispatch();

  function foreCastHandler(key) {
    return () => {
      dispatch(getForecast(key));
    };
  }
  function getWeatherHandler() {
    return () => {
      dispatch(getWeatherData());
    };
  }

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <ul onClick={props.onClick}>
            <li>
              <Button key="current" day={-1} onClick={getWeatherHandler()} />
            </li>
            {forecastData.map((object) => {
              return (
                <li key={forecastData.indexOf(object)}>
                  <Button
                    day={forecastData.indexOf(object)}
                    onClick={foreCastHandler(forecastData.indexOf(object))}
                    forecastDate={object.dt}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <span className="close" onClick={props.onClick}>
          ✕
        </span>
      </div>
    </>
  );
};

export default MenuContent;
