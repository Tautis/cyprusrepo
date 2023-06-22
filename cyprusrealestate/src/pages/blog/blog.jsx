import { useState, useEffect} from 'react'
import './blog.css'
import NavBar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

function Blog() {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

    const [selectedLanguage2, setSelectedLanguage2] = useState(localStorage.getItem('selectedLanguage') || navigator.language);
    const [blogs, setBlogs] = useState([]);
    const [preview, setPreview] = useState([]);
    const {t,i18n} = useTranslation();
    useEffect(()=>{
      i18n.changeLanguage(selectedLanguage2);
        localStorage.setItem('selectedLanguage', selectedLanguage2);
    },[selectedLanguage2])


    useEffect(() =>{
        const fetchData = async () =>{
            const response = await axiosInstance.get(`/blogs/getAll`,{
                params:{
                    language:i18n.language
        }})
        console.log(response)
        setBlogs(response.data.data)
        }
        fetchData()
    },[i18n.language])

    return (
      <>
  <NavBar/>

        <div className='blogWrap'>
          <h2>{t('blogs.title')}</h2>
          <div className='blogItemWrap'>
            {blogs && blogs.map((item, key) => {
              const isEven = key % 2 === 0;
              return (
                <a href={'/blog?id='+item.id}>
               
                    <div className='blogItem' key={key}>
                      <div>
                        <img src={item.image} />
                      </div>
                      <div className='blogText'>
                        <p className='bold smalltext margint0'>{item.title}</p>
                        <p>{item.preview}...<a>Read More...</a></p>
                      </div>
                    </div>
                </a>
              );
            })}
          </div>
        </div>
        <Footer/>
        </>
      );
  
}

export default Blog
// {isEven ? (
//   <div className='blogItem' key={key}>
//     <div>
//       <img src={item.image} />
//     </div>
//     <div className='blogText'>
//       <p className='bold smalltext margint0'>{item.title}</p>
//       <p>{item.preview}...<a>Read More...</a></p>
//     </div>
//   </div>
// ) : (
//   <div className='blogItem' key={key}>
//     <div className='blogText'>
//       <p className='bold smalltext margint0'>{item.title}</p>
//       <p>{item.preview}...<a>Read More...</a></p>
//     </div>
//     <div>
//       <img src={item.image} />
//     </div>
//   </div>
// )}