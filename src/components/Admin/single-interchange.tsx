import React from "react";
import { useParams } from "react-router-dom";
import { VehicleCountByMonth } from "./vehicle-count-by-month";

export const SingleInterchange = () => {
  const { interchangeName } = useParams<{ interchangeName: string }>();
  return (
    <div>
      <h1>welcome to data analytics at {interchangeName}</h1>
      <VehicleCountByMonth />
    </div>
  );
};
