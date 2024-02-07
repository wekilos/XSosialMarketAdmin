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
              component={Home}
              path="/products"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={Home}
              path="/reports"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={Home}
              path="/postreports"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={Home}
              path="/accountreports"
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
