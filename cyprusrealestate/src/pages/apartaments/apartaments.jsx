import { useState, useEffect } from 'react'
import '../apartaments/apartaments.css'
import NavBar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import euApartaments from '../../assets/apt_en.json'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {BsDash} from 'react-icons/bs';
import {MdLocationOn,MdOutlineKeyboardArrowDown} from 'react-icons/md'
import ContactForm from '../components/contactForm/contactForm';
import RecentlyVisited from '../components/recentlyVisited/recently';
import More3 from '../components/threemore/3more';
import bgvideo from '../../assets/video2.mp4';
import Recent from '../../../recentStorage'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

function Apartaments() {

  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [objectImages, setObjectImages] = useState([]);
    const [images, setImages] = useState([]);
    const [FeaturesClicked, setFeaturesClicked] = useState(false);
    const [LocationClicked, setLocationClicked] = useState(false);
    const [recent, setRecent] = useState([]);
    const [currency, setCurrency] = useState("")
    const [selectedLanguage2, setSelectedLanguage2] = useState(localStorage.getItem('selectedLanguage') || navigator.language);

    const {t,i18n} = useTranslation();

    useEffect(()=>{
      i18n.changeLanguage(selectedLanguage2);
        localStorage.setItem('selectedLanguage', selectedLanguage2);
    },[selectedLanguage2])
    useEffect(()=>{
      const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const theid = urlParams.get('id');
        console.log(theid)
        const response = await axiosInstance.get(`/posts/getAPost`,{
          params:{
            id:theid,
            language:i18n.language
          },
        })
        setData(response.data.post[0])
        setObjectImages(response.data.images)
        if(i18n.language == 'en')
          setCurrency("$")
        else if(i18n.language == 'ru')
          setCurrency("₽")
        else if(i18n.language == 'lt')
          setCurrency("€")
        else
          setCurrency("€")
          
        console.log(response.data.images)
            }
      fetchData();
    }, [i18n.language]);
    
  

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        setId(id);
        const item = euApartaments.find(item => item.id === id);
        // setData(item);
        

      }, []);

      useEffect(() => {
       setImages(objectImages.map((url) => ({
        original: url.url,
        thumbnail: url.url,
      })));

      }, [data]);
      
      const handleClickFeatures = () => {
        if(FeaturesClicked)
          setFeaturesClicked(false)
        else
          setFeaturesClicked(true);
      };  
      const handleClickLocation = () =>{
        if(LocationClicked)
          setLocationClicked(false);
        else
          setLocationClicked(true)
        }
  return (
    <>
    <NavBar/>
    <Recent/>


    <div className='apartament-container'>
      <div className='apartament-leftBox'>
        <h2>{data.title}</h2>
        <div id="image-gallery">
        <ImageGallery items={images} />
        </div>
      </div>
      <div className='apartament-rightBox'>
        <div className='price-wrap'>
          <div><p>{currency} {data.price}</p></div>
          <div><p>{currency} {data.priceperm2} /m²</p></div>
        </div>
        <div className='location-wrap'>
          <p><MdLocationOn/></p>
          <p className='location'>{data.location}</p>
          </div>
        <div className='general-info'>
          <div>
            <p>{t('apart.area')}</p>
            <p className='m2bedroomValues'>{data.m2}m²</p>
          </div>
          <div>
            <p>{t('apart.bed')}</p>
            <p className='m2bedroomValues'>{data.bedrooms}</p>
          </div>
          <div>
            <p>{t('apart.bath')}</p>
            <p className='m2bedroomValues'>{data.bathrooms}</p>
          </div>
        </div>
        <div className='description-wrap'>
        <p>{t('apart.descTitle')}</p>
        <p className='bigText'>{data.description}</p>
        </div>
        <div className='location_features'>
          <div>
            <div className='Name'  onClick={handleClickFeatures}>
              <p>{t('apart.featTitle')}</p>
              {FeaturesClicked ? <p className='textRight'><MdOutlineKeyboardArrowDown/></p> :<p className='textRight'><BsDash/></p> }
            </div>
            <div>
              {FeaturesClicked && <p>{data.features}</p>}
            </div>
          </div>
          <div className='borderB'>
            <div className='Name' onClick={handleClickLocation}>
              <p>{t('apart.locTitle')}</p>
              
              {LocationClicked ? <p className='textRight'><MdOutlineKeyboardArrowDown/></p> :<p className='textRight'><BsDash/></p> }
            </div>
            <div>
              {LocationClicked && <p>{data.locationdescription}</p>}
            </div>
          </div>
          </div>

      </div>
      
    </div>
    <ContactForm title="Inquire about this property"/>
    <RecentlyVisited/>
    <div className='lineb'></div>
    <More3/>
    <div className='blackbox'>
    <video autoPlay loop muted playsinline>
          <source src={bgvideo} type="video/mp4"/>
        </video>
        <div className='bgunset'>
          <p >Your Cyprus</p>
          <p className='bigtext'>{t('blackbox.text')}</p>
          <button className='transparentbg  white-border'>{t('blackbox.button')}</button>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default Apartaments
