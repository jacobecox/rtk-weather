import { useSelector } from "react-redux";
import { WeatherData, Main } from "../store/slices/weather";
import { useEffect } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderHumidity() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather);
  const findHumidity = () => {
    return conditions?.list?.map?.((weather: Main) => {
      return weather.main.humidity;
    });
  };
  const humidityArray = findHumidity();

  const sum = humidityArray?.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );
  const average = sum / humidityArray?.length;

  useEffect(() => {
    findHumidity;
  }, [humidityArray]);

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
