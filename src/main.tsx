import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import disableDevtool from "disable-devtool";

// disableDevtool({
//   ondevtoolopen: () => {
//     console.log("DevTools ochildi!"); // DevTools ochilganda console'ga xabar chiqaradi
//     alert("Developer Tools’ni ishlatish taqiqlangan!"); // Ogohlantirish chiqaradi
//   },
//   ondevtoolclose: () => {
//     console.log("DevTools yopildi!"); // DevTools yopilganda console'ga xabar chiqaradi
//   },
//   url: "https://google.com", // Agar DevTools ochilsa, foydalanuvchini ushbu sahifaga yo‘naltiradi
//   disableMenu: false, // O'ng tugmachani bosganda "Inspect" menyusini o‘chiradi
// });


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
