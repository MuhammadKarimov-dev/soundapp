import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import disableDevtool from "disable-devtool";
import { routes } from './routes/routes'

// disableDevtool({
//   ondevtoolopen: () => {
//     console.log("DevTools ochildi!"); // DevTools ochilganda console'ga xabar chiqaradi
//     alert("Developer Tools'ni ishlatish taqiqlangan!"); // Ogohlantirish chiqaradi
//   },
//   ondevtoolclose: () => {
//     console.log("DevTools yopildi!"); // DevTools yopilganda console'ga xabar chiqaradi
//   },
//   url: "https://google.com", // Agar DevTools ochilsa, foydalanuvchini ushbu sahifaga yo'naltiradi
//   disableMenu: false, // O'ng tugmachani bosganda "Inspect" menyusini o'chiradi
// });

// React Router v7 future flags warning'larini o'chirish
// import { 
//   createBrowserRouter,
//   RouterProvider 
// } from 'react-router-dom'

// Router yaratish
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
