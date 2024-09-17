import { useSelector } from "react-redux";
import { WeatherData, WeatherContainer } from "../store/slices/weather";
import { useEffect } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderPressure() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store

  useEffect(() => {
    findPressure;
  }, []); //listens and updates when findPressure changes

  if (conditions === undefined) {
    //if there are no conditons (api hasn't returned anything), then just return
    return;
  }
  const findPressure = () => {
    return conditions?.list?.map?.((weather: WeatherContainer) => {
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

  return (
    <span className="text-center">
      <Sparklines data={pressureArray}>
        <SparklinesLine color="red" />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p>{average}hPa</p>
    </span>
  );
}
