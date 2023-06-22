import {db} from '../db.js'
import jwt from 'jsonwebtoken'

export const insertBlog = (req,res)=>{
    const q1 = 'INSERT INTO blogs_en (title,content, author,date,image) VALUES (?, ?, ?, ?, ?)';
    const q2 = 'INSERT INTO blogs_lt (title,content, author,date,image) VALUES (?, ?, ?, ?, ?)';
    const q3 = 'INSERT INTO blogs_de (title,content, author,date,image) VALUES (?, ?, ?, ?, ?)';
    const q4 = 'INSERT INTO blogs_ru (title,content, author,date,image) VALUES (?, ?, ?, ?, ?)';
    const en = req.body.enBlog;
    const ru = req.body.ruBlog;
    const de = req.body.deBlog;
    const lt = req.body.ltBlog;
    const enParams = [
        en.title,en.content,en.author,en.date,en.image
      ];
    
      const ruParams = [
        ru.title,ru.content,ru.author,ru.date,ru.image
      ];
      const ltParams = [
        lt.title,lt.content,lt.author,lt.date,lt.image
      ];
    
      const deParams = [
        de.title,de.content,de.author,de.date,de.image
      ];


      db.query(q1, enParams, (err1, data1) => {
        if (err1) return res.json(err1);
        
        db.query(q2, ltParams, (err2, data2) => {
          if (err2) return res.json(err2);
          db.query(q3, deParams, (err3, data3) => {
            if (err3) return res.json(err3);
            db.query(q4, ruParams, (err4, data4) => {
                if (err4) return res.json(err4);
                res.json("NEW BLOG ADDED!");
                
              });
          });
        });
    })
};

export const getOne = (req,res) =>{
  const q = `SELECT * FROM ( SELECT *, 'table1' AS source FROM blogs_ru WHERE id = ? UNION ALL SELECT *, 'table2' AS source FROM blogs_lt WHERE id = ? UNION ALL SELECT *, 'table3' AS source FROM blogs_en WHERE id = ? UNION ALL SELECT *, 'table4' AS source FROM blogs_de WHERE id = ? ) AS combined_tables; `
  const id = req.query.id
  db.query(q,[id,id,id,id],(err,data)=>{
    if (err) return res.json(err);
    const modifiedData = data.map((row, index) => ({
      ...row,
      language: getLanguageByIndex(index),
    }));
    res.json({data:modifiedData})
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
export const getAllBlogs = (req,res)=>{
const language = req.query.language;
const q = `SELECT * FROM blogs_${language}`
db.query(q, (err, data) => {
    if (err) return res.json(err);
    const blogs = data.map(item => {
        const preview = item.content.slice(0, 200);
        return { ...item, preview };
      });
    res.json({data:blogs});
})
};
export const updateBlog = (req,res)=>{
const blogs = req.body;
console.log(blogs[0].title)
const titleRU = blogs[0].title;
const titleLT = blogs[1].title;
const titleEN = blogs[2].title;
const titleDE = blogs[3].title;

const contentRU = blogs[0].content;
const contentLT = blogs[1].content;
const contentEN = blogs[2].content;
const contentDE = blogs[3].content;

const authorRU = blogs[0].author;
const authorLT = blogs[1].author;
const authorEN = blogs[2].author;
const authorDE = blogs[3].author;

const dateRU = blogs[0].date;
const dateLT = blogs[1].date;
const dateEN = blogs[2].date;
const dateDE = blogs[3].date;

const imageeRU = blogs[0].image;
const imageeLT = blogs[1].image;
const imageeEN = blogs[2].image;
const imageeDE = blogs[3].image;
const id = blogs[0].id;
const q = `UPDATE blogs_ru JOIN blogs_lt ON blogs_ru.id = blogs_lt.id JOIN blogs_en ON blogs_ru.id = blogs_en.id JOIN blogs_de ON blogs_ru.id = blogs_de.id 
SET blogs_ru.title = ?,blogs_ru.content = ?, blogs_ru.author = ?, blogs_ru.date = ?, blogs_ru.image = ?,
blogs_lt.title = ?,blogs_lt.content = ?, blogs_lt.author = ?, blogs_lt.date = ?, blogs_lt.image = ?,
blogs_en.title = ?,blogs_en.content = ?, blogs_en.author = ?, blogs_en.date = ?, blogs_en.image = ?,
blogs_de.title = ?,blogs_de.content = ?, blogs_de.author = ?, blogs_de.date = ?, blogs_de.image = ? WHERE blogs_ru.id = ?;`
db.query(q,[titleRU,contentRU,authorRU,dateRU,imageeRU,titleLT,contentLT,authorLT,dateLT,imageeLT,titleEN,contentEN,authorEN,dateEN,imageeEN,titleDE,contentDE,authorDE,dateDE,imageeDE,id], (err, data) => {
  if (err) return res.json(err);

res.json('Updated successfully!')
})
};
export const deleteBlog = (req,res)=>{
  const id = req.body.id;
    const q = `DELETE blogs_en, blogs_ru, blogs_de, blogs_lt
    FROM blogs_en
    JOIN blogs_ru ON blogs_en.id = blogs_ru.id
    JOIN blogs_de ON blogs_ru.id = blogs_de.id
    JOIN blogs_lt ON blogs_de.id = blogs_lt.id
    WHERE blogs_en.id = ?;`;
    db.query(q,[id], (err, data) => {
        if (err) return res.json(err);
        res.json("DELETED")
    })
};
export const getABlog = (req,res)=>{
const id = req.query.id;
const language = req.query.language;
const query = `SELECT * FROM blogs_${language} WHERE id = ?;`;

db.query(query, [id], (err, data) => {
  if (err) return res.json(err);

  const blog = {
    ...data[0],
    content: data[0].content, // Assuming the content is stored as HTML
    formattedDate: new Date(data[0].date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  };

  res.json({ blog });
});
}
