import { useState, useEffect,useContext} from 'react'
import React from "react";
import '../switch/switch.css'
import Flag from 'react-world-flags'
import en from '../../../assets/uk.svg'
import lt from '../../../assets/LT.svg'
import de from '../../../assets/DE.svg'
import ru from '../../../assets/RU.svg'
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../../context/languageContext';
import { ThemeContext } from '../../../context/themeContext';
import Select from 'react-select';
import { FaFirefox, FaOpera, FaInternetExplorer } from "react-icons/fa";
import { components } from "react-select";
function Switch() {
  const options = [
    { value: 'en', label: 'EN', imageUrl: en,icon: FaOpera},
    { value: 'ru', label: 'RU', imageUrl: ru, icon: FaFirefox},
    { value: 'lt', label: 'LT', imageUrl: lt, icon: FaInternetExplorer },
    { value: 'de', label: 'DE', imageUrl: de, icon: FaInternetExplorer },
  ];
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [menuPlacement, setMenuPlacement] = useState("bottom");

  const [theme2, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'true';
  });

  // const [theme,setTheme] = useState(localStorage.getItem('theme') || false)
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || navigator.language);
  useEffect(()=>{
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
  },[selectedLanguage])

  // const handleLanguageChange = (e) => {
  //   console.log(e.target.value)
  //   const selectedLanguage = e.target.value;
  //   setSelectedLanguage(selectedLanguage);
  //   setLanguageChange(!languageChange);
  // }
  const handleLanguageChange = (selectedOption) => {
    console.log("HERE")
    const selectedLanguage = selectedOption.value;
    console.log(selectedLanguage)
    setSelectedLanguage(selectedLanguage);
  }

  useEffect(() => {
    // Check if "theme" value exists in localStorage
    const storedTheme = localStorage.getItem('theme');
    const boolValue = storedTheme === 'true';
    // If "theme" value doesn't exist in localStorage, set it to false
    if (boolValue) {
      setTheme(boolValue)
      console.log(boolValue)
      // localStorage.setItem('theme', false);
    }

    if(boolValue)
      {
        console.log('ATEJO CIA')
        document.body.classList.add('darkTheme');
      }else{
        document.body.classList.remove('darkTheme');
      }
  }, []);
  const changeTheme = () =>{
      localStorage.setItem('theme', !theme2);
      console.log(!theme2)
      setTheme(!theme2)
      const storedTheme = localStorage.getItem('theme');
      const boolValue = storedTheme === 'true';
      if(boolValue != theme){
        toggleTheme();
      }
      if(boolValue)
      {
        console.log('ATEJO CIA')
        document.body.classList.add('darkTheme');
      }else{
        document.body.classList.remove('darkTheme');
      }
  }
  const Option = props => {
    const CComponent = props.data.icon;
    return (
      <components.Option {...props} >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={props.data.imageUrl} height="16" width="16" style={{ marginRight: "8px" }} />
          {props.data.label}
        </div>
      </components.Option>
    );
  };
  const getValue = () => {
    const selectedOption = options.find(option => option.value === selectedLanguage);
    if (selectedOption) {
      return {
        value: selectedOption.value,
        label: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={selectedOption.imageUrl} height="16" width="16" style={{ marginRight: "8px" }} />
            {selectedOption.label}
          </div>
        )
      };
    }
    return null;
  };
  useEffect(() => {
    const handleWindowResize = () => {
      setMenuPlacement(window.innerWidth <= 1000 ? "top" : "bottom");
    };

    handleWindowResize(); // Set initial menu placement on component mount

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
    <div className='switch-container'>
        <label className='switch'>
            <input onChange={() => changeTheme()} checked={theme2} type='checkbox'/>
            <span className='slider rounded'/>
        </label>
        {/* <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="lt">LT</option>
            <option value="de">DE</option>
        </select> */}
     <Select
        options={options}
        value={getValue()}
        onChange={handleLanguageChange}
        isDisabled={false}
        components={{ Option }}
        isSearchable={false}
        menuPlacement={menuPlacement}
        styles={{
          singleValue: (provided) => ({
            ...provided,
            color: 'black', // Set the desired text color here
          }),
          option: (provided) => ({
            ...provided,
            color: 'black', // Set the desired text color for dropdown options
          }),
        }}
      />
    </div>
  )
}

export default Switch
