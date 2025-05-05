import SimpleButton from "../Buttons/SimpleButton";

const Home = () => {
    return (
        <div className="text-center py-32 lg:py-56 mx-4">
            <h1 className="text-2xl">Bienvenue sur votre my todo list</h1>
            <div className="mt-4">
                <SimpleButton text="Démarrer sa première tâche"/>
            </div>
        </div>
    )
}

export default Home;