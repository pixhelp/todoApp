import { useTodo } from "../context/todoContext";
import { Clock } from 'lucide-react';

const Archives = () => {
    const { deletedItems } = useTodo(); 
    const { relativeDate } = useTodo();
    console.log(deletedItems);

    return (
        <div className="flex flex-col items-center justify-center py-6 bg-gray-100 px-4 sm:px-20 w-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 font-monserrat_medium">Mes archives</h1>

            {deletedItems.length === 0 && (
                <div>
                    <div className="bg-white p-4 text-gray-800 rounded shadow-md w-full max-w-md">
                        <p className="text-lg font-playwrite">Aucun élément supprimé</p>
                    </div>
                </div>
            )}
            
            {deletedItems.length > 0 && (
                <div className="bg-white text-gray-800 rounded shadow-md w-full max-w-md">
                    {deletedItems.map((todo, index) => (
                        <div key={index} className={" p-2 border-b border-gray-300" +
                            (todo.done ? " bg-green-light " : " ") +
                            (todo.crucial && !todo.done ? " bg-beige-light " : "")
                        }>
                            <h3 className="pl-3 text-green-dark text-lg font-playwrite">
                                {todo.title}
                            </h3>
                            <p className="pl-3 text-green-dark text-sm font-playwrite">
                                {todo.text}
                            </p>
                            <span className='py-2 pl-2 text-xs mt-2 text-dark-blue font-monserrat_medium flex flex-row items-center'>
                                <Clock className='mr-1' size={15} />
                                {todo.done
                                ? todo.crucial
                                    ? 'Tâche urgente terminée'
                                    : 'Tâche terminée'
                                : `Créé ${relativeDate(todo.createdDate)}`}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Archives;