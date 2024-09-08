import { useSelector } from "react-redux";
import { WeatherData, Main } from "../store/slices/weather";

export default function RenderWeather() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather);
  const averageTemp = () => {
    return conditions?.list?.map?.((weather: Main) => {
      return <p key={weather.main.dt}>{weather.main.temp}</p>;
    });
  };
  const averagePressure = () => {
    return conditions?.list?.map?.((weather: Main) => {
      return <p key={weather.main.dt}>{weather.main.pressure}</p>;
    });
  };
  const humidity = () => {
    return conditions?.list?.map?.((weather: Main) => {
      return <p key={weather.main.dt}>{weather.main.humidity}</p>;
    });
  };

  const humidityArray = humidity();

  const averageHumidity = () => {
    if (humidityArray === undefined) {
      return;
    }
    const sum = humidityArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    const avg = sum / humidityArray.length;
    return avg;
  };

  return averageHumidity();
}
