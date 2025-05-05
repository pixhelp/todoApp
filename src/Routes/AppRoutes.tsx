import Error404 from "../Error/Error404"
import Home from "../components/Home/Home";
import TodoList from "../components/TodoList/TodoList";
import Archives from "../Pages/Archives";
import Historic from "../Pages/Historic";

const routes = [
    {path:"*", element:<Error404/>},
    {path: "/Historique", element: <Historic/>},
    {path: "/Archives", element: <Archives/>},
    {path: "/My-todo-list", element: <TodoList/>},
    {path: "/", element: <Home/>}
]

export default routes;