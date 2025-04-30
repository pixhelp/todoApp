
interface TodoInputProps {
    addItemElement: (text: string, done?: boolean) => void;
    addNewItemsElement: (text: string, done?: boolean) => void;
    creatNewElement: (value: string) => void;
    addNewElement: string;
    
}

const TodoInput = ({addItemElement,addNewItemsElement, addNewElement, creatNewElement}:TodoInputProps) => {
    return (
        <div className="w-full xl:mt-4 sticky top-0 xl:relative bottom-4 sm:p-0 flex flex-col sm:flex-row">
            <input  
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); 
                        if (e.target instanceof HTMLInputElement) {
                            addItemElement(e.target.value, false);
                        }
                    }
                }} className="border h-12 sm:h-auto rounded-b-xl w-full p-2" value={addNewElement} name="addValue" onChange={event => creatNewElement(event.target.value)} title="ajouter à la liste" placeholder="Ajouter un éléments"></input>
            <button className="bg-green-dark text-white px-4 py-2 mt-4 sm:mt-0 h-12 sm:h-auto rounded-t-xl rounded-b-xl sm:rounded-t-none sm:rounded-b-xl sm:ml-2" onClick={() => addItemElement(addNewElement, false)}>Ajouter</button>
        </div>
    )
}

export default TodoInput;