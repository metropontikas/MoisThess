import { useSelector, useDispatch } from "react-redux";
import { getForecast } from "../../../Store/weatherSlice";

import Card from "../Modals/Card";
import ChartBar from "./ChartBar";
import "./Chart.scss";

const Chart = () => {
  const { forecastData, isLoading } = useSelector((store) => store.data);
  const dispatch = useDispatch();

  function dataHandler(data) {
    return () => {
      dispatch(getForecast(data));
    };
  }

  if (isLoading) {
    return <div className="chart-container">Scanning the air . . .</div>;
  }

  return (
    <Card className="chart-container">
      <h3>7-Days Max Temperature Forecast</h3>
      <div className="chart">
        {forecastData.map((object) => (
          <ChartBar
            key={forecastData.indexOf(object)}
            index={forecastData.indexOf(object)}
            maxTemp={object.temp.max}
            day={object.dt}
            onClick={dataHandler(forecastData.indexOf(object))}
          />
        ))}
      </div>
    </Card>
  );
};
export default Chart;
