import { Header } from "@/components/header";
import { VehicleMap } from "@/components/vehicleMap";

const Home = () => {
  return (
    <div className="w-full min-h-screen px-4">
      <Header />

      <VehicleMap />
    </div>
  );
};

export default Home;
