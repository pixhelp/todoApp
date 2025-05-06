import SimpleButton from "../Buttons/SimpleButton";
import { useTodo } from "../../context/todoContext";

const Home = () => {
    const { todos, setTodos } = useTodo();

    return (
        <div className="text-center py-32 lg:py-56 mx-4">
            <h1 className="w-full p-2 text-2xl">
                Bienvenue sur mytodo
            </h1>
            <div className="mt-4">
                <SimpleButton text={(todos.length > 0 ? "Continuer mes tâches en cours" : "Démarrer une nouvelle tâche")}/>
            </div>
        </div>
    )
}

export default Home;