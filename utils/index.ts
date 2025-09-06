import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps): Promise<CarProps[]> {
  const { manufacturer, year, model, fuel } = filters;

  // Fetch toate mașinile de la MockAPI
  const response = await fetch(
    `https://68bae1ae84055bce63f077d3.mockapi.io/api/v1/CarProps`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cars from MockAPI");
  }

  const allCars: CarProps[] = await response.json();

  // Filtrăm după parametrii selectați
  const filteredCars = allCars.filter((car) => {
    const matchesManufacturer = manufacturer
      ? car.make.toLowerCase() === manufacturer.toLowerCase()
      : true;

    const matchesModel = model
      ? car.model.toLowerCase().includes(model.toLowerCase())
      : true;

    const matchesYear = year ? car.year === Number(year) : true;

    const matchesFuel = fuel
      ? car.fuel_type.toLowerCase() === fuel.toLowerCase()
      : true;

    return matchesManufacturer && matchesModel && matchesYear && matchesFuel;
  });

  return filteredCars;
}


export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  if (angle) {
    url.searchParams.append("angle", angle);
  }

  return url.toString();
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

