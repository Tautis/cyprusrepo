import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          blogs:{
            title:"OUR BLOGS"
          },
          main:{
            message1:"Cyprus is No. 1 in Best Beachfront Buys by Forbes",
            message11:"Read full article here",
            message2:"INSTALLMENTS UP TO 6 YEARS",
            readmore:"Read More",
            bathText:"Bathrooms",
            bedText:"Bedrooms"
          },
          apart:{
            area:"TOTAL AREA",
            bed:"BEDROOMS",
            bath:"BATHROOMS",
            descTitle:"DESCRIPTION",
            featTitle:"FEATURES",
            locTitle:"LOCATION"
          },
          blackbox:{
            text:"Start Investing in Real Estate Now & Let us Help You with anything and everything",
            button:"SEARCH"
          },
          more3:{
            title:"YOU MAY ALSO LIKE",
            price:"FROM"
          },
          recent:{
            title:"RECENTLY VISITED"
          },
          navbar:{
            home:"HOME",
            about:"ABOUT US",
            apartaments:"OUR APARTAMENTS",
            blog:"BLOG",
            contact:"CONTACT US"
          },
          greetingCard:{
            title:"SAVE 10%",
            title2:"ON SPECIAL OFFERS",
            button:"LEARN MORE"
          },
          searchMenu:{
            nor:"Number of Rooms",
            search:"Search",
            region:"Region",
            type:"Type",
            price:"Price Range",
            currency:"Currency",
            sort:"Sort By",
            mw:"Most Wanted",
            mp:"Most Popular",
            hl:"Price: High - Low",
            lh:"Price: Low - High",
            button:"SEARCH",
            button2:"RESET",
            villa:"Villa",
            apartament:"Apartament"
          },
         popular:{
          title:"POPULAR APARTAMENTS",
          afterTitle:"Check out some of the best deals for properties for SALE in North Cyprus",
          button1:"TODAY",
          button2:'THIS MONTH',
          button3:'VIEW ALL'
         },
         blog:{
          title:"LEARN MORE ABOUT CYPRUS",
          button1:"VIEW ALL",
         },
         banner1:{
          title:"Your Cyprus",
          text:"Start Searching For Awesome Properties",
          button1:"GET STARTED"
         },
         testimonials:{
          title:"TESTIMONIALS",
          text:"Get the real inside story from our customers just like you"
         },
         aboutUs:{
          title:"ABOUT US",
          text1:"Welcome to Your Cyprus Real Estate",
          text2:"We are your agency for best Real Estate in Cyprus deals & offers. We only work with projects which are newest, best in quality & price. Our team will gladly give you additional information and will arrange arrivals to see the properties you like - live",
          text3:"Have any questions? Feel free to ",
          text4:"Contact Us.",
          card1:"A beachfront home in Iskele, North Cyprus, is ranked as the world's top investment in 2021 for those looking to live or retire abroad",
          card2:"We have all the curated hotels that have all the precaution for a Covid safe environment",
          card3:"There are several special offers on completed new builds with very good financial plans.",
          card4:"Possible to visit a property live with people who work directly for the developer. Visiting the project or property, learning about the views.",

         },
         contactUs:{
          title:"CONTACT US",
          name:"Your Name",
          namePlaceholder:"Your Name",
          phone:"Your Phone",
          phonePlaceholder:"Phone",
          email:"Your Email",
          emailPlaceholder:"Email",
          topic:"Topic",
          topicPlaceholder:"Topic",
          message:"Your Message",
          messagePlaceholder:"Your Message",
          button1:"SEND EMAIL",
          title2:"OUR CONTACTS",
          title3:"OUR SOCIALS"
         },
         latest:{
          title:"LATEST PROPERTIES",
          text:"Check out some of the newest properties for SALE in North Cyprus",
          button:"VIEW ALL"
         },
         banner2:{
          title:"Your Cyprus",
          text:"Start Investing in Real Estate Now & Let us Help You with anything and everything",
          button:"SEARCH"
         },
         footer:{
          title1:"CONTACT US",
          adress:"Adress",
          title2:"QUICK LINKS",
          home:"Home",
          aboutUs:"About Us",
          apartaments:"Our Apartaments",
          reviews:"Reviews",
          blog:"Our Blog",
          title3:"INFORMATION",
          contact:"CONTACT US FORM",
          title4:"CONTACT US",
          text1:"Want to speak with our team & get the latest best deals first?",
          email:"Leave your Email here!",
          placeholder:"Email",
          button:"SEND"
         }
        }
      },
      ru: {
        translation: {
          blogs:{
            title:"НАШИ БЛОГИ"
          },
          main: {
            message1: "Кипр - лидер в списке лучших покупок на побережье от Forbes",
            message11: "Читать полную статью здесь",
            message2: "РАССРОЧКА ДО 6 ЛЕТ",
            readmore: "Читать далее",
            bathText: "Ванные комнаты",
            bedText: "Спальни"
            },
          apart:{
            area:"ОБЩАЯ ПЛОЩАДЬ",
            bed:"СПАЛЬНИ",
            bath:"ТУАЛЕТЫ",
            descTitle:"ОПИСАНИЕ",
            featTitle:"ОСОБЕННОСТИ",
            locTitle:"местоположение"
          },
          blackbox:{
            text:"Начните инвестировать в недвижимость сейчас и позвольте нам помочь вам во всем и всячески",
            button:"ПОИСК"
          },
          more3:{
            title:"ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ",
            price:"От"
          },
          recent:{
            title:"НЕДАВНО ПОСЕЩЕННЫЕ"
          },
        navbar:{
          home:"Главная",
          about:"О нас",
          apartaments:"Наши апартаменты",
          blog:"Блог",
          contact:"Контакты"
        },
        searchMenu:{
          nor:"Количество комнат",
          search:"Поиск",
          button2:"ПЕРЕЗАГРУЗИТЬ",
          region:"Регион",
          type:"Тип",
          price:"Диапазон цен",
          currency:"Валюта",
          sort:"Сортировать по",
          mw:"Наиболее востребованные",
          mp:"Самые популярные",
          hl:"Цена: высокая - низкая",
          lh:"Цена: низкая - высокая",
          button:"ПОИСК",
          villa:"Вилла",
          apartament:"Апартамент"
          },
        greetingCard:{
          title:"СОХРАНИТЬ 10%",
          title2:"О СПЕЦИАЛЬНЫХ ПРЕДЛОЖЕНИЯХ",
          button:"УЗНАТЬ БОЛЬШЕ"
        },
        popular:{
        title:"ПОПУЛЯРНЫЕ КВАРТИРЫ",
        afterTitle:"Ознакомьтесь с лучшими предложениями по недвижимости Норт Кипра, доступными для ПРОДАЖИ",
        button1:"СЕГОДНЯ",
        button2:'В ЭТОМ МЕСЯЦЕ',
        button3:'ПОСМОТРЕТЬ ВСЕ'
        },
        blog:{
        title:"УЗНАЙТЕ БОЛЬШЕ О КИПРЕ",
        button1:"ПОСМОТРЕТЬ ВСЕ",
        },
        banner1:{
        title:"Ваш Кипр",
        text:"Начните поиск потрясающей недвижимости",
        button1:"НАЧАТЬ"
        },
        testimonials:{
        title:"ОТЗЫВЫ",
        text:"Узнайте настоящую историю от наших клиентов, таких же как вы"
        },
        aboutUs:{
        title:"О НАС",
        text1:"Добро пожаловать в Your Cyprus Real Estate",
        text2:"Мы - ваше агентство для лучших предложений по недвижимости на Кипре. Мы работаем только с самыми новыми, лучшими по качеству и цене проектами. Наша команда с радостью предоставит вам дополнительную информацию и организует приезд для осмотра нравящихся вам объектов недвижимости - на месте",
        text3:"Есть вопросы? Не стесняйтесь ",
        text4:"связаться с нами.",
        card1:"Дом на первой линии в Искеле, Норт Кипр, занимает первое место в мире в 2021 году для тех, кто ищет возможность жить или уехать на пенсию за границу",
        card2:"Covid Safe - У нас есть отобранные отели, в которых предусмотрены все меры предосторожности для безопасной среды в условиях Covid",
        card3:"Есть несколько специальных предложений на завершенные новые постройки с очень хорошими финансовыми планами.",
        card4:"Осмотр и изучение объекта недвижимости на месте с сотрудниками застройщика.",
      },
      contactUs:{
       title:"СВЯЖИТЕСЬ С НАМИ",
       name:"Ваше имя",
       namePlaceholder:"Ваше имя",
       phone:"Ваш телефон",
       phonePlaceholder:"Телефон",
       email:"Ваш электронный адрес",
       emailPlaceholder:"Email",
       topic:"Тема",
       topicPlaceholder:"Тема",
       message:"Ваше сообщение",
       messagePlaceholder:"Ваше сообщение",
       button1:"ОТПРАВИТЬ ПИСЬМО",
       title2:"НАШИ КОНТАКТЫ",
       title3:"НАШИ СОЦСЕТИ"
      },
      latest:{
       title:"ПОСЛЕДНИЕ ОБЪЕКТЫ",
       text:"Ознакомьтесь с последними предложениями по недвижимости Норт Кипра, доступными для ПРОДАЖИ",
       button:"ПОСМОТРЕТЬ ВСЕ"
      },
      banner2:{
       title:"Ваш Кипр",
       text:"Начните инвестировать в недвижимость прямо сейчас, и позвольте нам помочь вам во всем",
       button:"ПОИСК"
      },
      footer:{
       title1:"СВЯЖИТЕСЬ С НАМИ",
       adress:"Адрес",
       title2:"БЫСТРЫЕ ССЫЛКИ",
       home:"Главная",
       aboutUs:"О нас",
       apartaments:"Наши квартиры",
       reviews:"Отзывы",
       blog:"Наш блог",
       title3:"ИНФОРМАЦИЯ",
       contact:"ФОРМА СВЯЗИ",
       title4:"СВЯЖИТЕСЬ С НАМИ",
       text1:"Хотите поговорить с нашей командой и первыми узнавать о лучших предложениях?",
       email:"Оставьте ваш электронный адрес здесь!",
       placeholder:"Email",
       button:"ОТПРАВИТЬ"
      }
     }
   },
      lt: {
        translation: {
          blogs:{
            title:"MŪSŲ BLOGAI"
          },
          main: {
            message1: "Kipras yra Nr. 1 geriausių paplūdimio pirkimų pagal Forbes",
            message11: "Skaityti visą straipsnį čia",
            message2: "ĮMOKOS IKI 6 METŲ",
            readmore: "Skaityti daugiau",
            bathText: "Vonios",
            bedText: "Miegamieji"
            },
          apart:{
            area:"PLOTAS",
            bed:"MIEGAMIEJI",
            bath:"VONIOS",
            descTitle:"APRAŠYMAS",
            featTitle:"YPATYBĖS",
            locTitle:"VIETA"
          },
          blackbox:{
            text:"Pradėkite investuoti į nekilnojamąjį turtą dabar ir leiskite mums padėti jums su viskuo, ką tik reikia",
            button:"IEŠKOTI"
          },
          more3:{
            title:"JUMS TAIP PAT GALI PATIKTI",
            price:"Nuo"
          },
          recent:{
            title:"NESENIAI APLANKYTOS"
          },
          navbar:{
            home:"PRADŽIA",
            about:"APIE MUS",
            apartaments:"MŪSŲ APARTAMENTAI",
            blog:"STRAIPSNIAI",
            contact:"KONTAKTAI"
          },
          searchMenu:{
            nor:"Kambarių skaičius",
            search:"Paieška",
            button2:"ATITAISYTI",
            region:"Regionas",
            type:"Tipas",
            price:"Kainų intervalas",
            currency:"Valiuta",
            sort:"Rūšiuoti pagal",
            mw:"Labiausiai pageidaujamos",
            mp:"Labiausiai populiarūs",
            hl:"Kaina: Aukščiausia - žemiausia",
            lh:"Kaina: Žemiausia - aukščiausia",
            button:"IEŠKOTI",
            villa:"Vila",
            apartament:"Apartamentas"
            },
          greetingCard:{
            title:"SUTAUPYK 10%",
            title2:"SPECIALIEMS PASIŪLYMAMS",
            button:"SUŽINOKITE DAUGIAU"
          },
         popular:{
          title:"POPULIARIAUSI BUTAI",
          afterTitle:"Peržiūrėkite kai kuriuos geriausius nekilnojamojo turto, parduodamo Šiaurės Kipre, pasiūlymus",
          button1:"ŠIANDIEN",
          button2:'ŠĮ MĖNESĮ',
          button3:'VISI'
         },
         blog:{
          title:"SUŽINOKITE DAUGIAU APIE KIPRĄ",
          button1:"VISI",
         },
         banner1:{
          title:"Jūsų Kipras",
          text:"Pradėkite ieškoti nuostabių nuosavybių",
          button1:"PRADĖKITE"
         },
         testimonials:{
          title:"ATSILIEPIMAI",
          text:"Gaukite tikrą istoriją iš mūsų klientų, tokių kaip jūs"
         },
         aboutUs:{
          title:"APIE MUS",
          text1:"Sveiki atvykę į jūsų nekilnojamąjį turtą Kipre",
          text2:"Esame jūsų agentūra, kuri siūlo geriausius nekilnojamojo turto Kipre pasiūlymus. Dirbame tik su naujausiais, geriausios kokybės ir kainos projektais. Mūsų komanda mielai suteiks papildomos informacijos ir suorganizuos atvykimą, kad pamatytumėte jums patikusius objektus – gyvai",
          text3:"Turite klausimų? Nedvejodami ",
          text4:"Susisiekite su mumis.",
          card1:"Namas prie jūros Iskelėje, Šiaurės Kipre, yra vertinamas kaip didžiausia investicija 2021 m., skirta tiems, kurie nori gyventi ar išeiti į pensiją užsienyje.",
          card2:"„Covid Safe“ – turime visus kuruojamus viešbučius, kuriuose taikomos visos atsargumo priemonės saugiai „Covid“ aplinkai užtikrinti",
          card3:"Yra keletas specialių pasiūlymų baigtiems naujiems pastatams su labai gerais finansiniais planais.",
          card4:"Galima aplankyti nuosavybę gyvai su žmonėmis, kurie dirba tiesiogiai kūrėjui. Apsilankymas projekte ar objekte, pažinimas su vaizdais.",

         },
         contactUs:{
          title:"SUSISIEKITE SU MUMIS",
          name:"Jūsų vardas",
          namePlaceholder:"Jūsų vardas",
          phone:"Jūsų Telefonas",
          phonePlaceholder:"Telefonas",
          email:"Jūsų el. paštas",
          emailPlaceholder:"El. paštas",
          topic:"Tema",
          topicPlaceholder:"Tema",
          message:"Jūsų žinutė",
          messagePlaceholder:"Jūsų žinutė",
          button1:"SIŲSTI LAIŠKĄ",
          title2:"MŪSŲ KONTAKTAI",
          title3:"MŪSŲ SOCIALS"
         },
         latest:{
          title:"NAUJAUSIOS NUOSAVYBĖS",
          text:"Peržiūrėkite keletą naujausių parduodamų nekilnojamojo turto Šiaurės Kipre",
          button:"VISI"
         },
         banner2:{
          title:"Jūsų Kipras",
          text:"Pradėkite investuoti į nekilnojamąjį turtą dabar ir leiskite mums padėti viskuo ir viskuo",
          button:"PAIEŠKA"
         },
         footer:{
          title1:"SUSISIEKITE",
          adress:"Adresas",
          title2:"GREITOS NUORODOS",
          home:"Į pradžią",
          aboutUs:"Apie mus",
          apartaments:"Mūsų apartamentai",
          reviews:"Atsiliepimai",
          blog:"Mūsų tinklaraštis",
          title3:"INFORMACIJA",
          contact:"SUSISIEKITE MUMIS FORMA",
          title4:"SUSISIEKITE MUMIS",
          text1:"Norite pasikalbėti su mūsų komanda ir pirmiausia gauti naujausius geriausius pasiūlymus?",
          email:"Palikite savo el. paštą čia!",
          placeholder:"El. paštas",
          button:"SIŲSTI"
         }
        }
      },
      de: {
        translation: {
          blogs:{
            title:"UNSERE BLOGS"
          },
          main: {
            message1: "Zypern ist Nr. 1 in den besten Strandkäufen nach Forbes",
            message11: "Hier den vollständigen Artikel lesen",
            message2: "RATENZAHLUNGEN BIS ZU 6 JAHRE",
            readmore: "Mehr lesen",
            bathText: "Badezimmer",
            bedText: "Schlafzimmer"
            },
          apart:{
            area:"GESAMTFLÄCHE",
            bed:"SCHLAFZIMMER",
            bath:"BADEZIMMER",
            descTitle:"BESCHREIBUNG",
            featTitle:"MERKMALE",
            locTitle:"LAGE"
          },
          blackbox:{
            text:"Starten Sie jetzt mit Investitionen in Immobilien und lassen Sie uns Ihnen bei allem und jedem helfen",
            button:"SUCHE"
          },
          more3:{
            title:"DIR KÖNNTE AUCH GEFALLEN",
            price:"Aus"
          },
          recent:{
            title:"ZULETZT BESUCHT"
          },
          navbar:{
            home:"Startseite",
            about:"Über Uns",
            apartaments:"Unsere Apartments",
            blog:"Blog",
            contact:"Kontakt"
          },
          greetingCard:{
            title:"SPAREN 10%",
            title2:"AUF SONDERANGEBOTE",
            button:"LERN MEHR"
          },
          searchMenu:{
            nor:"Anzahl der Räume",
            search:"Suchen",
            button2:"RÜCKSETZEN",
            region:"Region",
            type:"Typ",
            price:"Preisspanne",
            currency:"Währung",
            sort:"Sortieren nach",
            mw:"Am meisten gesucht",
            mp:"Am beliebtesten",
            hl:"Preis: Hoch - Niedrig",
            lh:"Preis: Niedrig - Hoch",
            button:"SUCHE",
            villa:"Villa",
            apartament:"Apartment"
            },
        popular:{
        title:"BELIEBTE WOHNUNGEN",
        afterTitle:"Entdecken Sie einige der besten Angebote für Immobilien zum Verkauf in Nordzypern",
        button1:"HEUTE",
        button2:'IN DIESEM MONAT',
        button3:'ALLE ANZEIGEN'
        },
        blog:{
        title:"ERFAHREN SIE MEHR ÜBER ZYPERN",
        button1:"ALLE ANZEIGEN",
        },
        banner1:{
        title:"Ihr Zypern",
        text:"Beginnen Sie mit der Suche nach großartigen Immobilien",
        button1:"LOS GEHT'S"
        },
        testimonials:{
        title:"KUNDENMEINUNGEN",
        text:"Holen Sie sich die echte Insider-Geschichte von Kunden wie Ihnen"
        },
        aboutUs:{
        title:"ÜBER UNS",
        text1:"Willkommen bei Ihrer Zypern Immobilienagentur",
        text2:"Wir sind Ihre Agentur für die besten Angebote und Offerten für Immobilien auf Zypern. Wir arbeiten nur mit den neuesten Projekten von höchster Qualität und zu besten Preisen zusammen. Unser Team gibt Ihnen gerne weitere Informationen und arrangiert Besichtigungen vor Ort für die Immobilien, die Ihnen gefallen.",
        text3:"Haben Sie Fragen? Zögern Sie nicht,",
        text4:"kontaktieren Sie uns.",
        card1:"Ein Strandhaus in Iskele, Nordzypern, wurde 2021 als weltweit beste Investition für diejenigen eingestuft, die im Ausland leben oder sich zur Ruhe setzen möchten",
        card2:"Covid-Sicherheit - Wir haben eine Auswahl an Hotels, die alle Vorsichtsmaßnahmen für eine sichere Umgebung in Bezug auf Covid treffen",
        card3:"Es gibt mehrere Sonderangebote für fertiggestellte Neubauten mit sehr guten Finanzierungsplänen.",
        card4:"Möglichkeit zur persönlichen Besichtigung einer Immobilie mit Entwicklermitarbeitern. Informationen über das Projekt und die Aussicht.",
        },
        contactUs:{
        title:"KONTAKTIEREN SIE UNS",
        name:"Ihr Name",
        namePlaceholder:"Ihr Name",
        phone:"Ihre Telefonnummer",
        phonePlaceholder:"Telefonnummer",
        email:"Ihre E-Mail",
        emailPlaceholder:"Email",
        topic:"Betreff",
        topicPlaceholder:"Betreff",
        message:"Ihre Nachricht",
        messagePlaceholder:"Ihre Nachricht",
        button1:"E-MAIL SENDEN",
        title2:"UNSERE KONTAKTDATEN",
        title3:"UNSERE SOCIAL-MEDIA-KANÄLE"
        },
        latest:{
        title:"NEUESTE IMMOBILIEN",
        text:"Entdecken Sie die neuesten Immobilienangebote zum Verkauf in Nordzypern",
        button:"ALLE ANZEIGEN"
        },
        banner2:{
        title:"Ihr Zypern",
        text:"Beginnen Sie jetzt mit der Investition in Immobilien und lassen Sie uns Ihnen in allem helfen",
        button:"SUCHE"
        },
        footer:{
        title1:"KONTAKTIEREN SIE UNS",
        adress:"Adresse",
        title2:"SCHNELLE LINKS",
        home:"Startseite",
        aboutUs:"Über Uns",
        apartaments:"Unsere Apartments",
        reviews:"Bewertungen",
        blog:"Unser Blog",
        title3:"INFORMATIONEN",
        contact:"KONTAKTIEREN SIE UNS FORMULAR",
        title4:"KONTAKTIEREN SIE UNS",
        text1:"Möchten Sie mit unserem Team sprechen und als Erstes die besten Angebote erhalten?",
        email:"Hinterlassen Sie hier Ihre E-Mail-Adresse!",
        placeholder:"Email",
        button:"SENDEN"
        }
        }
        },
    }
  });

export default i18n;