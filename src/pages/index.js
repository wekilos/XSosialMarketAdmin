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

export const Sizes = lazy(() => import("./sizes/sizes"));
export const SizesUpdate = lazy(() => import("./sizes/sizeUpdate"));
export const SizesCreate = lazy(() => import("./sizes/sizeCreate"));

export const Colors = lazy(() => import("./colors/colors"));
export const ColorsUpdate = lazy(() => import("./colors/colorUpdate"));
export const ColorsCreate = lazy(() => import("./colors/colorCreate"));

export const Products = lazy(() => import("./products/products"));
export const ProductsUpdate = lazy(() => import("./products/productsUpdate"));
// export const ColorsCreate = lazy(() => import("./colors/colorCreate"));

export const ReportTypes = lazy(() => import("./reportType/reportTypes"));
export const ReportTypesUpdate = lazy(() =>
  import("./reportType/reportTypesUpdate")
);
export const ReportTypesCreate = lazy(() =>
  import("./reportType/reportTypesCreate")
);

export const ReportPosts = lazy(() => import("./reportPost/reportPosts"));
export const ReportPostsUpdate = lazy(() =>
  import("./reportPost/reportPostsUpdate")
);
