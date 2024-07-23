 
import {  createBrowserRouter,  RouterProvider,} from "react-router-dom";
import IndexClass from './Organismes/IndexClass'
import Login from "./Pages/Login";

function App() {
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login /> ,
    },
    {
      path: "/login",
      element: <Login /> ,
    },
    {
      path: "/main",
      element: <IndexClass /> ,
    },
  ]);


  return (
    <> 
        <RouterProvider router={router} />
    </>
  )
}

export default App
