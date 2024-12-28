import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "../config";
import Loading from "../pages/Loading";
import AuthGuard from "../guard/AuthGuard";

const Home = lazy(() => import("../pages/Home"));
const Designs = lazy(() => import("../pages/Designs"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Admin = lazy(() => import("../pages/Admin"));
const Auth = lazy(() => import("../pages/Auth"));

const CreatePacakge = lazy(
  () => import("../pages/Admin/Packages/CreatePacakge")
);
const EditPacakge = lazy(() => import("../pages/Admin/Packages/EditPacakge"));
const CreateCard = lazy(() => import("../pages/Admin/Cards/CreateCard"));
const Profile = lazy(() => import("../pages/Admin/Profile"));
// const EditCard = lazy(() => import("../pages/Admin/Cards/EditCard"));

export default function Routers() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.designs} element={<Designs />} />
        <Route path="*" element={<NotFound />} />

        {/* Auth rotues */}
        <Route path={appRoutes.auth.path} element={<Auth />} />

        {/* Admin routes */}
        <Route element={<AuthGuard />}>
          <Route path={appRoutes.admin} element={<Admin />} />

          {/* Admin packages routes */}
          <Route path={appRoutes.createPacakge} element={<CreatePacakge />} />
          <Route
            path={`${appRoutes.editPackage}/:_id`}
            element={<EditPacakge />}
          />
          <Route path={appRoutes.createCard} element={<CreateCard />} />

          <Route path={appRoutes.profile} element={<Profile />} />
          {/* <Route path={`${appRoutes.editCard}/:_id`} element={<EditCard />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}
