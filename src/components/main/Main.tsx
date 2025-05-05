import TodoList from "../TodoList/TodoList";
import routes from "../../Routes/AppRoutes";
import { Routes, Route } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    )
}

export default Main;
