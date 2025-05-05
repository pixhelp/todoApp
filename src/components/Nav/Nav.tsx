import { Link } from "react-router-dom";

const Nav = () => {
    return(
        <div className="pt-1 h-12 bg-beige-hyper-light">
            <div className="flex text-gray-800 flex-row w-1/2 items-center justify-center">
                <Link className="hover:border-gray-400 hover:border-b p-2 cursor-pointer" to={"/My-todo-list"}>Liste de taches</Link>
                <Link className="hover:border-gray-400 hover:border-b p-2 cursor-pointer" to={"/Historique"}>Historique</Link>
                <Link className="hover:border-gray-400 hover:border-b p-2 cursor-pointer" to={"/Archives"} >Archivées</Link>
            </div>
        </div>
    )
} 

export default Nav;