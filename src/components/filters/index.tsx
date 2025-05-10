"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SearchX } from "lucide-react";
import { useFilter } from "@/contexts/filter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const FilterSchema = z.object({
  search: z.string().min(3),
});

type IFilterSchema = z.infer<typeof FilterSchema>;

export const Filters = () => {
  const { filter, handleSearch, handleType } = useFilter();

  const { register, handleSubmit, setValue } = useForm<IFilterSchema>({
    defaultValues: {
      search: filter.search,
    },
    resolver: zodResolver(FilterSchema),
  });

  const clearFilter = () => {
    handleSearch("");
    setValue("search", "");
  };

  const onError = () => {
    toast.error("Insira placa ou frota.");
  };

  const submit = (data: IFilterSchema) => {
    if (filter.search.length) {
      clearFilter();
      return;
    }

    handleSearch(data.search);
  };

  return (
    <div className="flex flex-col items-center justify-between border-b pb-4 mt-8 sm:flex-row">
      <div className="flex items-center w-full justify-between sm:justify-start">
        <h3 className="font-semibold sm:mr-8">Lista</h3>

        <ToggleGroup
          type="single"
          value={filter.type}
          onValueChange={(value) => value && handleType(value as any)}
          size="lg"
        >
          <ToggleGroupItem
            value="tracked"
            className="cursor-pointer p-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Rastreados
          </ToggleGroupItem>
          <ToggleGroupItem
            value="others"
            className="cursor-pointer p-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Outros
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center w-full sm:w-fit mt-4 sm:m-0">
        <Input
          placeholder="Buscar por placa ou frota"
          className="w-full sm:w-64 mr-4"
          {...register("search")}
        />
        <Button onClick={handleSubmit(submit, onError)} className="cursor-pointer">
          {filter.search.length ? <SearchX /> : <Search />}
        </Button>
      </div>
    </div>
  );
};
