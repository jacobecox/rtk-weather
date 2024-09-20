import { useSelector } from "react-redux";
import { WeatherData, WeatherContainer } from "../store/slices/weather";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderHumidity() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store

  const findHumidity = (condition: WeatherContainer) => {
    return condition?.list?.map?.(
      (weather: WeatherContainer) => weather.main.humidity
    ); //takes the humidity over the next 5 days
  };

  return (
    <div className="text-center">
      {conditions?.map((condition: WeatherContainer, index: number) => {
        const humidityArray = findHumidity(condition); //sets that humidity in an array

        const sum = humidityArray?.reduce(
          (accumulator: number, currentValue: number) => {
            return accumulator + currentValue;
          },
          0
        );
        const averageTotal = sum / humidityArray?.length; //finds average humidity
        const humidityAverage = Math.round(averageTotal); //rounds to whole number

        if (condition === undefined) {
          return; //if no conditions are passed through, do not return anything
        }
        return (
          <div key={index} className="my-4">
            <Sparklines data={humidityArray}>
              <SparklinesLine color="green" />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
            <p>{humidityAverage}%</p>
          </div>
        );
      })}
    </div>
  );
}
