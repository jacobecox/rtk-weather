import { useSelector } from "react-redux";
import { WeatherData, WeatherContainer } from "../store/slices/weather";
import { useEffect } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderHumidity() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store
  useEffect(() => {
    findHumidity;
  }, []); //listens and updates when findHumidity changes

  if (conditions === undefined) {
    //if there are no conditons (api hasn't returned anything), then just return
    return;
  }
  const findHumidity = () => {
    return conditions?.list?.map?.((weather: WeatherContainer) => {
      return weather.main.humidity; //takes the humidity over the next 5 days
    });
  };
  const humidityArray = findHumidity(); //sets that humidity in an array

  const sum = humidityArray?.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );
  const averageTotal = sum / humidityArray?.length; //finds average humidity
  const average = Math.round(averageTotal); //rounds to whole number

  return (
    <span className="text-center">
      <Sparklines data={humidityArray}>
        <SparklinesLine color="green" />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p>{average}%</p>
    </span>
  );
}
