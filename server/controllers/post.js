import e from 'express';
import {db} from '../db.js'
import CC from 'currency-converter-lt'
//ENGLISH POSTS

export const getAllPostsEN = (req, res) => {
  const q1 = 'SELECT * FROM post_en';
  const q2 = 'SELECT * FROM post_images';
  
  db.query(q1, (err1, data1) => {
    if (err1) return res.json(err1);

    db.query(q2, (err2, data2) => {
      if (err2) return res.json(err2);

      res.json({
        postsEN: data1,
        images: data2
      });
    });
  });
};

export const file = (req,res) =>{
  const file = req.body.file;
}

//RUSSIAN POSTS
export const getAllPostsRU = (req,res) =>{
  const q1 = 'SELECT * FROM post_ru';
  const q2 = 'SELECT * FROM post_images';
  db.query(q1,(err1,data1) =>{
    if (err1) return res.json(err1);
    res.json({postsRU:data})
    db.query(q2,(err2,data2)=>{
      if (err2) return res.json(err2);
      res.json({images:data2});
    })
  })
}

export const addPost = (req,res) =>{
    res.json("from controller")
}
export const findOne = (req,res) =>{
  const id = req.query.id;
  console.log(id)
  const q = `SELECT * FROM ( SELECT *, 'table1' AS source FROM post_ru WHERE id = ? UNION ALL SELECT *, 'table2' AS source FROM post_lt WHERE id = ? UNION ALL SELECT *, 'table3' AS source FROM post_en WHERE id = ? UNION ALL SELECT *, 'table4' AS source FROM post_de WHERE id = ? ) AS combined_tables;`
  db.query(q,[id,id,id,id],(err,data)=>{
    if (err) return res.json(err);
    const q2 = 'SELECT * FROM post_images WHERE post_id = ?';
    db.query(q2,[id],(err2,data2)=>{
      if (err2) return res.json(err2);


      const modifiedData = data.map((row, index) => ({
        ...row,
        language: getLanguageByIndex(index),
      }));

      
      console.log(data)
      res.json({data:modifiedData,images:data2})
    })
    
  })
}
const getLanguageByIndex = (index) => {
  switch (index) {
    case 0:
      return 'ru';
    case 1:
      return 'lt';
    case 2:
      return 'en';
    case 3:
      return 'de';
    default:
      return 'unknown';
  }
};


function generateUniqueID() {
  const id = `ID${Math.floor(Math.random() * 10000)}`;
  const query = `SELECT id FROM post_en WHERE id = '${id}'`;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      if (results.length === 0) {
        resolve(id);
      } else {
        generateUniqueID()
          .then(resolve)
          .catch(reject);
      }
    });
  });
}

export const newAdvert = (req, res) => {
  const q1 = 'INSERT INTO post_en (id, title, price, priceperm2, m2, bedrooms, bathrooms, description, location, locationdescription, features, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const q2 = 'INSERT INTO post_ru (id, title, price, priceperm2, m2, bedrooms, bathrooms, description, location, locationdescription, features, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const q3 = 'INSERT INTO post_lt (id, title, price, priceperm2, m2, bedrooms, bathrooms, description, location, locationdescription, features, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const q4 = 'INSERT INTO post_de (id, title, price, priceperm2, m2, bedrooms, bathrooms, description, location, locationdescription, features, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const q5 = 'INSERT INTO post_images(post_id, url) VALUES(?,?)';
  const en = req.body.enText;
  const ru = req.body.ruText;
  const lt = req.body.ltText;
  const de = req.body.deText;
  const images = req.body.images;
  let id = en.id;

  // Check if id is empty
  if (id == "") {
    console.log("empty");
    generateUniqueID()
      .then((generatedid) => {
        console.log(generatedid);
        // Set new id here
        id = generatedid;
        continueWithInserts(id);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    continueWithInserts(id);
  }

  function continueWithInserts(id) {
    const enParams = [
      id, en.title, en.price, en.pricePerSquareMeter, en.squareMeter, en.bedrooms, en.bathrooms, en.description, en.location, en.locationDescription, en.features, en.type
    ];

    const ruParams = [
      id, ru.title, en.price, en.pricePerSquareMeter, en.squareMeter, en.bedrooms, en.bathrooms, ru.description, ru.location, ru.locationDescription, ru.features, en.type
    ];

    const ltParams = [
      id, lt.title, en.price, en.pricePerSquareMeter, en.squareMeter, en.bedrooms, en.bathrooms, lt.description, lt.location, lt.locationDescription, lt.features, en.type
    ];

    const deParams = [
      id, de.title, en.price, en.pricePerSquareMeter, en.squareMeter, en.bedrooms, en.bathrooms, de.description, de.location, de.locationDescription, de.features, en.type
    ];

    db.query(q1, enParams, (err1, data1) => {
      if (err1) {
        if (err1.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Input already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
      }
      db.query(q2, ruParams, (err2, data2) => {
        if (err2) return res.json(err2);
        db.query(q3, ltParams, (err3, data3) => {
          if (err3) return res.json(err3);
          db.query(q4, deParams, (err4, data4) => {
            if (err4) return res.json(err4);
            res.json("NEW ADVERT ADDED!");
          });
          images.forEach((image) => {
            db.query(q5, [id, image], (err5, data5) => {
              if (err5) {
                console.error(`Error inserting URL ${image}:`, err5);
              } else {
                console.log(`URL ${image} inserted successfully.`);
              }
            });
          });
        });
      });
    });
  }
};

  export const getForHomeEN = (req, res) => {
    const selectedLanguage2 = req.query.selectedLanguage2;

    const q = `SELECT p.*, (
      SELECT GROUP_CONCAT(pi.url SEPARATOR ', ')
      FROM post_images pi
      WHERE pi.post_id = p.id
      ) AS images
      FROM post_${selectedLanguage2} p
      LIMIT 6`;
      
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      
      const postsToday = data.map(post => {
        let parsedImages = [];
        if (post.images) {
          parsedImages = post.images.split(', ');
        }
        return { ...post, images: parsedImages };
        });
        const q2 = `SELECT p.*, (
          SELECT GROUP_CONCAT(pi.url SEPARATOR ', ')
          FROM post_images pi
          WHERE pi.post_id = p.id
          ) AS images
          FROM post_${selectedLanguage2} p
          ORDER BY p.id DESC
          LIMIT 6`;


    db.query(q2, (err2, data2) => {
      if (err2) return res.json(err2);
      const postsMonth = data2.map(post => {
        let parsedImages = [];
        if (post.images) {
          parsedImages = post.images.split(', ');
        }
        return { ...post, images: parsedImages };
        });
      res.json({ today: postsToday,month:postsMonth });

    })
    });
    

  };
  
  export const getForHomeRU = (req,res) =>{
   const q = 'SELECT * FROM post_ru LIMIT 6'
    db.query(q,(err,data)=>{
      if (err) return res.json(err);
      res.json({posts:data})
  })
  }


  export const searchDataEN = (req,res) =>{
    const language = req.query.selectedLanguage2
    const q = `SELECT DISTINCT location from post_${language}`
    db.query(q,(err,data)=>{
      if (err) return res.json(err);
      res.json({prefs:data})

    }) 


  }

  export const searchDataRU = (req,res) =>{
    const q = 'SELECT DISTINCT location from post_ru'
    db.query(q,(err,data)=>{
      if (err) return res.json(err);
      res.json({prefs:data})
    }) 
  }
  export const getPosts = (req,res) =>{
    const { region, type, noRooms, keyword, priceRange, currency, sortBy } = req.query.details;
    const selectedLanguage2 = req.query.selectedLanguage2;
    const allEmpty = Object.values(req.query.details).every(value => !value);
    if (allEmpty) {
      const countQ = `SELECT COUNT(*) AS entry_count FROM post_${selectedLanguage2};`;
      let from;
      let too;
      db.query(countQ,(err,data)=>{
        if (err) return res.json(err);
        const count = data[0].entry_count;

        const pages = Math.ceil(count/12);
        const currentPage = req.query.currentPage;
        const nr = 13;
          let offset;
          if(currentPage == 1){
            offset = 0
          }else{
            offset = currentPage * 12;
          }
        
        const postQuery = `SELECT * FROM post_${selectedLanguage2} LIMIT 12 OFFSET ?;`
        db.query(postQuery,[offset],(err2,data2)=>{
          if (err2) return res.json(err2);
          const convertedData = [];
          const priceQ = 'SELECT * FROM rates;'

          db.query(priceQ,(rateError,rateData)=>{
            if(rateError){
              return res.json(rateError);
            }
          for (const post of data2) {
            let amount = post.price;
            const numberWithNoComma = Number(amount.toString().replace(/,/g, ""));
            let thePrice;
              thePrice = Math.floor(numberWithNoComma * rateData[0].USD);
          if (typeof thePrice !== "undefined"){

              thePrice = thePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                const convertedPost = { ...post, price: thePrice };
              convertedData.push(convertedPost);
          }
            console.log('theEnd')
          }
          let completedQueries = 0;  
          convertedData.forEach((post, index) => {
            const q2 = 'SELECT url FROM post_images WHERE post_id = ?';
            db.query(q2, post.id, (err3, data3) => {
              if (err3) {
                return res.json(err3);
              }
      
              convertedData[index] = { ...post, images: data3 };
              completedQueries++;          
        });
      });

      const q = `SELECT * FROM testimonials_${selectedLanguage2}`
      db.query(q,(err,testimonial_data)=>{
        if (err) {
          return res.json(err);
        }
        if (completedQueries === convertedData.length) {

          res.json({ posts: convertedData, pages:pages, count:count,testimonials:testimonial_data,test:convertedData});
        }
      })
        })
      })
    })

//IF THERE IS NO SEARCH PARAMETERS
    } else {
//IF THERE ARE SEARCH PARAMETERS
let firstValue;
let secondValue;
let valueArray;
if (req.query.details.priceRange === "") {
  firstValue = 0;
  secondValue = 1000000;
} else {
  valueArray = req.query.details.priceRange.split(" ");
  firstValue = parseInt(valueArray[0]);
  secondValue = parseInt(valueArray[1]);
}
// PRICERANGE

// KEYWORDS
// const keyword = "keyword1 keyword2 keyword3"; // Replace with the actual keyword value
const keywordArray = keyword.split(' ');
const keywordConditions = keywordArray.map(keyword => `(CONCAT(COALESCE(' ', id,''), ' ', COALESCE(title,''), ' ', COALESCE(price,''), ' ', COALESCE(priceperm2,''), ' ', COALESCE(m2,''), ' ', COALESCE(bedrooms,''), ' ', COALESCE(bathrooms,''), ' ', COALESCE(description,''), ' ', COALESCE(location,''), ' ', COALESCE(locationdescription,''), ' ', COALESCE(features,'')) LIKE '%${keyword}%')`).join(' OR ');
const countQ = `SELECT COUNT(*) AS entry_count FROM post_${selectedLanguage2} WHERE location ${region === '' ? '= location' : `= '${region}'`} AND bedrooms ${noRooms === '' ? '= bedrooms' : `= '${noRooms}'`} AND type ${type === '' ? '= type' : `= '${type}'`} AND CAST(REPLACE(REPLACE(price, '£', ''), ',', '') AS DECIMAL(10,2)) BETWEEN ${firstValue} AND ${secondValue} AND ${keywordConditions};`;

const queryParams = [region, noRooms, type, firstValue, secondValue];

console.log(countQ)
// db.query(region === '' ? countQ.replace('location = ?', 'location = bedrooms') : countQ, region === '' ? [noRooms] : [region, noRooms], (err4, data4) => {
db.query(countQ, (err4, data4) => {
  if (err4) return res.json(err4);
        let from;
        let too;
        const count = data4[0].entry_count;
        console.log("count= " + count)
        const pages = Math.ceil(count/12);
        console.log("pages= " + pages)

        const currentPage = req.query.currentPage;
        let offset;
        if(currentPage == 1){
          offset = 0
        }else{
          offset = (currentPage-1) * 12;
        }
        console.log("ISEJO")

        console.log(offset)
        console.log(currentPage)
        const countQ2 = `SELECT * FROM post_${selectedLanguage2} WHERE location ${region === '' ? '= location' : `= '${region}'`} AND bedrooms ${noRooms === '' ? '= bedrooms' : `= ${noRooms}`} AND type ${type === '' ? '= type' : `= '${type}'`} AND CAST(REPLACE(REPLACE(price, '£', ''), ',', '') AS DECIMAL(10,2)) BETWEEN ${firstValue} AND ${secondValue} AND ${keywordConditions} LIMIT 12 OFFSET ${offset};`;
        console.log(countQ2)
          
          db.query(countQ2, (err6, data6) => {
            if (err6) return res.json(err6);

            let completedQueries = 0;
            const convertedData = [];
            const priceQ = 'SELECT * FROM rates;'
  
            db.query(priceQ,(rateError,rateData)=>{
              if(rateError){
                console.log(rateError)
                return res.json(rateError);
              }
              console.log("RATES GOOD")
            for (const post of data6) {
              // console.log("thePrice")
              console.log("KIEK KARTU");
              // console.log(post)
              let amount = post.price;
              const numberWithNoComma = Number(amount.toString().replace(/,/g, ""));
              // console.log(numberWithNoComma);
              let thePrice;
              // const priceQ = 'SELECT * FROM rates;'
              // db.query(priceQ,(rateError,rateData)=>{
              //   if(rateError) return res.json(rateError);
              console.log("CURRENCY = " + currency)
                if(currency == 'USD'){
                  thePrice = Math.floor(numberWithNoComma * rateData[0].USD);
                
                }
                if(currency == 'RUB')
              {
                    thePrice = Math.floor(numberWithNoComma * rateData[0].RUB);
              }
              if(currency == 'EUR')
                {
                    thePrice = Math.floor(numberWithNoComma * rateData[0].EUR);

                }
            if (typeof thePrice !== "undefined"){
                thePrice = thePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const convertedPost = { ...post, price: thePrice };
                convertedData.push(convertedPost);
            // console.log(convertedData)
            // console.log(convertedData)
  
            }
              // })
              console.log('theEnd')
            }
            if(!Array.isArray(convertedData) || convertedData.length !== 0){
              console.log(convertedData)
            convertedData.forEach((post, index) => {
              const q2 = 'SELECT url FROM post_images WHERE post_id = ?';
              db.query(q2, post.id, (err9, data9) => {
                if (err9) {
                  console.error(err9);
                  return res.json(err9);
                }
        
                convertedData[index] = { ...post, images: data9 };
                completedQueries++;
        
                // Check if all image queries are completed
                if (completedQueries === convertedData.length) {
                  const q = `SELECT * FROM testimonials_${selectedLanguage2}`
                  db.query(q,(err,testimonial_data)=>{
                    if (err) {
                      return res.json(err);
                    }
                    res.json({ posts: convertedData, pages:pages,count:count,testimonials:testimonial_data });
                  })
                  
                
                }
              });
          })
        }else{
          if (completedQueries === convertedData.length) {
            const q = `SELECT * FROM testimonials_${selectedLanguage2}`
            db.query(q,(err,testimonial_data)=>{
              if (err) {
                return res.json(err);
              }
              res.json({ posts: data6, pages:0,count:count,testimonials:testimonial_data });
            })
            
          
          }
        }
        })
        })
      }
    )}
  }


  export const updatePost = (req,res)=>{
    const post = req.body.searchItem;
    const titleRU = post[0].title;
    const titleLT = post[1].title;
    const titleEN = post[2].title;
    const titleDE = post[3].title;
    
    const priceRU = post[0].price;
    const priceLT = post[1].price;
    const priceEN = post[2].price;
    const priceDE = post[3].price;
    
    const priceperm2RU = post[0].priceperm2;
    const priceperm2LT = post[1].priceperm2;
    const priceperm2EN = post[2].priceperm2;
    const priceperm2DE = post[3].priceperm2;
    
    const m2RU = post[0].m2;
    const m2LT = post[1].m2;
    const m2EN = post[2].m2;
    const m2DE = post[3].m2;
    
    const idRU = post[0].id;
    const idLT = post[1].id;
    const idEN = post[2].id;
    const idDE = post[3].id;

    const bedroomsRU = post[0].bedrooms;
    const bedroomsLT = post[1].bedrooms;
    const bedroomsEN = post[2].bedrooms;
    const bedroomsDE = post[3].bedrooms;

    const bathroomsRU = post[0].bathrooms;
    const bathroomsLT = post[1].bathrooms;
    const bathroomsEN = post[2].bathrooms;
    const bathroomsDE = post[3].bathrooms;

    const descriptionRU = post[0].description;
    const descriptionLT = post[1].description;
    const descriptionEN = post[2].description;
    const descriptionDE = post[3].description;


    const locationRU = post[0].location;
    const locationLT = post[1].location;
    const locationEN = post[2].location;
    const locationDE = post[3].location;

    const locationdescriptionRU = post[0].locationdescription;
    const locationdescriptionLT = post[1].locationdescription;
    const locationdescriptionEN = post[2].locationdescription;
    const locationdescriptionDE = post[3].locationdescription;


    const featuresRU = post[0].features;
    const featuresLT = post[1].features;
    const featuresEN = post[2].features;
    const featuresDE = post[3].features;

    const images = req.body.editPostImages;
    console.log(images)
    console.log(images[0].url)
    const newid = post[0].id;
    console.log(newid)
    const oldid = req.body.search;
    const q = `UPDATE post_ru JOIN post_lt ON post_ru.id = post_lt.id JOIN post_en ON post_ru.id = post_en.id JOIN post_de ON post_ru.id = post_de.id 
    SET post_ru.title = ?,post_ru.price = ?, post_ru.priceperm2 = ?, post_ru.m2 = ?, post_ru.id = ?,post_ru.bedrooms = ?, post_ru.bathrooms = ?, post_ru.description = ?, post_ru.location = ?, post_ru.locationdescription = ?, post_ru.features = ?,
    post_lt.title = ?,post_lt.price = ?, post_lt.priceperm2 = ?, post_lt.m2 = ?, post_lt.id = ?,post_lt.bedrooms = ?, post_lt.bathrooms = ?, post_lt.description = ?, post_lt.location = ?, post_lt.locationdescription = ?, post_lt.features = ?,
    post_en.title = ?,post_en.price = ?, post_en.priceperm2 = ?, post_en.m2 = ?, post_en.id = ?,post_en.bedrooms = ?, post_en.bathrooms = ?, post_en.description = ?, post_en.location = ?, post_en.locationdescription = ?, post_en.features = ?,
    post_de.title = ?,post_de.price = ?, post_de.priceperm2 = ?, post_de.m2 = ?, post_de.id = ?,post_de.bedrooms = ?, post_de.bathrooms = ?, post_de.description = ?, post_de.location = ?, post_de.locationdescription = ?, post_de.features = ? WHERE post_ru.id = ?;`
    db.query(q,[titleRU,priceRU,priceperm2RU,m2RU,idRU,bedroomsRU,bathroomsRU,descriptionRU,locationRU,locationdescriptionRU,featuresRU,
      titleLT,priceLT,priceperm2LT,m2LT,idLT,bedroomsLT,bathroomsLT,descriptionLT,locationLT,locationdescriptionLT,featuresLT,
      titleEN,priceEN,priceperm2EN,m2EN,idEN,bedroomsEN,bathroomsEN,descriptionEN,locationEN,locationdescriptionEN,featuresEN,
      titleDE,priceDE,priceperm2DE,m2DE,idDE,bedroomsDE,bathroomsDE,descriptionDE,locationDE,locationdescriptionDE,featuresDE,
      oldid], (err, data) => {

      if (err) return res.json(err);
      const query2 = 'DELETE FROM post_images WHERE post_id = ?'
      db.query(query2,oldid,(err2,data2)=>{
      if (err2) return res.json(err2);
      images.forEach(url => {
        if (url.url) { 
        const query = `INSERT INTO post_images (post_id, url) VALUES (?, ?)`;
        const values = [newid, url];
        console.log("3")
      
        // Execute the SQL query for each url
        console.log(newid)
        console.log(url)
        db.query(query, [newid,url.url], (err3, result) => {
          if (err3) {
            console.error('Error inserting URL:', err3);
          } else {
            console.log('URL inserted successfully:', url);
          }
        });
      }
      });
      })
    })
    res.json('Updated successfully!')

    };
    export const deleteBlog = (req,res)=>{
      const id = req.body.id;
        const q = `DELETE post_en, post_ru, post_de, post_lt
        FROM post_en
        JOIN post_ru ON post_en.id = post_ru.id
        JOIN post_de ON post_ru.id = post_de.id
        JOIN post_lt ON post_de.id = post_lt.id
        WHERE post_en.id = ?;`;
        db.query(q,[id], (err, data) => {
            if (err) return res.json(err);
            res.json("DELETED")
        })
    };

    export const getAllForHomeEN = (req,res)=>{
      const selectedLanguage2 = req.query.selectedLanguage2;
      const language = req.query.selectedLanguage2
      const trimmedLanguage = language.substring(0, 2);
      const q = `SELECT p.*, (
        SELECT GROUP_CONCAT(pi.url SEPARATOR ', ')
        FROM post_images pi
        WHERE pi.post_id = p.id
        ) AS images
        FROM post_${trimmedLanguage} p
        LIMIT 6`;
        
      db.query(q, (err, data) => {
        if (err) return res.json(err);
        
        const postsToday = data.map(post => {
          let parsedImages = [];
          if (post.images) {
            parsedImages = post.images.split(', ');
          }
          return { ...post, images: parsedImages };
          });
          const q2 = `SELECT p.*, (
            SELECT GROUP_CONCAT(pi.url SEPARATOR ', ')
            FROM post_images pi
            WHERE pi.post_id = p.id
            ) AS images
            FROM post_${trimmedLanguage} p
            ORDER BY p.id DESC
            LIMIT 6`;
  
  
      db.query(q2, (err2, data2) => {
        if (err2) return res.json(err2);
        const postsMonth = data2.map(post => {
          let parsedImages = [];
          if (post.images) {
            parsedImages = post.images.split(', ');
          }
          return { ...post, images: parsedImages };
          });


          const language = req.query.selectedLanguage2
          const trimmedLanguage = language.substring(0, 2);
          const q = `SELECT DISTINCT location from post_${trimmedLanguage}`
          db.query(q,(err,location_data)=>{
            if (err) return res.json(err);






            const q = `SELECT id,title,author,image, SUBSTRING(content, 1, 100) AS content FROM blogs_${trimmedLanguage};`
            db.query(q,(err,blogs_data)=>{
              if (err) return res.json(err);
            
              const q = `SELECT * FROM testimonials_${trimmedLanguage}`
              db.query(q,(err,testimonials_data)=>{
                if (err) return res.json(err);
            
                const convertedDataToday = [];
                const convertedDataMonth = [];
                const priceQ = 'SELECT * FROM rates;'
              db.query(priceQ,(rateError,rateData)=>{
                if(rateError){
                  console.log(rateError)
                  return res.json(rateError);
                }
                for (const post of postsToday) {
                  let amount = post.price;
                  const numberWithNoComma = Number(amount.toString().replace(/,/g, ""));
                  let thePrice;
                      if(language == 'en'){
                        thePrice = Math.floor(numberWithNoComma * rateData[0].USD);
                      }
                      if(language == 'ru')
                    {
                          thePrice = Math.floor(numberWithNoComma * rateData[0].RUB);
      
                    }
                    if(language == 'de' || language == 'lt')
                      {
                          thePrice = Math.floor(numberWithNoComma * rateData[0].EUR);
      
                      }
                  if (typeof thePrice !== "undefined" ){
                      thePrice = thePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
                      const convertedPost = { ...post, price: thePrice};
                      convertedDataToday.push(convertedPost);
                  }
      
                }

                for (const post of postsMonth) {
                  let amount = post.price;
                  const numberWithNoComma = Number(amount.toString().replace(/,/g, ""));
                  let thePrice;
                      if(language == 'en'){
                        thePrice = Math.floor(numberWithNoComma * rateData[0].USD);
                      }
                      if(language == 'ru')
                    {
                          thePrice = Math.floor(numberWithNoComma * rateData[0].RUB);
      
                    }
                    if(language == 'de' || language == 'lt')
                      {
                          thePrice = Math.floor(numberWithNoComma * rateData[0].EUR);
      
                      }
                  if (typeof thePrice !== "undefined" ){
                      thePrice = thePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
                      const convertedPost = { ...post, price: thePrice};
                      convertedDataMonth.push(convertedPost);
                  }
      
                }
            res.json({ today: convertedDataToday,month:convertedDataMonth,prefs:location_data,blogs:blogs_data,testimonials:testimonials_data });
          })
            })

          })
      
          }) 


  
      })
      });
      
    }

    export const deletePost = (req,res)=>{
      const id =req.body.id;
    const q = `DELETE post_en, post_ru, post_de, post_lt
    FROM post_en
    JOIN post_ru ON post_en.id = post_ru.id
    JOIN post_de ON post_ru.id = post_de.id
    JOIN post_lt ON post_de.id = post_lt.id
    WHERE post_en.id = ?;`;
    db.query(q,[id], (err, data) => {
        if (err) return res.json(err);
        res.json("DELETED")
    })
    }
    export const getAPost = (req,res)=>{
      const language = req.query.language;
      const id = req.query.id;
      const query = `SELECT * FROM post_${language} WHERE id = ?`;
      db.query(query,[id],(err,data)=>{
        if(err)return res.json(err);
        const q2 = 'SELECT * FROM post_images WHERE post_id = ?';
        db.query(q2,[id],(err2,data2)=>{
          if(err2) return res.json(er2)
            const convertedData = [];
            const priceQ = 'SELECT * FROM rates;'
          db.query(priceQ,(rateError,rateData)=>{
            if(rateError){
              console.log(rateError)
              return res.json(rateError);
            }
          for (const post of data) {
            let amount = post.price;
            let amountPer = post.priceperm2;
            const numberWithNoComma = Number(amount.toString().replace(/,/g, ""));
            const numberWithNoComma2 = Number(amountPer.toString().replace(/,/g, ""));
            let thePrice;
            let thePerPrice;
                if(language == 'en'){
                  thePrice = Math.floor(numberWithNoComma * rateData[0].USD);
                  thePerPrice = Math.floor(numberWithNoComma2 * rateData[0].USD);
                }
                if(language == 'ru')
              {
                    thePrice = Math.floor(numberWithNoComma * rateData[0].RUB);
                    thePerPrice = Math.floor(numberWithNoComma2 * rateData[0].RUB);

              }
              if(language == 'de' || language == 'lt')
                {
                    thePrice = Math.floor(numberWithNoComma * rateData[0].EUR);
                    thePerPrice = Math.floor(numberWithNoComma2 * rateData[0].EUR);

                }
            if (typeof thePrice !== "undefined" && typeof thePerPrice !== "undefined" ){
                thePrice = thePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                thePerPrice = thePerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const convertedPost = { ...post, price: thePrice,priceperm2: thePerPrice};
                convertedData.push(convertedPost);
            }

          }
          res.json({post:convertedData,images:data2});

        })
      })

    }
      )
  }

    export const getRecent = (req,res)=>{
      const language = req.query.language;
      const id = req.query.id;
      const ids = JSON.parse(id);
      const results = [];

const getPostData = (id) => {
  return new Promise((resolve, reject) => {
    console.log(id)
    const postQuery = `SELECT * FROM post_${language} WHERE id = ?`;
    const imagesQuery = 'SELECT * FROM post_images WHERE post_id = ? LIMIT 1';

    db.query(postQuery, [id], (err, postData) => {
      if (err) {
        reject(err);
      } else {
        db.query(imagesQuery, [id], (err2, imageData) => {
          if (err2) {
            reject(err2);
          } else {
            const result = { post: postData, images: imageData };
            resolve(result);
          }
        });
      }
    });
  });
};

const fetchData = async () => {
  try {
    for (const id of ids) {
      const result = await getPostData(id);
      results.push(result);
    }
    res.json(results);
  } catch (error) {
    res.json(error);
  }
};

fetchData();
    }
    export const get3Random = async (req, res) => {
      try {
        const language = req.query.language;
        const q = `SELECT * FROM post_${language} ORDER BY RAND() LIMIT 3;`;
    
        const data = await new Promise((resolve, reject) => {
          db.query(q, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
    
        let images = [];
        for (let item of data) {
          const q = 'SELECT url from post_images WHERE post_id = ? LIMIT 1';
          const imageData = await new Promise((resolve, reject) => {
            db.query(q, [item.id], (err, result) => {
              if (err) reject(err);
              else resolve(result[0]);
            });
          });
          images.push(imageData);
        }
    
        res.json({
          posts: data,
          images: images
        });
      } catch (err) {
        res.json(err);
      }
    };