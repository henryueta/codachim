import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './pages'
import AppProvider from './context'
import { RouterProvider } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router}/>
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
)