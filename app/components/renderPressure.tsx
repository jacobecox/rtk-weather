import { useSelector } from "react-redux";
import { WeatherData, WeatherContainer } from "../store/slices/weather";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderPressure() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store

  const findPressure = (condition: WeatherContainer) => {
    return condition?.list?.map?.(
      (weather: WeatherContainer) => weather.main.pressure
    ); //takes the pressure over the next 5 days
  };

  return (
    <div className="text-center">
      {conditions?.map((condition: WeatherContainer, index: number) => {
        const pressureArray = findPressure(condition); //sets that pressure in an array

        const sum = pressureArray?.reduce(
          (accumulator: number, currentValue: number) => {
            return accumulator + currentValue;
          },
          0
        );
        const averageTotal = sum / pressureArray?.length; //finds average pressure
        const pressureAverage = Math.round(averageTotal); //rounds to whole number

        if (condition === undefined) {
          return; //if no conditions are passed through, do not return anything
        }
        return (
          <div key={index} className="my-4">
            <Sparklines data={pressureArray}>
              <SparklinesLine color="red" />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
            <p>{pressureAverage}hPa</p>
          </div>
        );
      })}
    </div>
  );
}
