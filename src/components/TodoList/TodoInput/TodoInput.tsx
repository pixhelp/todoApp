
interface TodoInputProps {
    addItemElement: (text: string, title: string, done?: boolean, crucial?: boolean, createdDate?: number) => void;
    addNewItemsElement: (text: string, done?: boolean, title?: string, crucial?: boolean, createdDate?:number) => void;
    creatNewElement: (value: string) => void;
    creatNewTitleElement: (value: string) => void;
    addTitleElement: (value: string) => void;
    addNewTitleElement: string;
    addNewElement: string;
    removeElements: () => void;
}

const TodoInput = ({addItemElement,addNewTitleElement, creatNewTitleElement, addNewItemsElement, addNewElement, creatNewElement, removeElements}:TodoInputProps) => {
    return (
        <div className="w-full sticky flex flex-col top-0 lg:py-0 bottom-0 px-4 mx-auto sm:px-20 py-6 lg:px-0 lg:items-center lg:w-1/2 lg:relative bg-white lg:bg-transparent">
            <div className="lg:my-4 sm:p-0 flex flex-col lg:w-full">
                <input 
                    type="text" 
                    className="h-20 border w-full flex-1 p-2 rounded-lg" 
                    value={addNewTitleElement} 
                    name="addValue" 
                    onChange={event => creatNewTitleElement(event.target.value)} 
                    title="Titre de la tache" 
                    placeholder="Titre de la tache"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.target instanceof HTMLInputElement) {
                                addItemElement(e.target.value, addNewTitleElement, false);
                            }
                        }
                    }}
                />

                <textarea 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); 
                            if (e.target instanceof HTMLTextAreaElement) {
                                addItemElement(e.target.value, addNewElement, false);
                            }
                        }
                    }} className="my-4 h-20 border w-full flex-1 p-2 rounded-lg" value={addNewElement} name="addValue" onChange={event => creatNewElement(event.target.value)} title="ajouter à la liste" placeholder="Ajouter un éléments"></textarea>
                <button className="bg-green-dark text-white px-4 py-2 ml-2 h-12 lg:h-auto rounded-lg sm:ml-2" onClick={() => addItemElement(addNewElement, addNewTitleElement)}>Ajouter</button>
            </div>
            <button className="text-xs mt-4 sm:mt-0 text-gray-700 lg:mb-4 hover:text-gray-400 w-auto" onClick={removeElements}>Supprimer toutes les taches faites</button>
        </div>
    )
}

export default TodoInput;