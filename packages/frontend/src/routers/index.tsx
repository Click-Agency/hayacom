import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "../config";
import Loading from "../pages/Loading";
import AuthGuard from "../guard/AuthGuard";

const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));

const Admin = lazy(() => import("../pages/Admin"));
const Auth = lazy(() => import("../pages/Auth"));

const CreatePacakge = lazy(
  () => import("../pages/Admin/Packages/CreatePacakge")
);
const EditPacakge = lazy(() => import("../pages/Admin/Packages/EditPacakge"));

export default function Routers() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
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
        </Route>
      </Routes>
    </Suspense>
  );
}
