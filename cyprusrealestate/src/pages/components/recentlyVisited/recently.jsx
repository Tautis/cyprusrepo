import React, { useEffect, useState } from 'react';
import ruApartaments from '../../../assets/apt_ru.json'
import euApartaments from '../../../assets/apt_en.json'
import '../recentlyVisited/recently.css'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

function RecentlyVisited(){
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})
  
    // Get URLs from local storage
    const [data,setData] = useState([])

  const storedUrls = localStorage.getItem('recentIds');
  const [selectedLanguage2, setSelectedLanguage2] = useState(localStorage.getItem('selectedLanguage') || navigator.language);

  const {t,i18n} = useTranslation();

  useEffect(()=>{
    i18n.changeLanguage(selectedLanguage2);
      localStorage.setItem('selectedLanguage', selectedLanguage2);
  },[selectedLanguage2])
  useEffect(()=>{
    const fetchData = async () => {
      
      const response = await axiosInstance.get(`/posts/getRecent`,{
        params:{
          id:storedUrls,
          language:i18n.language
        },
      })
      setData(response.data)
      console.log(response.data[0].images[0].url)
          }
    fetchData();
  }, [i18n.language]);
  
  
  return (
    <div className='recent-component'>
      <p className='bigtext'>{t('recent.title')}</p>
      <div className='recent-wrap'>
      {data && data.map((item, index) => (
        <div>
            <img src={item.images[0].url}/>
            <p>{item.post[0].location}</p>
            <p>{item.post[0].title}</p>
            <p>From : {item.post[0].price}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default RecentlyVisited;