import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "../config";
import Loading from "../pages/Loading";

const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const Admin = lazy(() => import("../pages/Admin"));
const Auth = lazy(() => import("../pages/Auth"));

export default function Routers() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin routes */}
        <Route path={appRoutes.admin} element={<Admin />} />
        <Route path={appRoutes.auth.path} element={<Auth />} />
      </Routes>
    </Suspense>
  );
}
