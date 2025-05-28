import { useTodo } from "../context/todoContext";
import { Clock, Trash2 } from "lucide-react";

type TodoItem = {
  title: string;
  text: string;
  done: boolean;
  crucial?: boolean;
  createdDate: number; 
};

type CardTodoProps = {
  todoItems: TodoItem[];
  deleted: boolean;
};

const CardTodo = ({todoItems, deleted}: CardTodoProps) => {
     const { deletedItems, relativeDate, setDeletedItems } = useTodo();

    const deleteArchivedElements = (indexElement: number) => {
        const filterTodo = deletedItems.filter((_el, index) => indexElement != index);
        setDeletedItems(filterTodo);
    }

    return (
         <div className="bg-[var(--color-bg-light)] text-[var(--color-text)] rounded shadow-md w-full max-w-md">
            {todoItems.map((todo, index) => (
             <div key={index} className={" p-2 relative border-b border-gray-300" +
                    (todo.done ? " bg-green-light " : " ") +
                    (todo.crucial && !todo.done ? " bg-beige-light " : "")
                }>
                    {deleted && (
                        <p className="flex justify-end absolute top-3 right-3 items-end text-xs cursor-pointer sm:border-0 rounded-full hover:text-green-dark transition-all p-0.5 text-gray-800" onClick={() => { deleteArchivedElements(index) }}><Trash2 size={20} /></p>
                    )}

                    <h3 className="pl-3 text-lg font-playwrite">
                        {todo.title}
                    </h3>
                    <p className="pl-3 text-sm font-playwrite">
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
    )
}

export default CardTodo;