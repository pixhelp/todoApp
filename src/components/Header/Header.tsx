import { ListFilterPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-green-light font-playwrite text-white p-4 text-2xl">
            <Link className="flex flex-row items-center justify-center" to={"/Home"}>
                My todo
                <ListFilterPlus className="rotate-180" size={40} />
            </Link>
        </div>
    )
}

export default Header;