import TodoList from "../TodoList/TodoList";
import routes from "../../Routes/AppRoutes";
import { Routes, Route } from "react-router-dom";

const Main = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}

export default Main;
