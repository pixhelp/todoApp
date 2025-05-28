import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuToggleProps {
    mobileMenuShowHide: () => void;
    isActiveMenuMobile: boolean
}

const Header = ({mobileMenuShowHide, isActiveMenuMobile}: MobileMenuToggleProps) => {    
    const Icon = isActiveMenuMobile ? X : Menu;

    return (
        <div className="flex flex-row justify-center bg-green-light font-playwrite text-white p-4 text-xl lg:text-2xl">
            <Link className="flex flex-row items-center justify-center" to={"/"}>
                My todo
            </Link>
            <div className="block lg:hidden ml-auto">
                <Icon size={30} strokeWidth={2} onClick={mobileMenuShowHide} />
            </div>
        </div>

    )
}

export default Header;