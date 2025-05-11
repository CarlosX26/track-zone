"use client";
import React, { useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { IVehicleTracked } from "@/interfaces/vehicle";
import { Truck } from "lucide-react";

interface IVehicleMarkerProps {
  vehicle: IVehicleTracked;
}

export const VehicleMarker = ({ vehicle }: IVehicleMarkerProps) => {
  const [hovered, setHovered] = useState(false);

  const position = {
    lat: vehicle.lat,
    lng: vehicle.lng,
  };

  return (
    <AdvancedMarker
      position={position}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      <div className="relative flex flex-col items-center z-[999]">
        {hovered && (
          <div className="mb-2 flex flex-col items-center">
            <div className="bg-slate-900 text-white rounded-md px-3 py-2 text-[10px] leading-tight text-center shadow-md w-max max-w-[160px]">
              <div>Placa - {vehicle.plate}</div>
              <div>Frota - {vehicle.fleet}</div>

              <div>
                {vehicle.lat.toFixed(6)}, {vehicle.lng.toFixed(6)}
              </div>
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-700" />
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-full shadow-md">
            <Truck size={20} className="text-white" />
          </div>
          <div className="-mt-[1px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary" />
        </div>
      </div>
    </AdvancedMarker>
  );
};
