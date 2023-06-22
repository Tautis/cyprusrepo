import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import '../threemore/3more.css'
function More3() {
  const [data,setData] = useState([])
  const [images,setImages] = useState([])
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

  const storedUrls = localStorage.getItem('recentIds');
  const [selectedLanguage2, setSelectedLanguage2] = useState(localStorage.getItem('selectedLanguage') || navigator.language);

  const {t,i18n} = useTranslation();

  useEffect(()=>{
    i18n.changeLanguage(selectedLanguage2);
      localStorage.setItem('selectedLanguage', selectedLanguage2);
  },[selectedLanguage2])
  useEffect(()=>{
    const fetchData = async () => {
      
      const response = await axiosInstance.get(`/posts/get3Random`,{
        params:{
          language:i18n.language
        },
      })
      setData(response.data.posts)
      setImages(response.data.images)
          }
    fetchData();
  }, [i18n.language]);
  
  
  return (
    <div className='more-component'>
        <p className='bigtext'>{t('more3.title')}</p>
        <div className='more-wrap'>
        {data.map((item, index) => (
          <div className='more-component'>
          <img src={images[index].url}/>
            <p>{item.location}</p>
            <p>{item.title}</p>
            <p>{t('more3.price')}: {item.price}</p>
        </div>
        ))}
        </div>
    </div>
  );
}

export default More3;