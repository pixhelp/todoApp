import MenuLink from "../MenuLink/MenuLink"

interface MobileMenuToggleProps {
    isMenuVisible: boolean;
    closeMenuMobile: () => void;
}

const MobileMenu = ({isMenuVisible, closeMenuMobile}:MobileMenuToggleProps) => {

    const menuLink = [
      {
        LinkMenu: "/my-todo-list",
        Text: "Ma todo liste"
      },
      {
        LinkMenu: "/Historique",
        Text: "Historique"
      },
      {
        LinkMenu: "/Finished",
        Text: "Terminées"
      },
      {
        LinkMenu: "/Archives",
        Text: "Archivées"
      },
      {
        LinkMenu: "/Historique",
        Text: "Historique"
      }

    ];


    return (
        <div className={
                "z-10 w-full duration-200 ease-in text-gray-800 transition-all bg-light-gray absolute " +
                (isMenuVisible ? "h-full left-0" : "left-96 opacity-0 w-0 h-0 overflow-hidden")}>
            <div className="flex text-gray-800 flex-col items-center justify-center">
                {menuLink.map((link, index) => (
                    <MenuLink 
                        key= {index}
                        LinkMenu={link.LinkMenu}
                        Text={link.Text}
                        closeMenuMobile={closeMenuMobile}
                    />
                ))}
            </div>
        </div>
    )
}

export default MobileMenu;