import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClientProvider,QueryClient} from '@tanstack/react-query'
// import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
// Create a client
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router ={router}></RouterProvider>

      </QueryClientProvider>
    {/* <App /> */}
  </React.StrictMode>
)
