import { useSelector } from "react-redux";
import { WeatherData, Main } from "../store/slices/weather";
import { useEffect } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderPressure() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store
  const findPressure = () => {
    return conditions?.list?.map?.((weather: Main) => {
      return weather.main.pressure; //takes the pressure over the next 5 days
    });
  };
  const pressureArray = findPressure(); //sets that pressure in an array

  const sum = pressureArray?.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );
  const averageTotal = sum / pressureArray?.length; //finds average pressure
  const average = Math.round(averageTotal); //rounds to whole number

  useEffect(() => {
    findPressure;
  }, [pressureArray]); //listens and updates tempArray when findTemp changes

  return (
    <span>
      <Sparklines data={pressureArray}>
        <SparklinesLine />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p>{average}inHg</p>
    </span>
  );
}
