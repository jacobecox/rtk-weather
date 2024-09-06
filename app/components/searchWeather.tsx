import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../store/slices/weather";
import { AppDispatch } from "../store/configureStore";

export default function SearchWeather() {
  const locations = useSelector((state: any) => state.location.location);
  const dispatch = useDispatch<AppDispatch>();

  const renderLocation = () => {
    return locations.map?.((location) => {
      console.log(location);
      dispatch(fetchWeather(location));
      return location.lat, location.lon;
    });
  };

  return renderLocation;
}
