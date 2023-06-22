import { useState, useEffect} from 'react'
import React, { useContext } from "react";
import { useLocation, Link  } from 'react-router-dom';
import '../navbar/navbar.css'
import logo from '../../../assets/mainlogo.svg'
import logowhite from '../../../assets/logo_white.svg'
import { AuthContext } from "../../../context/AuthContext";
import { useSignOut } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import Switch from '../../components/switch/switch';
import { ThemeContext } from '../../../context/themeContext';
import {scroller } from 'react-scroll';
function NavBar() {
  const location = useLocation();
  const [pathName, setPathName] = useState();
    const [click, setClick] = useState(false);
    const handleClick = () =>{
      setClick(!click);
      const storedTheme = localStorage.getItem('theme');
      const boolValue = storedTheme === 'true';
      console.log(boolValue)
      setTheme(boolValue)
    } 
    const { currentUser, logout } = useContext(AuthContext);
    const signOut = useSignOut();
    const {t,i18n} = useTranslation();
    const [page, setPage] = useState('') 
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [theme2, setTheme] = useState(() => {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme === 'true';
    });
    useEffect(() => {
      const handleStorageChange = (event) => {
        if (event.key === 'theme') {
          setTheme(event.newValue || false);
        }
      };
  
      // Subscribe to the storage event
      window.addEventListener('storage', handleStorageChange);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);;


const isMobile = window.innerWidth <= 1000;
useEffect(() => {
  const pathname = window.location.pathname;
  setPathName(pathname)
  const pageName = pathname === '/' ? 'home' : pathname.substring(1); // Extract page name
  console.log(pathName)
  setPage(pageName); // Output: 'home' or 'about', 'contact', etc. depending on the URL
  console.log(pageName)
  // Rest of your component logic...
}, []);

  return (
    <div className='container'>
      {!isMobile? (
        <Switch/>
      ):null}
      <div id="navbar" className={click ? "navbar opened" : "navbar"}>
      {click ? <div className="line"></div> : null}
        <div className='flex-items navlogo'>
            <a className='nav-logo' href='/'> 
            <img src={!click && theme ? logowhite : (click ? logowhite : logo)} />
            </a>
        </div>
        <div className='flex-items'>
            <ul className={click ? "opened" : "closed"}>
                <li className={`${click && page === 'home' ? 'whitetext' : click ? 'gray' : ''}`}> <a className={pathName === "/" ? "greenText" :"" } href='/'>{t('navbar.home')}</a></li>
                {click && page === 'home' ? <div className="lineline"></div> : null}
                <li className={`${click && page === 'about' ? 'whitetext' : click ? 'gray' : ''}`}> <Link to="/#aboutus"
            >{t('navbar.about')}</Link></li>
                {click && page === 'about' ? <div className="lineline"></div> : null}
                <li className={`${click && page === 'apartaments' ? 'whitetext' : click ? 'gray' : ''}`}> <a  className={pathName === "/apartaments" ? "greenText" :"" } href='/apartaments'>{t('navbar.apartaments')}</a></li>
                {click && page === 'apartaments' ? <div className="lineline"></div> : null}
                <li className={`${click && page === 'blog' ? 'whitetext' : click ? 'gray' : ''}`}> <a className={pathName === "/blogs" ? "greenText" :"" } href='/blogs'>{t('navbar.blog')}</a></li>
                {click && page === 'blog' ? <div className="lineline"></div> : null}
                <li className={`${click && page === 'contact' ? 'whitetext' : click ? 'gray' : ''}`}> <Link to="/#contactus" >{t('navbar.contact')}</Link></li>
                {click && page === 'contact' ? <div className="lineline"></div> : null}
                {/* {currentUser ? (
                  <li><a href="#" onClick={logout}>LOGOUT</a></li>
                ):null} */}
                {/* <li><a href="#" onClick={signOut}>LOGOUT</a></li> */}
                {isMobile? (
                  <div className='mobileSwitch'>
                  <Switch/>
                  </div>
                ):null}
            </ul>

            <div className={click ? 'nav-icon1 open' : 'nav-icon1'}onClick={handleClick}>
            <span style={{ backgroundColor: (!click && !theme) ? 'black' : (!click && theme) ? 'white' : 'white' }}></span>
            <span style={{ backgroundColor: (!click && !theme) ? 'black' : (!click && theme) ? 'white' : 'white' }}></span>
            <span style={{ backgroundColor: (!click && !theme) ? 'black' : (!click && theme) ? 'white' : 'white' }}></span>

            </div>
        </div>
        </div>
    </div>
  )
}

export default NavBar
