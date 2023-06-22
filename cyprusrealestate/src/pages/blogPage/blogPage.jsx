import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import NavBar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import '../blogPage/blogPage.css';

function BlogPage() {

  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})


  const { t, i18n } = useTranslation();
  const [id, setId] = useState(null);
  const [selectedLanguage2, setSelectedLanguage2] = useState(
    localStorage.getItem('selectedLanguage') || navigator.language
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idd = urlParams.get('id');
    setId(idd);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage2);
    localStorage.setItem('selectedLanguage', selectedLanguage2);
  }, [selectedLanguage2]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        console.log(id);
        const response = await axiosInstance.get(`/blogs/getABlog`, {
          params: {
            id: id,
            language: i18n.language
          }
        });
        setData(response.data.blog);
      }
    };

    fetchBlog();
  }, [id, i18n.language]);

  return (
    <>
      <NavBar />

<div className='BlogWrap'>
{data && <img src={data.image}/>}
<div className='authorAndDate'>
{data &&<p className='author'>{data.author}</p>}

{data &&<p className='date'>{data.formattedDate}</p>}
</div>
{data && <h2>{data.title}</h2>}

{data && <p className='content'>{data.content}</p>}
</div>

      <Footer />
    </>
  );
}

export default BlogPage;