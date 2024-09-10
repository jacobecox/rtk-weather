import { useSelector } from "react-redux";
import { WeatherData, Main } from "../store/slices/weather";
import { useEffect } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderHumidity() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store
  const findHumidity = () => {
    return conditions?.list?.map?.((weather: Main) => {
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

  useEffect(() => {
    findHumidity;
  }, [humidityArray]); //listens and updates humidityArray when findHumidity changes

  return (
    <span>
      <Sparklines data={humidityArray}>
        <SparklinesLine />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p>{average}%</p>
    </span>
  );
}
