import SimpleButton from "../Buttons/SimpleButton";
import { useTodo } from "../../context/todoContext";
import BannerHome from "../Banners/BannerHome";
import TodoStatsCard from "../TodoStatsCard/TodoStatsCard";
const Home = () => {
    const { todos, historyItems, deletedItems, doneTask } = useTodo();

    return (
        <>
            <BannerHome/>
            <div className="text-center py-8 lg:pb-16 lg:py-0 mx-4">
                <div className="w-full py-4 lg:py-8">
                    <h1 className="w-full p-2 text-2xl">
                        {todos.length <= 0 && (
                            "Bienvenue sur mytodo"
                        )}
                    </h1>
                    <div className="mt-4">
                        <SimpleButton text={(todos.length > 0 ? `Continuer mes ${todos.length} tâches en cours` : "Démarrer une nouvelle tâche")}/>
                    </div>
                </div>
                
                <div className="flex flex-col lg:flex-row justify-center mt-4">
                    <TodoStatsCard
                    statsCard={todos.length}
                    text="Dans ma todo liste"
                    link="/My-todo-list"
                    img="https://static.vecteezy.com/system/resources/previews/002/167/666/non_2x/project-tracking-goal-tracker-task-completion-or-checklist-to-remind-project-progress-concept-businessman-project-manager-holding-big-pencil-to-check-completed-tasks-in-project-management-timeline-vector.jpg"
                    />
                    <TodoStatsCard
                    statsCard={doneTask().length}
                    text="Tâches terminées"
                    link="/Finished"
                    img="https://plus.unsplash.com/premium_photo-1681487870238-4a2dfddc6bcb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG8lMjBkbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D"
                    />
                    <TodoStatsCard
                    statsCard={deletedItems.length}
                    text="Tâches archivées"
                    link="/Archives"
                    img="https://cdni.iconscout.com/illustration/premium/thumb/permanently-remove-illustration-download-in-svg-png-gif-file-formats--delete-data-erase-document-deletion-pack-science-technology-illustrations-7706317.png"
                    />
                </div>
            </div>
        </>
    )
}

export default Home;