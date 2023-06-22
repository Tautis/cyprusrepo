import { useState, useEffect,Fragment, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './pages/components/navbar/navbar'
import Home from './pages/home/home'
import Apartaments from './pages/apartaments/apartaments'
import Footer from './pages/components/footer/footer'
import Login from './pages/login/login';
import PrivateRoute from './privatRoutes';
import Admin from './pages/admin/admin';
import { RequireAuth } from 'react-auth-kit';
import ReactGA from 'react-ga';
import Search from './pages/search/search';
import { DetailsProvider } from './context/detailsContext';
import { LanguageProvider } from './context/languageContext';
import Blog from './pages/blog/blog';
import { Theme } from './context/themeContext';
import BlogPage from './pages/blogPage/blogPage';
ReactGA.initialize('G-N2FGGLZRHP');
function App() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  // const [theme, setTheme] = useState(false);
  // const value = { theme, toggleTheme };
  useEffect(() => {
    // Check if "theme" value exists in localStorage
    const storedTheme = localStorage.getItem('theme');
    const boolValue = storedTheme === 'true';

    // If "theme" value doesn't exist in localStorage, set it to false
    if (!storedTheme) {
      console.log("SETTING")
      localStorage.setItem('theme', false);
    }
   
  }, []);

  
  return (
    <DetailsProvider>
    <Fragment>
      <Theme>
      <Routes>
        <Route exact path='/admin' element={<RequireAuth loginPath='/login'>
          <Admin/>
          </RequireAuth>}>
          <Route exact path='/admin' element={<Admin/>}/>
        </Route>
          <Route exact path='/apartaments/property' element={<Apartaments/>}/>
          <Route exact path='/apartaments' element={<Search/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/blogs' element={<Blog/>}/>
          <Route exact path='/blog' element={<BlogPage/>}/>
        
      </Routes>
      </Theme>
    </Fragment>
    </DetailsProvider>
  )
}

export default App
