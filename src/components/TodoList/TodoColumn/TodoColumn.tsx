interface TodoColumnProps {
    listShowElements: React.ReactNode[];
}

const TodoColumn = ({listShowElements}: TodoColumnProps) => {
    return (
        <div>
            <div className="flex flex-col xl:flex-row w-full xl:w-auto">
                <div className="px-2 text-left font-playwrite shadow-box-light bg-beige-light w-full xl:w-96 m-h-96 pb-6 rounded-t-xl">
                    {listShowElements.length === 0 && (
                        <p className="text-center mt-5 text-white">Commencez votre liste</p>
                    )}
                    {listShowElements}
                </div>
            </div>
        </div>

        
    )
} 

export default TodoColumn;