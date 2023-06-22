import { useState, useEffect,useContext,useRef  } from 'react'
import './home.css'

import { useNavigate,useLocation } from 'react-router-dom';
import bgvideo from '../../assets/video2.mp4';
// import ruText from '../../assets/apt_en.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import axios from 'axios';
import SwiperCore, {Navigation} from 'swiper';
import logo from '../../assets/mainlogo.svg'
import Footer from '../components/footer/footer';
import NavBar from '../components/navbar/navbar';
import ContactForm from '../components/contactForm/contactForm';
import Cookies from 'js-cookie';
import Switch from '../components/switch/switch';
import locationimg from '../../assets/location.svg'
import type from '../../assets/type.svg'
import bath from '../../assets/bath.svg'
import bed from '../../assets/bed.svg'
import sqvt from '../../assets/sqvt.svg'
import { useTranslation } from 'react-i18next';
import { DetailsContext } from '../../context/detailsContext';
import { Link as ScrollLink, Element } from 'react-scroll';
import card1 from '../../assets/card1.svg'
import card2 from '../../assets/card2.svg'
import card3 from '../../assets/card3.svg'
import card4 from '../../assets/card4.svg'

function Home() {
  const [selectedLanguage2, setSelectedLanguage2] = useState(localStorage.getItem('selectedLanguage') || navigator.language);
  const [currency, setCurrency] = useState("")

const {t,i18n} = useTranslation();
useEffect(()=>{
  i18n.changeLanguage(selectedLanguage2);
    localStorage.setItem('selectedLanguage', selectedLanguage2);
},[selectedLanguage2])


// const [popular,setPopular] = useState([])
const [today,setToday] = useState([])
const [month,setMonth] = useState([])
const [popularBool, setPopularBool] = useState(false)
const [popular,setPopular] = useState([])
const [popular2,setPopular2] = useState([])
const [selectedLanguage, setSelectedLanguage] = useState('EN');
const [searchData, setSearchData] = useState([]);
const [blogs, setBlogs] = useState([]);
const [testimonials, setTestimonials] = useState([]);
const { details, setDetails } = useContext(DetailsContext);
const [language, setLanguage] = useState("");
const navigate = useNavigate();
const location = useLocation();
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

const handleClick = () => {
  navigate('/apartaments');
};

SwiperCore.use([Navigation]);
useEffect(() => {
 if(!["en", "lt", "de", "ru"].includes(i18n.language)){
  console.log(i18n.language)

    setLanguage("en")
 }else{
    console.log(i18n.language)

  setLanguage(i18n.language)
 }
  const fetchData = async () => {
    console.log(i18n.language)
    const responseTOP = await axiosInstance.get(`/posts/getAllForHome`, {
      params: {selectedLanguage2:i18n.language },
    });
      setToday(responseTOP.data.today)
      setMonth(responseTOP.data.month)
      setPopular(responseTOP.data.today)
      if(responseTOP.data.today)
        setPopular2(responseTOP.data.today.slice(0,-3))
      setSearchData(responseTOP.data.prefs)
      setBlogs(responseTOP.data.blogs)
      setTestimonials(responseTOP.data.testimonials)

      // const response = await axios.get(`api/posts/getForHomeEN`, {
      //   params: {selectedLanguage2:i18n.language },
      // });

      // setToday(response.data.today)
      // setMonth(response.data.month)
      // setPopular(response.data.today)
      // setPopular(response.data.posts)
      // setPopular2(response.data.today.slice(0,-3))
      // const response2 = await axios.get(`api/posts/searchDataEN`,{
      //   params:{
      //     selectedLanguage2:i18n.language
      //   }
      // })
      // setSearchData(response2.data.prefs)
      if(i18n.language == 'en')
          setCurrency("$")
        else if(i18n.language == 'ru')
          setCurrency("₽")
        else if(i18n.language == 'lt')
          setCurrency("€")
        else
          setCurrency("€")
          
  }
  fetchData();

}, [i18n.language]);


useEffect(() => {

  setPopular(popularBool ? month : today);

}, [popularBool]);


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setDetails((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
const isMobile = window.innerWidth <= 1000;
if(window.innerWidth <=1000 && window.innerWidth >700){
  const itemsperslide = 2
}
else{
  const itemsperslide = 1
}
console.log(isMobile)
useEffect(() => {
  const { hash } = location;
  if (hash) {
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}, [location]);
  return (

    <>

    <NavBar/>

      <div className='videodiv'>
        <video autoPlay loop muted playsinline>
          <source src={bgvideo} type="video/mp4"/>
        </video>
        <button className='message'>{t('main.message1')} <a href='https://www.forbes.com/sites/kathleenpeddicord/2021/02/05/5-best-beachfront-buys-for-2021/?sh=41c3484d3b76'>{t('main.message11')}</a></button>

        <div className="videoMessage" >
        <p className='mediumtext margin0 bold'>{t('greetingCard.title')}</p>
        <p className='bigbigtext margin0 bold'>{t('greetingCard.title2')}</p>
          <button>{t('greetingCard.button')}</button>
        </div>
        <a className='message2'>{t('main.message2')}</a>
        <div>
          <div className='SearchWrap'>
            <div className='region'>
              <label>{t('searchMenu.region')}</label>
              <select name="region" id={details.region} onChange={handleInputChange}>
              {searchData && searchData.map((data,key)=>{
                return(
                  <option value={data.location}>{data.location}</option>
                  )
                })}
              </select>
              {/* <input placeholder='Kyrentia District'></input> */}
              <img className='locationimg' src={locationimg}/>

            </div>
            <div className='type'>
            <label>{t('searchMenu.type')}</label>
            <select name="type" id={details.type} onChange={handleInputChange}>
              <option value="Villa">{t('searchMenu.villa')}</option>
              <option value="Apartament">{t('searchMenu.apartament')}</option>

            </select>
            <img className='typeimg' src={type}/>

            </div>
    
            <div className='price'>
            <label>{t('searchMenu.price')}</label>
            <select name='priceRange' value={details.priceRange} onChange={handleInputChange}>
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
            <select name="sortBy" value={details.sortBy} onChange={handleInputChange}>
            <option value="MW">{t('searchMenu.mw')}</option>
            <option value="MP">{t('searchMenu.mp')}</option>
            <option value="PH">{t('searchMenu.hl')}</option>
            <option value="PL">{t('searchMenu.lh')}</option>

            </select>

            </div>
            <div className='search'>
              <label></label>
              <button onClick={handleClick}>{t('searchMenu.button')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='popular wrap'>
        <p className='bigtext margin0'>{t('popular.title')}</p>
        <p className='smalltext margint0 smallWidth'>{t('popular.afterTitle')}</p>
        <div className='twobuttons'>
          <button onClick={() => setPopularBool(!popularBool)} className={popularBool ? 'white' : 'green'}>{t('popular.button1')}</button>
          <button onClick={() => setPopularBool(!popularBool)} className={popularBool ? 'green' : 'white'}>{t('popular.button2')}</button>
        </div>
          <div className='popWrap'>
          {popular && popular.map((data,key)=>{
            return(
              <a href={'/apartaments/property?id='+data.id}>
                <div className='popchild'>
                <img className='hoverimg' src={data.images[0]}/>
                <div className='textOnImg'>
                
                  <p><img className='pop-icon' src={bath}/>{data.bathrooms} {t('main.bathText')}</p>
                  <p><img className='pop-icon' src={sqvt}/> {data.m2}m²</p>
                  <p><img className='pop-icon' src={bed}/> {data.bedrooms} {t('main.bedText')}</p>
                </div>
                <p className='smallsmalltext upperCase margin0 gray bold'>{data.location}</p>
                <p className='margint0 bold titletext'>{data.title}</p>
                <p className='pricetext'><a>{t('more3.price')}:</a> {data.price} {currency} </p>
                </div>
              </a>
            )
          })}
          </div>
          <button onClick={handleClick} className='transparent black thickborder'>{t('popular.button3')}</button>
      </div>
      
      <div className='learn-wrap wrap'>
        <p className='bigtext'>{t('blog.title')}</p>
        <div className='learn'>
            {blogs && blogs.map((item, key) => {
            const divStyle = {
                backgroundImage: `url(${item.image})`,
            };

            if (key === 0) {
                return (
                <div className='learnChildBig' key={key} >
                  <div className='learnChildBig filter' style={divStyle}></div>
                    <p className='middle bigtext boldbold'>{item.title}</p>
                </div>
                );
            }
        })}
        <div className='learnChildSmall'>
        {blogs && blogs.map((item, key) => {
            const divStyle = {
                backgroundImage: `url(${item.image})`,
            };
            if (key > 0 && key<= 2) {
                return (
                <div key={key} className='learnChildSmall'>
                  <div className='learnChildSmall filter' style={divStyle}></div>
                    <p className='margint0 middle2 bigtext boldbold'>{item.title}</p>
                </div>
                );
            }
        })}
        </div>
       
  <div className='items'>
      
      {!isMobile && blogs && blogs.map((item, key) => {
        const divStyle = {
          backgroundImage: `url(${item.image})`,
        };
        if (key > 2) {
          return (
            <div key={key} className='item'>
              {/* <div className='itemsImage' style={divStyle} ></div> */}
              <img src={item.image} alt='blog image' />
              <div className='itemText'>
                <p className='bold'>{item.title}</p>
                <p className='itemContent'>{item.content}...</p>
              </div>
              <p>{t('main.readmore')}...</p>
            </div>
          );
        }
      })}


<Swiper 
      className="mySwiper"
      navigation={true}
      breakpoints={{
        // when window width is >= 640px
        100: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        700: {
          slidesPerView: 2,
        },
      }}
      spaceBetween={50}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >

      {isMobile && blogs.map((item, key) => {
        const divStyle = {
          backgroundImage: `url(${item.image})`,
        };
        if (key > 2) {
          return (
            <SwiperSlide>
            <div key={key} className='item'>
              {/* <div className='itemsImage' style={divStyle} ></div> */}
              <img src={item.image} alt='blog image' />
              <div className='itemText'>
                <p className='bold'>{item.title}</p>
                <p className='itemContent'>{item.content}...</p>
              </div>
              <p>{t('main.readmore')} ...</p>
            </div>
            </SwiperSlide>
          );
        }
      })}
      </Swiper>
</div>
          </div>

          </div>
          <button className='transparent black thickborder'>{t('blog.button1')}</button>

      {/* </div> */}
      <div className='blackbox'>
        <video autoPlay loop muted playsinline>
          <source src={bgvideo} type="video/mp4"/>
        </video>
        <div className='bgunset'>
            <p className=' marginb0'>{t('banner1.title')}</p>
            <p className='bigtext margint0'>{t('banner1.text')}</p>
            <button onClick={handleClick} className='transparent thickborder white-border'>{t('banner1.button1')}</button>
          </div>
        </div>
      <div id='reviews' className='testimonials wrap'>
        <p className='bigbigtext marginb0 '>{t('testimonials.title')}</p>
        <p className='smalltext bold'>{t('testimonials.text')}</p>
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
              <p className='marginb0 smalltext bold'>{item.name}</p>
              <p className='marginb0 margint0'>CLIENT</p>
              <p className='bold'>{item.text}</p>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
      </div>
      <Element  name="aboutus" className="aboutus-section">
      <div id="aboutus" className='aboutUs wrap'>
          <p className='bigtext'>{t('aboutUs.title')}</p>
          <div className='aboutUsTextWrap'>
            <p className='marginb0'>{t('aboutUs.text1')}</p>
            <p className='margint0'>{t('aboutUs.text2')}</p>
            <p>{t('aboutUs.text3')} <a>{t('aboutUs.text4')}</a></p>
          </div>
      </div>
      <div className='aboutUsCards'>
          <div><img src={card1}/><p className='bold'>{t('aboutUs.card1')}</p></div>
          <div><img src={card2}/>
          <p className='bold'> {t('aboutUs.card2')}</p></div>
          <div><img src={card3}/><p className='bold'>{t('aboutUs.card3')}</p></div>
          <div><img src={card4}/><p className='bold'>{t('aboutUs.card4')}</p></div>
      </div>
      </Element>
      <div id='contactus'></div>

        <ContactForm title="CONTACT US"/>
      <div className='wrap'>
        <p className='bigtext marginb0'>{t('latest.title')}</p>
        <p>{t('latest.text')}</p>
        <div className='newest'>
        <div className='popWrap2'>
        {popular2.map((data,key)=>{
            return(
              <a href={'/apartaments/property?id='+data.id}>

              <div className='popchild'>
                <img className="hoverimg"src={data.images[1]}/>
                <div className='textOnImg'>
                
                  <p><img className='pop-icon' src={bath}/>{data.bathrooms} Bathrooms</p>
                  <p><img className='pop-icon' src={sqvt}/> {data.m2}m²</p>
                  <p><img className='pop-icon' src={bed}/> {data.bedrooms} Bedrooms</p>
                </div>
                <p className='smallsmalltext upperCase margin0 gray bold'>{data.location}</p>
                <p className='margint0 bold titletext'>{data.title}</p>
                <p className='pricetext'><a>From:</a> {data.price}  {currency} </p>
              </div>
              </a>
            )
          })}
        </div>
        <button onClick={handleClick} className='transparent thickborder black'>{t('latest.button')}</button>
      </div>
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
      <Footer/>
    </>
  )
}

export default Home
