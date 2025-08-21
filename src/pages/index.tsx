import MainLayout from "../layout/MainLayout";
import AuthPage from "./auth/AuthPage";
import { createBrowserRouter } from 'react-router-dom'
import Home from "./main/Home";
import Private from "../components/auth/Private";
import AuthCheckout from "./auth/AuthCheckout";
import AuthForgotten from "./auth/AuthForgotten";
import AuthRecovery from "./auth/AuthRecovery";


const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <Private>
        <Home/>
        </Private>
    },
    {
      path:"/auth/:type",
      element:
      <MainLayout>
        <AuthPage/>
      </MainLayout>
    },
    {
        path:"/forgot/password",
        element:
            <MainLayout>
                <AuthForgotten/>
            </MainLayout>
    },
    {
        path:"/recovery/password/:token",
        element:
            <MainLayout>
                <AuthRecovery/>
            </MainLayout>,
    },
    {
      path:"/checkout",
      element:
        <AuthCheckout/>
    }
  ]
)

export {
    router
}