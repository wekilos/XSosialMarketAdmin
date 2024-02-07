import { lazy } from "react";
export const Login = lazy(() => import("./login/login"));
export const Home = lazy(() => import("./home/Home"));
export const Categories = lazy(() => import("./category/categories"));
export const CategoryCreate = lazy(() => import("./category/categoryCreate"));
export const CategoryUpdate = lazy(() => import("./category/categoryUpdate"));
export const Brands = lazy(() => import("./brands/brands"));
export const BrandCreate = lazy(() => import("./brands/brandCreate"));
export const BrandUpdate = lazy(() => import("./brands/brandUpdate"));
export const BrandsOfClothes = lazy(() =>
  import("./brandsOfClothes/brandsOfClothes")
);
export const BrandOfClothesCreate = lazy(() =>
  import("./brandsOfClothes/brandOfClothesCreate")
);
export const BrandOfClothesUpdate = lazy(() =>
  import("./brandsOfClothes/brandOfClothesUpdate")
);

export const Users = lazy(() => import("./usersOfStandard/users"));
export const UserUpdate = lazy(() => import("./usersOfStandard/usersUpdate"));

export const UsersOfBuzniz = lazy(() => import("./usersOfBussiness/users"));
export const UserUpdateOfBuzniz = lazy(() =>
  import("./usersOfBussiness/usersUpdate")
);

export const Locations = lazy(() => import("./location/locations"));
export const LocationsUpdate = lazy(() => import("./location/locationUpdate"));
export const LocationsCreate = lazy(() => import("./location/locationCreate"));
