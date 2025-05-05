import './App.css'
import { useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from "./components/Menu/Menu";
import MobileMenu from "./components/Menu/MobileMenu"
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname !== '') {
      setIsMobileMenuVisible(false);
    }

  },[pathname]);

  function mobileMenuToggle() {
    if (!isMobileMenuVisible) {
        setIsMobileMenuVisible(true)
    } else {
        setIsMobileMenuVisible(false)
    }
  }

  function closeMenu() {
    console.log('coucou')
    setIsMobileMenuVisible(false)
}

  return (
    <div className='overflow-hidden w-full'>
      <Header
        mobileMenuShowHide={mobileMenuToggle}
        />
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
