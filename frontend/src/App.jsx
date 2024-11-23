import { useState } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/home";

const appRouter = createBrowserRouter([{ path: "/", element: <Home /> }]);

function App() {
  return (
    <>
      <div className="">
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
