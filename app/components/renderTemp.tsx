import { useSelector } from "react-redux";
import { WeatherData, WeatherContainer } from "../store/slices/weather";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/configureStore";
// import { setTemp } from "../store/slices/weather";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function RenderTemp() {
  const conditions = useSelector((state: WeatherData) => state.weather.weather); //pulls current state in redux store

  const findTemp = (condition: WeatherContainer) => {
    return condition?.list?.map?.(
      (weather: WeatherContainer) => weather.main.temp
    ); //takes the temperature over the next 5 days
  };

  return (
    <div className="text-center">
      {conditions?.map((condition: WeatherContainer, index: number) => {
        const tempArray = findTemp(condition); //sets that temp in an array

        const sum = tempArray?.reduce(
          (accumulator: number, currentValue: number) => {
            return accumulator + currentValue;
          },
          0
        );
        const averageTotal = sum / tempArray?.length; //finds average temperature
        const tempAverage = Math.round(averageTotal); //rounds to whole number

        return (
          <div key={index} className="my-4">
            <Sparklines data={tempArray}>
              <SparklinesLine color="blue" />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
            <p>{tempAverage}ºF</p>
          </div>
        );
      })}
    </div>
  );
}
