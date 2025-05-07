import './App.css'
import { useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from "./components/Menu/Menu";
import MobileMenu from "./components/Menu/MobileMenu"
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname !== '') {
      setIsMobileMenuVisible(false);
    }

  },[pathname]);

  useEffect(() => {
    if (isMobileMenuVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMobileMenuVisible])

  const mobileMenuToggle = () => {
    if (!isMobileMenuVisible) {        
        setIsMobileMenuVisible(true)
    } else {
        setIsMobileMenuVisible(false)
    }
  }

  const closeMenu = () => {
    setIsMobileMenuVisible(false)
}

  return (
    <div>
      <Header mobileMenuShowHide={mobileMenuToggle}/>
      <Menu/>
      <MobileMenu
        closeMenuMobile={closeMenu}
        isMenuVisible={isMobileMenuVisible}
      />
      <Main/>     
      <Footer/>
    </div>
  )
}

export default App
