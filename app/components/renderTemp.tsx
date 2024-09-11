import { useSelector } from "react-redux";
import { WeatherData, Main } from "../store/slices/weather";
import { useEffect } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderTemp() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store

  useEffect(() => {
    findTemp;
  }, []); //listens and updates when findTemp changes

  if (conditions === undefined) {
    //if there are no conditons (api hasn't returned anything), then just return
    return;
  }
  const findTemp = () => {
    return conditions?.list?.map?.((weather: Main) => {
      return weather.main.temp; //takes the temperature over the next 5 days
    });
  };
  const tempArray = findTemp(); //sets that temp in an array

  const sum = tempArray?.reduce((accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
  }, 0);
  const averageTotal = sum / tempArray?.length; //finds average temperature
  const average = Math.round(averageTotal); //rounds to whole number

  return (
    <span className="text-center">
      <Sparklines data={tempArray}>
        <SparklinesLine color="blue" />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p>{average}ºF</p>
    </span>
  );
}
