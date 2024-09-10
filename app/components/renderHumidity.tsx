import { useSelector } from "react-redux";
import { WeatherData, Main } from "../store/slices/weather";
import { useEffect } from "react";

export default function RenderHumidity() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather);
  const findHumidity = () => {
    return conditions?.list?.map?.((weather: Main) => {
      return weather.main.humidity;
    });
  };
  const humidityArray = findHumidity();

  const averageHumidity = () => {
    const sum = humidityArray?.reduce(
      (accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      },
      0
    );
    const average = sum / humidityArray?.length;
    return average;
  };

  useEffect(() => {
    averageHumidity();
  }, [humidityArray]);

  return <p>average humidity: {averageHumidity()}</p>;
}
