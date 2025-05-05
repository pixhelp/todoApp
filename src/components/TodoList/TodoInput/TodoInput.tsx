
interface TodoInputProps {
    addItemElement: (text: string, done?: boolean, crucial?: boolean, createdDate?: number) => void;
    addNewItemsElement: (text: string, done?: boolean, crucial?: boolean, createdDate?:number) => void;
    creatNewElement: (value: string) => void;
    addNewElement: string;
    removeElements: () => void;
}

const TodoInput = ({addItemElement,addNewItemsElement, addNewElement, creatNewElement, removeElements}:TodoInputProps) => {
    return (
        <div className="w-full sticky flex flex-col top-0 lg:py-0 bottom-0 px-4 mx-auto sm:px-20 py-6 lg:px-0 lg:items-center lg:w-1/2 lg:relative bg-white lg:bg-transparent">
            <div className="lg:mt-4 sm:p-0 flex flex-row lg:w-full lg:mb-4">
                <input 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); 
                            if (e.target instanceof HTMLInputElement) {
                                addItemElement(e.target.value, false);
                            }
                        }
                    }} className="border w-full flex-1 h-12 sm:h-auto rounded-t-xl lg:rounded-t-none rounded-b-xl p-2" value={addNewElement} name="addValue" onChange={event => creatNewElement(event.target.value)} title="ajouter à la liste" placeholder="Ajouter un éléments"></input>
                <button className="bg-green-dark text-white px-4 py-2 ml-2 h-12 lg:h-auto rounded-t-xl rounded-b-xl lg:rounded-t-none lg:rounded-b-xl sm:ml-2" onClick={() => addItemElement(addNewElement, false)}>Ajouter</button>
            </div>
            <button className="text-xs mt-4 sm:mt-0 text-gray-700 lg:mb-4 hover:text-gray-400 w-auto" onClick={removeElements}>Supprimer toutes les taches faites</button>
        </div>
    )
}

export default TodoInput;