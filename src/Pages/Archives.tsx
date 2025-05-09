import { useTodo } from "../context/todoContext";


const Archives = () => {
    const { deletedItems } = useTodo(); 
    const { relativeDate } = useTodo();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-4">
                {deletedItems.map((todo, index) => (
                    <div key={index}>
                        <p>
                            {todo.text}
                        </p>
                        <p>
                            {relativeDate(todo.createdDate)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Archives;