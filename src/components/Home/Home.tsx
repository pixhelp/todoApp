import SimpleButton from "../Buttons/SimpleButton";
import { useTodo } from "../../context/todoContext";
import BannerHome from "../Banners/BannerHome";
const Home = () => {
    const { todos } = useTodo();

    return (
        <>
            <BannerHome/>
            <div className="text-center py-16 lg:py-32 mx-4">
                <h1 className="w-full p-2 text-2xl">
                    {todos.length <= 0 && (
                        "Bienvenue sur mytodo"
                    )}
                </h1>
                <div className="mt-4">
                    <SimpleButton text={(todos.length > 0 ? `Continuer mes ${todos.length} tâches en cours` : "Démarrer une nouvelle tâche")}/>
                </div>
            </div>
        </>
    )
}

export default Home;