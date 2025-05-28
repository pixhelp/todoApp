import CardTodo from "../components/CardTodo";
import { useTodo } from "../context/todoContext";


const Historic = () => {
    const { historyItems } = useTodo();
     
    return (
        <div className="flex flex-col items-center justify-center py-6 bg-gray-100 px-4 sm:px-20 w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 font-monserrat_medium">Mon historique</h3>
            

            {historyItems.length >= 1 && (
                <CardTodo 
                todoItems={historyItems}
                deleted={false}
                ></CardTodo>
            )}

            {historyItems.length === 0 && (
                <div className="bg-white text-gray-800 rounded shadow-md w-full max-w-md">
                        <div className="bg-white p-4 text-gray-800 text-center rounded shadow-md w-full max-w-md">
                            <p className="text-lg font-playwrite">Aucun élément historique</p>
                        </div>
                </div>
            )}
        </div>
    )
}

export default Historic;