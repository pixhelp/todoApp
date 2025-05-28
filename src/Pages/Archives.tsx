import { useTodo } from "../context/todoContext";
import CardTodo from "../components/CardTodo";

const Archives = () => {
    const { deletedItems } = useTodo();

    return (
        <div className="flex flex-col items-center justify-center py-6 bg-gray-100 px-4 sm:px-20 w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 font-monserrat_medium">Mes archives</h3>

            {deletedItems.length === 0 && (
                <div>
                    <div className="bg-white p-4 text-gray-800 rounded shadow-md w-full max-w-md">
                        <p className="text-lg font-playwrite">Aucun élément supprimé</p>
                    </div>
                </div>
            )}
            
            {deletedItems.length >= 1 && (
                <CardTodo 
                todoItems={deletedItems}
                deleted={true}
                ></CardTodo>
            )}
        </div>
    )
}

export default Archives;