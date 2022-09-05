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
      props.onClick();
    };
  }
  function getWeatherHandler() {
    return () => {
      dispatch(getWeatherData());
      props.onClick();
    };
  }

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <Button key="current" day={-1} onClick={getWeatherHandler()} />
          {forecastData.map((object) => {
            return (
              <Button
                key={forecastData.indexOf(object)}
                day={forecastData.indexOf(object)}
                onClick={foreCastHandler(forecastData.indexOf(object))}
                forecastDate={object.dt}
              />
            );
          })}
          <span className="close" onClick={props.onClick}>
            ✕
          </span>
        </div>
      </div>
    </>
  );
};

export default MenuContent;
