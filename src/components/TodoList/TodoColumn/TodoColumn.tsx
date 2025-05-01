interface TodoColumnProps {
    listShowElements: React.ReactNode[];
    filterOldElements: () => void;
    filterNewElements: () => void;
}

const TodoColumn = ({listShowElements, filterOldElements, filterNewElements}: TodoColumnProps) => {
    return (
        <div className="w-full">
           <button className="bg-green-dark text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
           onClick={filterOldElements}>
                Anciens
            </button>
            <button className="bg-green-dark ml-4 text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
            onClick={filterNewElements}>
                Récents 
            </button>
            <div className="flex flex-col xl:flex-row w-full xl:w-auto">
                <div className="px-2 text-left font-playwrite shadow-box-light bg-beige-light w-full xl:w-96 m-h-96 pb-6">
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