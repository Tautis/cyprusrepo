import { useState,useEffect } from 'react'
import '../footer/footer.css'
import logo from '../../../assets/mainlogo.svg'
import logoW from '../../../assets/logo_W_NoText.svg'
import {AiFillFacebook,AiOutlineInstagram} from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useLocation, Link  } from 'react-router-dom';

function Footer() {
  const {t,i18n} = useTranslation();
  useEffect(()=>{
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  },[])
  const lng = navigator.language;
  return (
    <div className='footer'>
      <div className='footer-wrap'>
      <div>
        <h3>{t('footer.title1')}</h3>
        <p>yourcyprusrealestate@protonmail.com</p>
        <p>yourcyprusrealestate@info.com</p>
        <p>000000000</p>
        <p>000000000</p>
        <p>{t('footer.adress')}</p>
      </div>
      <div>
        <h3>{t('footer.title2')}</h3>
        <p><Link to="/"
            >{t('footer.home')}</Link></p>
        <p><Link to="/#aboutus"
            >{t('footer.aboutUs')}</Link></p>
        <p><Link to="/apartaments"
            >{t('footer.apartaments')}</Link></p>
        <p><Link to="/#reviews"
            >{t('footer.reviews')}</Link></p>
        <p><Link to="/blogs"
            >{t('footer.blog')}</Link></p>
      </div>
      <div className='text_center'>
        <h3 className='fitcontent'>{t('footer.title3')}</h3>
        <p><Link to="/#contactus"
            >{t('footer.contact')}</Link></p>
        <img src={logoW}/>
      </div>
      <div>
        <h3>{t('footer.title4')}</h3>
        <p>{t('footer.text1')}</p>
        <p>{t('footer.email')}</p>
        <div className='footerEmail'>
          <input placeholder={t('footer.placeholder')}></input>
          <button>{t('footer.button')}</button>
        </div>
        <div className='Footersocials'>
          <Link to="https://www.instagram.com/yourcyprusrealestate/"><AiFillFacebook size={40}/></Link>
          <Link to="https://www.instagram.com/yourcyprusrealestate/"><AiOutlineInstagram size={40}/></Link>
        </div>
      </div>
    </div>
    <p className='footerText'>Copyright @ 2023<span className='greenT'>YourCyprus.</span>All rights reserved</p>
    </div>
  )
}

export default Footer
