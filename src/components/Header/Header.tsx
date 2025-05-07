import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuToggleProps {
    mobileMenuShowHide: () => void;
}

const Header = ({mobileMenuShowHide}: MobileMenuToggleProps) => {    
    return (
        <div className="flex flex-row justify-center bg-green-light font-playwrite text-white p-4 text-xl lg:text-2xl">
            <Link className="flex flex-row items-center justify-center" to={"/"}>
                My todo
            </Link>
            <Menu className="lg:hidden block absolute right-6 top-4 " onClick={mobileMenuShowHide} size={30} />
        </div>
    )
}

export default Header;