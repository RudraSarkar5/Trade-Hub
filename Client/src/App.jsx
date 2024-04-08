import { useState } from 'react'
import './App.css'
import {Toaster} from "react-hot-toast"
import CustomRoutes from './routes/CustomRoutes';

function App() {
  

  return (
    <>
      <Toaster/>
      <CustomRoutes/>
    </>
  );
}

export default App
