import MainLayout from "../layout/MainLayout";
import AuthPage from "./auth/AuthPage";
import { createBrowserRouter } from 'react-router-dom'
import Home from "./main/Home";

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/auth/:type",
      element:
      <MainLayout>
        <AuthPage/>
      </MainLayout>
    }
  ]
)

export {
    router
}