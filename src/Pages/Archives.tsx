import { useTodo } from "../context/todoContext";


const Archives = () => {
    const { deletedItems } = useTodo(); 
    
    return (
        <div>
            {deletedItems.map((todo, index) => (
                <div key={index}>{todo.text}</div>
            ))}
        </div>
    )
}

export default Archives;