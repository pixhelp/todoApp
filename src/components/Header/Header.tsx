import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex flex-row justify-center bg-green-light font-playwrite text-white p-4 text-xl lg:text-2xl">
            <Link className="flex flex-row items-center justify-center" to={"/"}>
                My todo
            </Link>
            <Menu className="absolute right-6 top-4" size={30} />
        </div>
    )
}

export default Header;