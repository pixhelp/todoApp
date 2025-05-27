

type CardTodoProps = {
    children: React.ReactNode;
}

const CardTodo = ({children}: CardTodoProps) => {
    return (
         <div className="bg-[var(--color-bg-light)] text-gray-800 rounded shadow-md w-full max-w-md">
            {children}
         </div>
    )
}

export default CardTodo;