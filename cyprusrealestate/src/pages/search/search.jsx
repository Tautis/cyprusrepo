import { useState, useEffect  } from 'react'
import React, { useContext } from "react";
import axios from 'axios';
import '../search/search.css'
import testphoto from '../../assets/seven.png'
import NavBar from '../components/navbar/navbar';
import { DetailsContext } from '../../context/detailsContext';
import bath from '../../assets/bath.svg'
import bed from '../../assets/bed.svg'
import sqvt from '../../assets/sqvt.svg'
import Switch from '../components/switch/switch';
import Footer from '../components/footer/footer';
import bgvideo from '../../assets/video2.mp4';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTranslation } from 'react-i18next';

import {BsChevronLeft,BsChevronRight} from 'react-icons/bs';

function Search() {
const [storageChangeFlag, setStorageChangeFlag] = useState(false);
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

const {t,i18n} = useTranslation();
useEffect(()=>{
    i18n.changeLanguage(localStorage.getItem('selectedLanguage') || navigator.language);
    localStorage.setItem('selectedLanguage', i18n.language);
  },[i18n.language])
const { details, setDetails } = useContext(DetailsContext);
const [selectedLanguage, setSelectedLanguage] = useState('EN');
const [posts,setPosts] = useState([])
const [currentPage,setCurrentPage] = useState(1)
const [pages,setPages] = useState(1)
const [count,setCount] = useState('')
const [testimonials, setTestimonials] = useState([]);
const [currencySymbol, setCurrencySymbol] = useState('$');
const handleClick = () => {
    navigate('/apartaments');
  };
// const [details, setDetails] = useState({
//     region:"",
//     type:"",
//     noRooms:"",
//     keyword:"",
//     priceRange:"",
//     currency:"",
//     sortBy:"",
// });
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const clearDetails = () => {
    setDetails({
      region:"",
      type:"",
      noRooms:"",
      keyword:"",
      priceRange:"",
      currency:"",
      sortBy:"",
    });
    setButtonClicked(!buttonClicked)
    setCurrentPage(1)
  };
const [buttonClicked, setButtonClicked] = useState(false);
    const [searchData, setSearchData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response2 = await axiosInstance.get(`/posts/searchDataEN`,{
                params:{
                    selectedLanguage2:i18n.language
                },
            })
            setSearchData(response2.data.prefs)
           
        }
        fetchData();
        clearDetails();
        
      }, [i18n.language]);
      useEffect(() => {
        setCurrencySymbol(details.currency)
        const fetchPosts = async () => {
          if(details.currency ==''){
            setDetails((prevState) => ({
              ...prevState,
              ["currency"]: 'USD',
            }));
          }
          console.log("TRYING")
          const response2 = await axiosInstance.get(`/posts/getPostsEN`, {
            params: { details, currentPage,selectedLanguage2:i18n.language },
          });
          setTestimonials(response2.data.testimonials)
          setPosts(response2.data.posts);
          setPages(response2.data.pages)
          setCount(response2.data.count)
        };
        fetchPosts();
      }, [buttonClicked,currentPage,i18n.language]); 

  return (
  <>
  <NavBar/>
  <p>{count}</p>
    <div className='searchBox-Wrap'>
        <div className='searchBox grid1'>
            <div className='region'>
                <label>{t('searchMenu.region')}</label>
                <select name="region" id={details.region} value={details.region} onChange={handleInputChange}>
                <option value="">-</option>
                {searchData && searchData.map((data,key)=>{
                    return(
                    <option value={data.location}>{data.location}</option>
                    )
                })}
                </select>
                {/* <input placeholder='Kyrentia District'></input> */}
            </div>
            <div className='type'>
                <label>{t('searchMenu.type')}</label>
                <select name="type" value={details.type} id={details.type} onChange={handleInputChange}>
                    <option value="">-</option>
                    <option value="2">Villa</option>
                    <option value="1">Apartament</option>
                </select>
            </div>
            <div className='RoomCount'>
                <label>{t('searchMenu.nor')}</label>
                <select name='noRooms' id={details.noRooms} value={details.noRooms} onChange={handleInputChange}>
                    <option value="">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className='keyWord'>
                <label>{t('searchMenu.search')}</label>
                <input name='keyword' placeholder='Key Words' value={details.keyword}
                onChange={handleInputChange}/>
            </div>
        </div>
        <div className='searchBox grid2'>
            <div className='price'>
                <label>{t('searchMenu.price')}</label>
                <select name='priceRange' value={details.priceRange} onChange={handleInputChange}>
                    <option value="">-</option>
                    <option value="50000 150000">50,000 - 150,000</option>
                    <option value="50000 200000">50,000 - 200,000</option>
                    <option value="50000 300000">50,000 - 300,000</option>
                    <option value="50000 500000">50,000 - 500,000</option>
                    <option value="50000 2000000">50,000 - 2,000,000</option>
                </select>
            </div>
            <div className='currency'>
                <label>{t('searchMenu.currency')}</label>
                <select name="currency" value={details.currency}
                onChange={handleInputChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                
                </select>
            </div>
            <div className='sortBy'>
                <label>{t('searchMenu.sort')}</label>
                <select name="sortBy" value={details.sortBy}
                onChange={handleInputChange}>
                    <option value="">-</option>
                    <option value="MW">{t('searchMenu.mw')}</option>
                    <option value="MP">{t('searchMenu.mp')}</option>
                    <option value="PH">{t('searchMenu.hl')}</option>
                    <option value="PL">{t('searchMenu.lh')}</option>
                </select>

            </div>
            <div id='start' className='search2'>
              <button type="button" onClick={() => {setButtonClicked(!buttonClicked),setCurrentPage(1),setCurrencySymbol(details.currency)}} className=''>{t('searchMenu.button')}</button>
              <a onClick={clearDetails}><p>{t('searchMenu.button2')}</p></a>
            </div>
        </div>
        </div>
        <div className='pagination'>
            <a href="#start" onClick={() => {
  if (currentPage > 1) {setCurrentPage(currentPage - 1);}}}><BsChevronLeft/></a>{currentPage}/{pages}<a onClick={() =>{if(currentPage != pages) {setCurrentPage(currentPage + 1);}}}><BsChevronRight/></a>
        </div>
        <div  className='search_adverts'>

        {posts.map((data,key)=>{
            return(
                <a href={'/apartaments/property?id='+data.id}>
                <div className='advert'>
                    <img className='imgtemp' src={data.images[0].url}/>
                    <div className='greenbg'> 
                    <p className='floatingPrice'>
  {currencySymbol === 'USD' ? '$' :
   currencySymbol === 'RUB' ? '₽' :
   currencySymbol === 'EUR' ? '€' : '$'}
  {data.price}
</p>
                    </div>
                    <div>
                <p>{data.title}</p>
                <p className='locationText'>{data.location}</p>
                <div className='details'>
                    <p><img src={sqvt}/>{data.m2}m²</p>
                    <p><img src={bed}/>{data.bedrooms} {t('main.bedText')}</p>
                    <p><img src={bath}/>{data.bathrooms} {t('main.bathText')}</p>
                </div>
                </div>
            </div>
            </a>
            )
        })}
        
            </div>
            <div className='pagination'>
            <a href="#start" onClick={() => {
  if (currentPage > 1) {setCurrentPage(currentPage - 1);}}}><BsChevronLeft/></a>{currentPage}/{pages}<a onClick={() =>{if(currentPage != pages) {setCurrentPage(currentPage + 1);}}}><BsChevronRight/></a>
        </div>

        <div className='blackbox'>
      <video autoPlay loop muted playsinline>
          <source src={bgvideo} type="video/mp4"/>
        </video>
        <div className='bgunset'>
          <p className=''>{t('banner2.title')}</p>
          <p className='bigtext margint0'>{t('banner2.text')}</p>
          <button onClick={handleClick} className='transparent thickborder white-border'>{t('banner2.button')}</button>
        </div>
      </div>
      <div className='testimonials wrap'>
        <p className='bigtext marginb0'>{t('testimonials.title')}</p>
        <p className='margint0 smallbold'>{t('testimonials.text')}</p>
      <Swiper 
      className="mySwiper"
      navigation={true}
      breakpoints={{
        // when window width is >= 640px
        100: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        900: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={50}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {testimonials && testimonials.map((item,key)=>{
        return(
          <SwiperSlide>
            <div>
              <img src={item.image}/>
            </div>
            <div>
              <p className='marginb0 smallbold'>{item.name}</p>
              <p className='marginb0 margint0'>CLIENT</p>
              <p>{item.text}</p>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
      </div>
            <Footer/>
    </>
  )
}

export default Search
