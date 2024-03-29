import { React, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import PageLoading from "../components/PageLoading";

import {
  BrandCreate,
  BrandOfClothesCreate,
  BrandOfClothesUpdate,
  BrandUpdate,
  Brands,
  BrandsOfClothes,
  Categories,
  CategoryCreate,
  CategoryUpdate,
  Home,
  Login,
  UserCreate,
  UserUpdate,
  UserUpdateOfBuzniz,
  Users,
  UsersOfBuzniz,
  Locations,
  LocationsUpdate,
  LocationsCreate,
  Sizes,
  SizesCreate,
  SizesUpdate,
  Colors,
  ColorsCreate,
  ColorsUpdate,
  Products,
  ProductsUpdate,
  ReportTypes,
  ReportTypesCreate,
  ReportTypesUpdate,
  ReportPosts,
  ReportPostsUpdate,
  ReportUsers,
  ReportUsersUpdate,
} from "../pages/index";

import ScrollIntoView from "./ScrollIntoView";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));
const App = () => {
  return (
    <BrowserRouter>
      <ScrollIntoView>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <PrivateRoute restricted={true} component={Home} path="/" exact />
            <PrivateRoute
              restricted={true}
              component={Home}
              path="/home"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={Categories}
              path="/category"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={CategoryCreate}
              path="/category/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={CategoryUpdate}
              path="/category/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Brands}
              path="/brands"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={BrandCreate}
              path="/brands/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={BrandUpdate}
              path="/brands/:id"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={BrandsOfClothes}
              path="/clothebrands"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={BrandOfClothesCreate}
              path="/clothebrands/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={BrandOfClothesUpdate}
              path="/clothebrands/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Users}
              path="/users"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={UserUpdate}
              path="/users/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={UsersOfBuzniz}
              path="/businessusers"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={UserUpdateOfBuzniz}
              path="/businessusers/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Products}
              path="/products"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ProductsUpdate}
              path="/products/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Colors}
              path="/colors"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ColorsCreate}
              path="/colors/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ColorsUpdate}
              path="/colors/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Sizes}
              path="/sizes"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={SizesCreate}
              path="/sizes/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={SizesUpdate}
              path="/sizes/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={ReportTypes}
              path="/reports"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ReportTypesCreate}
              path="/reports/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ReportTypesUpdate}
              path="/reports/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={ReportPosts}
              path="/postreports"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ReportPostsUpdate}
              path="/postreports/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={ReportUsers}
              path="/accountreports"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ReportUsersUpdate}
              path="/accountreports/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Locations}
              path="/locations"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={LocationsCreate}
              path="/locations/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={LocationsUpdate}
              path="/locations/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Home}
              path="/admins"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Home}
              path="/settings"
              exact
            />
            {/* Global */}
            {/* <PrivateRoute component={Home} path="*" /> */}
            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
