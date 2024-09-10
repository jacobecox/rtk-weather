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

  useEffect(() => {
    findTemp;
  }, [tempArray]); //listens and updates tempArray when findTemp changes

  return (
    <span>
      <Sparklines data={tempArray}>
        <SparklinesLine />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <p>{average}ºF</p>
    </span>
  );
}
