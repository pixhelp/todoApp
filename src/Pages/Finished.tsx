import CardTodo from "../components/CardTodo";
import { useTodo } from "../context/todoContext";

const Finished = () => {
    const { doneTask } = useTodo();

    return (
        <div className="flex flex-col items-center justify-center py-6 bg-gray-100 px-4 sm:px-20 w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 font-monserrat_medium">Mes tâches terminées</h3>
            <CardTodo 
                todoItems={doneTask()}
                deleted={false}
            ></CardTodo>
        </div>
    )
}

export default Finished