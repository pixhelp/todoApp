import { Link } from "react-router-dom";

interface MobileMenuToggleProps {
    isMenuVisible:boolean;
}


const MobileMenu = ({isMenuVisible}:MobileMenuToggleProps) => {
    return (
        <>
        <div className={
                "h-full z-10 w-full duration-200 ease-in text-gray-800 transition-all bg-light-gray absolute " +
                (isMenuVisible ? "left-0" : "left-96 opacity-0 w-0 overflow-hidden")}>
            <div className="flex text-gray-800 flex-col items-center justify-center">
                <Link className="w-full text-center hover:bg-beige-light p-4 cursor-pointer" to={"/My-todo-list"}>Liste de taches</Link>
                <Link className="w-full text-center hover:bg-beige-light p-4 cursor-pointer" to={"/Historique"}>Historique</Link>
                <Link className="w-full text-center hover:bg-beige-light p-4 cursor-pointer" to={"/Archives"} >Archivées</Link>
            </div>
        </div>
        </>
    )
}

export default MobileMenu;