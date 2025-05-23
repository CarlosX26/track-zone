import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { VehicleMap } from "@/components/vehicleMap";
import { VehicleTable } from "@/components/vehicleTable";

const Home = () => {
  return (
    <div className="w-full min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <Header />

        <Filters />

        <VehicleMap />

        <VehicleTable />
      </div>
    </div>
  );
};

export default Home;
