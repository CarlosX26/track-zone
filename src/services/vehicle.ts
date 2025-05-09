import api from "@/global/config/axios";
import { IVehicle } from "@/interfaces/vehicle";

interface IVehicleParams {
  filter?: string;
  type: "tracked" | "others";
  page: number;
  perPage?: number;
}

interface IVehicleListResponse {
  content: {
    vehicles: IVehicle[];
    totalPages: number;
    page: number;
    perPage: number;
  };
}
const getVehicles = async ({
  filter,
  type,
  page,
  perPage = 20,
}: IVehicleParams): Promise<IVehicleListResponse["content"]> => {
  try {
    const params = { filter, type, page, perPage };

    const { data } = await api.get<IVehicleListResponse>(
      "/recruitment/vehicles/list-with-paginate",
      { params },
    );

    return data.content;
  } catch (error) {
    throw error;
  }
};

export { getVehicles };
