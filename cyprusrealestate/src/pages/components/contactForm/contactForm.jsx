import { useState, useEffect, useContext } from 'react'
import '../../apartaments/apartaments.css'
import './contactForm.css'

import { useSearchParams } from "react-router-dom";
import {MdEmail} from 'react-icons/md';
import {FaPhoneSquare} from 'react-icons/fa';
import {AiFillFacebook,AiOutlineInstagram} from 'react-icons/ai';
import logo from '../../../assets/mainlogo.svg'
import logowhite from '../../../assets/logo_white.svg'

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {BsDash} from 'react-icons/bs';
import {MdLocationOn} from 'react-icons/md'
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/themeContext';
function ContactForm({title}) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const {t,i18n} = useTranslation();
  useEffect(()=>{
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  },[])
  const lng = navigator.language;
  return (
    <>
    <div className='ContactUs wrap'>
          <p className='bigtext'>{t('contactUs.title')}</p>
          <div className='ContactUsWrap'>
            <div className='form'>
              <div>
                <label>{t('contactUs.name')}</label>
                <input style={{width: '90%'}} placeholder={t('contactUs.namePlaceholder')}></input>
              </div>
              <div>
                <label>{t('contactUs.phone')}</label>
                <input placeholder={t('contactUs.phonePlaceholder')}></input>
              </div>
              <div>
                <label>{t('contactUs.email')}</label>
                <input style={{width: '90%'}} placeholder={t('contactUs.emailPlaceholder')}></input>
              </div>
              <div>
                <label className='bold'>{t('contactUs.topic')}</label>
                <input placeholder={t('contactUs.topicPlaceholder')}></input>
              </div>
              <div className='textarea  '>
                <label className='bold'>{t('contactUs.message')}</label>
                <textarea placeholder={t('contactUs.messagePlaceholder')}></textarea>
              </div>
              <button className='green'>{t('contactUs.button1')}</button>
            </div>
            <div className='contacts'>
              <h5 className=' mobilecenter'>{t('contactUs.title2')}</h5>
              <p className='smallsmalltext'><MdEmail style={{ verticalAlign: 'middle',paddingRight:"20px" }}  size={20}/>yourcyprusrealestate@protonmail.com</p>
              <p className='smallsmalltext mobilepadding'>yourcyprusrealestate@info.com</p>
              <p className='smallsmalltext'><FaPhoneSquare style={{ verticalAlign: 'middle',paddingRight:"20px" }}  size={20}/>000000000</p>
              <p className='smallsmalltext mobilepadding'>000000000</p>
              <div className='socials'>
                <p className='smaltext'>{t('contactUs.title3')}</p>
                <div>
                  <AiFillFacebook size={40}/>
                  <AiOutlineInstagram size={40}/>
                </div>
              </div>
              <img src={theme ? logowhite: logo} />
            </div>
            <div>
            </div>
          </div>
      </div>
    </>
  )
}

export default ContactForm
