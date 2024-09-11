import RenderHumidity from "./renderHumidity";
import RenderPressure from "./renderPressure";
import RenderTemp from "./renderTemp";
import SearchWeather from "./searchWeather";
import { useState, useEffect } from "react";

const RenderWeather = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SearchWeather />
        </div>
        <div className="col-md-3">
          <RenderTemp />
        </div>
        <div className="col-md-3">
          <RenderHumidity />
        </div>
        <div className="col-md-3">
          <RenderPressure />
        </div>
      </div>
    </div>
  );
};

export default RenderWeather;
