import MenuLink from "../MenuLink/MenuLink"

interface MobileMenuToggleProps {
    isMenuVisible: boolean;
    closeMenuMobile: () => void;
}


const MobileMenu = ({isMenuVisible, closeMenuMobile}:MobileMenuToggleProps) => {
    return (
        <>
        <div className={
                "h-full z-10 w-full duration-200 ease-in text-gray-800 transition-all bg-light-gray absolute " +
                (isMenuVisible ? "left-0" : "left-96 opacity-0 w-0 h-0 overflow-hidden")}>
            <div className="flex text-gray-800 flex-col items-center justify-center">
                <MenuLink 
                    closeMenuMobile={closeMenuMobile}
                    LinkMenu="/my-todo-list"
                    Text="Liste de taches"/>
                 <MenuLink 
                    closeMenuMobile={closeMenuMobile}
                    LinkMenu="/Historique"
                    Text="Historique" />
                 <MenuLink 
                    closeMenuMobile={closeMenuMobile}
                    LinkMenu=""
                    Text="Archivées" />
            </div>
        </div>
        </>
    )
}

export default MobileMenu;