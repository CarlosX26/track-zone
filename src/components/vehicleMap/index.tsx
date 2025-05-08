"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export const VehicleMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  return (
    <div className="w-full h-full">
      <h3 className="my-4 font-semibold">Mapa rastreador</h3>
      <div className="rounded-2xl overflow-hidden shadow-lg border border-muted h-96">
        <APIProvider apiKey={API_KEY}>
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{ lat: -14.235, lng: -51.9253 }} // Centro aproximado do Brasil
            defaultZoom={4}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </APIProvider>
      </div>
    </div>
  );
};
