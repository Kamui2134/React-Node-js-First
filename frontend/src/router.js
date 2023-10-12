import Registration from "./components/Registration";
import Main from "./components/Main";
import Login from "./components/Login";
import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Registration/>,
    },
    {
        path: "/main",
        element: <Main/>,
    },
    {
        path: "/login",
        element: <Login/>,
    }
])

export default router;