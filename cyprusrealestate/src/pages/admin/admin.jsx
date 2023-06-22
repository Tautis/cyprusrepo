import { useState, useEffect,useRef } from 'react'
import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import ImageGallery from 'react-image-gallery';
import {MdLocationOn,MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import {BsDash} from 'react-icons/bs';
import NavBar from '../components/navbar/navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
function Admin() {

  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [newAdvert, setNewAdvert] = useState(false);
  const [newBlog, setNewBlog] = useState(false);
  const [euAdvert, setEuAdvert] = useState(true);
  const [ruAdvert, setRuAdvert] = useState(false);
  const [ltAdvert, setLtAdvert] = useState(false);
  const [deAdvert, setDeAdvert] = useState(false);
  const [editAdvert, setEditAdvert] = useState(false);
  const [editBlog, setEditBlog] = useState(false);
  const [editBlog2, setEditBlog2] = useState(false);
  const [inputCount, setInputCount] = useState(1);
  const [language, setLanguage] = useState(1);
  const [imagesEN, setInputValuesEN] = useState([]);
  const [FeaturesClicked, setFeaturesClicked] = useState(false);
  const [LocationClicked, setLocationClicked] = useState(false);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const [searchItem,setSearchItem] = useState([])
  const [emptyProperties,setEmptyProperties] = useState([]);
  const [emptyProperties2,setEmptyProperties2] = useState([]);
  const [emptyProperties3,setEmptyProperties3] = useState([]);
  const [emptyProperties4,setEmptyProperties4] = useState([]);

  const [showWarning, setShowWarning] = useState(false);
  const [confirmatio, setConfirmation] = useState(false);
  const [error,setError] = useState("")
  const [blogValuesEN, setBlogValuesEN] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    id: '',
    image: ''
  });
  const [blogValuesDE, setBlogValuesDE] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    id: '',
    image: ''
  });
  const [blogValuesLT, setBlogValuesLT] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    id: '',
    image: ''
  });
  const [blogValuesRU, setBlogValuesRU] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    id: '',
    image: ''
  });
 
 
  const [formValuesEN, setFormValuesEN] = useState({
    title: '',
    price: '',
    pricePerSquareMeter: '',
    squareMeter: '',
    id: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    location: '',
    locationDescription: '',
    features: '',
    type: ''
  });

  const [formValuesRU, setFormValuesRU] = useState({
    title: '',
    price: '',
    pricePerSquareMeter: '',
    squareMeter: '',
    id: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    location: '',
    locationDescription: '',
    features: '',
    type: ''
  });
  const [formValuesDE, setFormValuesDE] = useState({
    title: '',
    price: '',
    pricePerSquareMeter: '',
    squareMeter: '',
    id: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    location: '',
    locationDescription: '',
    features: '',
    type: ''
  });

  const [formValuesLT, setFormValuesLT] = useState({
    title: '',
    price: '',
    pricePerSquareMeter: '',
    squareMeter: '',
    id: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    location: '',
    locationDescription: '',
    features: '',
    type: ''
  });
  const [formPreview, setFormPreview] = useState({
    title: '',
    price: '',
    pricePerSquareMeter: '',
    squareMeter: '',
    id: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    location: '',
    locationDescription: '',
    features: '',
    type: ''
  });

  const warningRef = useRef(null);

  const handleInputChange3 = (lng,fieldName,value)=>{
    if(lng =='en'){
      setBlogValuesEN((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }else if(lng =='ru'){
      setBlogValuesRU((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }else if(lng == 'lt'){
      setBlogValuesLT((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }else if(lng == 'de'){
      setBlogValuesDE((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }
  }

  const handleConfirmation = (id) => {
    console.log(id)
    confirmAlert({
      title: 'Delete blog',
      message: 'Are you sure you want to delete this blog?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Handle confirmed action
            deleteBlog(id)
          }
        },
        {
          label: 'No',
          onClick: () => {
            // Handle canceled action
          }
        }
      ]
    });
  };
  const handleConfirmation2 = () => {
    confirmAlert({
      title: 'Delete post',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Handle confirmed action
            deleteEditPost()
          }
        },
        {
          label: 'No',
          onClick: () => {
            // Handle canceled action
          }
        }
      ]
    });
  };
  const handleInputChange2 = (fieldName,value)=>{
    if (euAdvert) {
      setFormPreview({
        title: formValuesEN.title,
        price: formValuesEN.price,
        pricePerSquareMeter: formValuesEN.pricePerSquareMeter,
        squareMeter: formValuesEN.squareMeter,
        id: formValuesEN.id,
        bedrooms: formValuesEN.bedrooms,
        bathrooms: formValuesEN.bathrooms,
        description: formValuesEN.description,
        location: formValuesEN.location,
        locationDescription: formValuesEN.locationDescription,
        features: formValuesEN.features,
        type:formValuesEN.type
      });
    } else if (ruAdvert) {
      setFormPreview({
        title: formValuesRU.title,
        price: formValuesRU.price,
        pricePerSquareMeter: formValuesRU.pricePerSquareMeter,
        squareMeter: formValuesRU.squareMeter,
        id: formValuesRU.id,
        bedrooms: formValuesRU.bedrooms,
        bathrooms: formValuesRU.bathrooms,
        description: formValuesRU.description,
        location: formValuesRU.location,
        locationDescription: formValuesRU.locationDescription,
        features: formValuesRU.features,
        type:formValuesRU.type

      });
    }
    if(language == 1){
      setFormValuesEN((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }
    if(language == 2){
      setFormValuesRU((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }
    if(language == 4){
      setFormValuesDE((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }
    if(language == 3){
      setFormValuesLT((prevValues) => ({
        ...prevValues,
        [fieldName]: value
      }));
    }
  }
  const handleInputChange = (index, value) => {
    const updatedValues = [...imagesEN];
    updatedValues[index] = value;
    setInputValuesEN(updatedValues);
  };
  const addInput = () => {
    setInputCount(inputCount + 1);
    setInputValuesEN([...imagesEN, '']);
  };
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
  const removeInput = (index) => {
    if (inputCount === 1) return;
    setInputCount(inputCount - 1);
    const updatedValues = [...imagesEN];
    updatedValues.splice(index, 1);
    setInputValuesEN(updatedValues);
  };
  const [searchBool, setSearchBool] = useState(false);
  const [editPostImages,setEditPostImages] = useState([])
  const searchForItem = async (e)=>{
    console.log(search)
    await axiosInstance.get('/posts/findOne',{
      params:{id:search}})
    .then(response => {
      // Handle the response
      console.log('Post found successfully!');
      setSearchItem(response.data.data)
      setEditPostImages(response.data.images)
      console.log(response.data)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error updating blog:', error);
    });
  }
  useEffect(() => {
    if (euAdvert) {
      setFormPreview({
        title: formValuesEN.title,
        price: formValuesEN.price,
        pricePerSquareMeter: formValuesEN.pricePerSquareMeter,
        squareMeter: formValuesEN.squareMeter,
        id: formValuesEN.id,
        bedrooms: formValuesEN.bedrooms,
        bathrooms: formValuesEN.bathrooms,
        description: formValuesEN.description,
        location: formValuesEN.location,
        locationDescription: formValuesEN.locationDescription,
        features: formValuesEN.features,
        type:formValuesEN.type
      });
    } else if (ruAdvert) {
      setFormPreview({
        title: formValuesRU.title,
        price: formValuesRU.price,
        pricePerSquareMeter: formValuesRU.pricePerSquareMeter,
        squareMeter: formValuesRU.squareMeter,
        id: formValuesRU.id,
        bedrooms: formValuesRU.bedrooms,
        bathrooms: formValuesRU.bathrooms,
        description: formValuesRU.description,
        location: formValuesRU.location,
        locationDescription: formValuesRU.locationDescription,
        features: formValuesRU.features,
        type:formValuesRU.type

      });
    } 

  }, [euAdvert, ruAdvert]);
  const submitToDbBlog = async (e)=>{
    e.preventDefault();
    try{
      const response = await axiosInstance.post("/blogs/post", {
        withCredentials:true,
        enBlog:blogValuesEN,
        deBlog:blogValuesDE,
        ruBlog:blogValuesRU,
        ltBlog:blogValuesLT,
        images:imagesEN
      });
      console.log(blogValuesDE)
      console.log(blogValuesLT)
      console.log(blogValuesRU)
      console.log(blogValuesEN)
    }catch(err){
      console.log(err);
    }
  }
  const submitToDb = async (e) => {
    if (Object.values(formValuesEN).every(value => value === ""))
    {
      console.log("TRUKSTA")
    }
    const emptyProp = [];
    const emptyProp2 = [];
    const emptyProp3 = [];
    const emptyProp4 = [];
    for (const key in formValuesEN) {
      if (formValuesEN.hasOwnProperty(key) && formValuesEN[key] === "") {
        if (key !== "locationDescription" && key !== "features" && key !== "id") {
          emptyProp.push(key);
          toast.error('English | ' + key + ' is missing', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
    }
    setEmptyProperties(emptyProp)
    for (const key in formValuesRU) {
      if (formValuesRU.hasOwnProperty(key) && formValuesRU[key] === "") {
        if (key !== "locationDescription" && key !== "features" && key !== "id" && key !== "price" && key !== "pricePerSquareMeter" && key !== "bedrooms" && key !== "bathrooms" && key !== "type"  && key !== 'squareMeter') {
          emptyProp2.push(key);
          toast.error('Russian | ' + key + ' is missing', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
    }
    setEmptyProperties2(emptyProp2)
    for (const key in formValuesLT) {
      if (formValuesLT.hasOwnProperty(key) && formValuesLT[key] === "") {
        if (key !== "locationDescription" && key !== "features" && key !== "id" && key !== "price" && key !== "pricePerSquareMeter" && key !== "bedrooms" && key !== "bathrooms" && key !== "type" && key !== 'squareMeter') {
          emptyProp3.push(key);
          toast.error('Lithuanian | ' + key + ' is missing', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
    }
    setEmptyProperties3(emptyProp3)
    for (const key in formValuesDE) {
      if (formValuesDE.hasOwnProperty(key) && formValuesDE[key] === "") {
        
        if (key !== "locationDescription" && key !== "features" && key !== "id" && key !== "price" && key !== "pricePerSquareMeter" && key !== "bedrooms" && key !== "bathrooms" && key !== "type" && key !== 'squareMeter') {
          emptyProp4.push(key);
          toast.error('German | ' + key + ' is missing', {
            position: toast.POSITION.TOP_RIGHT
          });
          console.log("HERE")
        }
      }
    }
    if(emptyProp == "" && emptyProp2 == "" && emptyProp3 == "" && emptyProp4 == "")
    {
      console.log("VISKAS OK")
      if (Object.values(formValuesEN).every(value => value === "")){
        console.log("TRUKSTA")
      }
      try {
        const response = await axiosInstance.post("/posts/postAll", {
        withCredentials:true,
        enText:formValuesEN,
        ruText:formValuesRU,
        ltText:formValuesLT,
        deText:formValuesDE,
        images:imagesEN
      });
      // console.log(response)
      console.log("INSERTED ADVERTISEMENT");
      toast.success('Advertisment uploaded successfuly', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (err) {
      // Handle error response
      if (err.response && err.response.status === 400) {
        console.log(err.response.data.error);
        toast.error('This ID already exists', {
          position: toast.POSITION.TOP_RIGHT
        });// "Input already exists"
        // Display an error message to the user indicating that the input already exists
      } else {
        console.log("ERROR ADVERTISEMENT");
        // Display a generic error message to the user
      }
    }

    }
    else{
      setShowWarning(true);

    }
    setEmptyProperties4(emptyProp4)
    console.log("Empty properties:", emptyProperties);

  }
  const [allBlogs,setAllBlogs] = useState([])
  useEffect(() =>{
    if(editBlog){
      const fetchAllBlogs = async () => {
        const response = await axiosInstance.get('/blogs/getAll',{
          params:{
            language:'en'
          }
          
        })
        setAllBlogs(response.data.data)

      }


      fetchAllBlogs();
    }
  },[editBlog,reload])
const [toBeEdited,setToBeEdited] = useState([])
const [toBeEditedPost,setToBeEditedPost] = useState([])
  const editBlogFunc = (id)=> {
    console.log(id)
    setEditBlog2(!editBlog2)
    axiosInstance.get(`/blogs/getOne`, { params: { id: id } })
    .then(response => {
      // Handle the response
      console.log('Blog retrieved successfully:', response.data);
      setToBeEdited(response.data.data)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error retrieving blog:', error);
    });
  }
  const submitEditedBloc = ()=>{
    axiosInstance.put(`/blogs/${id}`, { /* data to update */ })
    .then(response => {
      // Handle the response
      console.log('Blog updated successfully!');
    })
    .catch(error => {
      // Handle any errors
      console.error('Error updating blog:', error);
    });
  }
  const deleteBlog = (id) => {
    console.log(id)
    const idd = id
    axiosInstance.post('/blogs/deleteBlog',{id:idd})
    .then(response => {
      // Handle the response
      console.log('Blog deleted successfully!');
      setReload(!reload)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error updating blog:', error);
    });
  }

  const handleInputChange4 = (language, field, value) => {
    setToBeEdited((prevItems) =>
      prevItems.map((item) => {
        if (item.language === language) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleInputChange5 = (language, field, value) => {
    setSearchItem((prevItems) =>
      prevItems.map((item) => {
        if (item.language === language) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const updateEdited = (e) => {
    event.stopPropagation()
    console.log(toBeEdited)
    axiosInstance.post('/blogs/updateBlog',toBeEdited)
    .then(response => {
      console.log('Blog updated successfully!');
    })
    .catch(error => {
      console.error('Error updating blog:', error);
    });
  }
  const [selectedImage, setSelectedImage] = useState('')
  const [changeUrl, setChangeUrl] = useState('')

  const [uploadImage, setUploadImage] = useState('')
  const imagePressed = (e) =>{
    console.log(e);
    setSelectedImage(e)
  } 
  const setNewImage = ()=>{
    const images = [...editPostImages];
    const changeUrlObj = {post_id:search,url:changeUrl}
    images[selectedImage] = changeUrlObj;
    setEditPostImages(images);
    console.log(images)
    editPostImages[selectedImage]

  }
  const closePopup = ()=>{
    setSelectedImage('')
  }
  const deleteEditPost = (e) =>{
    event.stopPropagation()
    console.log("DELETE")
    axiosInstance.post('/posts/deletePost',{id:search})
    .then(response=>{
      console.log('Post deleted successfully!');

    })
    .catch(error =>{
      console.error('Error deleting post:', error);

    })
  }
  const updateEditedPosts = (e) => {
    event.stopPropagation()
    console.log(searchItem)
    console.log(editPostImages)
    axiosInstance.post('/posts/updatePosts',{searchItem:searchItem,editPostImages:editPostImages,search:search})
    .then(response => {
      // Handle the response
      console.log('Blog updated successfully!');
    })
    .catch(error => {
      // Handle any errors
      console.error('Error updating blog:', error);
    });
  }
  useEffect(() => {
    console.log(changeUrl)
  },[changeUrl])
  const getFormValues = () => {
    switch (language) {
      case 1:
        return formValuesEN;
      case 2:
        return formValuesRU;
      case 3:
        return formValuesLT;
      case 4:
        return formValuesDE;
      default:
        return formValuesEN;
    }
  };
  return (
    <div>
      <NavBar/>
      <ToastContainer />
      <h1>Hello</h1>
      <div>
      <button className={newAdvert ? "green" : ""} type='submit'onClick={() => {setNewAdvert(true);setEditAdvert(false);setNewBlog(false);setEditBlog(false)}}>New Advert</button>
      <button className={editAdvert ? "green" : ""} type='submit'onClick={() => {setNewAdvert(false);setEditAdvert(true);setNewBlog(false);setEditBlog(false)}}>Edit Advert</button>
      <button className={newBlog ? "green" : ""} type='submit'onClick={() => {setNewAdvert(false);setEditAdvert(false);setNewBlog(true);setEditBlog(false)}}>New Blog</button>
      <button className={editBlog ? "green" : ""} type='submit'onClick={() => {setNewAdvert(false);setEditAdvert(false);setNewBlog(false);setEditBlog(true)}}>Edit Blog</button>
      </div>
      {editBlog ? (
          <div className='editblog '>
              {allBlogs && allBlogs.map((data,key)=>{
                return(
                  <div className='editchild'>
                    <input value={data.title}></input>
                    <textarea value={data.content} ></textarea>
                    <button onClick={() => editBlogFunc(data.id)}><AiOutlineEdit/></button>
                    <button className="delete"type='submit'onClick={() =>handleConfirmation(data.id)}><AiOutlineDelete/></button>
                    </div>
                )
                
              })}
              {editBlog2?(
                <div className='EditBlogs'>
                  {toBeEdited.map((item,key)=>{
                    return(
                      <div>
                      <h3>{item.language}</h3>
                      <label>Title</label>
                      <input value={item.title} onChange={(e) => handleInputChange4(item.language,'title', e.target.value)}/>
                      <label>Content</label>
                      <input value={item.content} onChange={(e) => handleInputChange4(item.language,'content', e.target.value)}/>
                      <label>Author</label>
                      <input value={item.author} onChange={(e) => handleInputChange4(item.language,'author', e.target.value)}/>
                      <label>Date</label>
                      <input type='date'value={item.date ? new Date(item.date).toISOString().substr(0, 10) : ''} onChange={(e) => handleInputChange4(item.language,'date', e.target.value)}/>
                      <label>image</label>
                      <input value={item.image} onChange={(e) => handleInputChange4(item.language,'image', e.target.value)}/>
                    </div>
                    )
                  })}
               <button type='submit' onClick={(e)=>updateEdited()}>UPDATE</button>
              </div>
              ):null}
            {/* {allBlogs} */}
          </div>
      ):null}

      {newBlog ?(
        <div className='blogWrap'>
        <div className='inputForm'>
          <h3>ENGLISH</h3>
          <label>Title</label>
          <textarea onChange={(e) => handleInputChange3('en','title', e.target.value)}/>
          <label>Content</label>
          <textarea onChange={(e) => handleInputChange3('en','content', e.target.value)}/>
          <label>Author</label>
          <input onChange={(e) => handleInputChange3('en','author', e.target.value)}/>
          <label>Date</label>
          <input type='date' onChange={(e) => handleInputChange3('en','date', e.target.value)}/>
          <label>Image</label>
          <input onChange={(e) => handleInputChange3('en','image', e.target.value)}/>
        </div>
        <div className='inputForm'>
          <h3>RUSSIAN</h3>
          <label>Title</label>
          <textarea onChange={(e) => handleInputChange3('ru','title', e.target.value)}/>
          <label>Content</label>
          <textarea onChange={(e) => handleInputChange3('ru','content', e.target.value)}/>
          <label>Author</label>
          <input onChange={(e) => handleInputChange3('ru','author', e.target.value)}/>
          <label>Date</label>
          <input type='date' onChange={(e) => handleInputChange3('ru','date', e.target.value)}/>
          <label>Image</label>
          <input onChange={(e) => handleInputChange3('ru','image', e.target.value)}/>
        </div>
        <div className='inputForm'>
          <h3>LITHUANIAN</h3>
          <label>Title</label>
          <textarea onChange={(e) => handleInputChange3('lt','title', e.target.value)}/>
          <label>Content</label>
          <textarea onChange={(e) => handleInputChange3('lt','content', e.target.value)}/>
          <label>Author</label>
          <input onChange={(e) => handleInputChange3('lt','author', e.target.value)}/>
          <label>Date</label>
          <input type='date' onChange={(e) => handleInputChange3('lt','date', e.target.value)}/>
          <label>Image</label>
          <input onChange={(e) => handleInputChange3('lt','image', e.target.value)}/>
        </div>
        <div className='inputForm'>
          <h3>GERMAN</h3>
          <label>Title</label>
          <textarea onChange={(e) => handleInputChange3('de','title', e.target.value)}/>
          <label>Content</label>
          <textarea onChange={(e) => handleInputChange3('de','content', e.target.value)}/>
          <label>Author</label>
          <input onChange={(e) => handleInputChange3('de','author', e.target.value)}/>
          <label>Date</label>
          <input type='date' onChange={(e) => handleInputChange3('de','date', e.target.value)}/>
          <label>Image</label>
          <input onChange={(e) => handleInputChange3('de','image', e.target.value)}/>
        </div>
        <br></br>
        <button type='submit' onClick={submitToDbBlog}>SUBMIT</button>
        </div>
      ):null}
      {newAdvert ? (
        <div className='newAdvert'>
        <div>
        <button type='submit' className={language === 1 ? "green" : ""} onClick={() => {setLanguage(1)}}>EN</button>
        <button type='submit' className={language === 2 ? "green" : ""} onClick={() => {setLanguage(2)}}>RU</button>
        <button type='submit' className={language === 3 ? "green" : ""} onClick={() => {setLanguage(3)}}>LT</button>
        <button type='submit' className={language === 4 ? "green" : ""} onClick={() => {setLanguage(4)}}>DE</button>
      </div>
      <div>
      <div>
      {language === 1 ? <h1>English</h1> : null}
      {language === 2 ? <h1>Russian</h1> : null}
      {language === 3 ? <h1>Lithuanian</h1> : null}
      {language === 4 ? <h1>German</h1> : null}
      <p>IMPORTANT: CURRENCY HAS TO BE IN £ (price, price per m2)</p>
      </div>
      <div>
        <form>
        <label>PRICE</label>
        <input type="text" value={formValuesEN.price} onChange={(e) => handleInputChange2('price',e.target.value)} />
        <label>PRICE PER M²</label>
        <input
          type="text"
          value={formValuesEN.pricePerSquareMeter}
          onChange={(e) => handleInputChange2('pricePerSquareMeter',e.target.value)}
        />
        <label>M²</label>
        <input type="text" value={formValuesEN.squareMeter} onChange={(e) => handleInputChange2('squareMeter',e.target.value)} />

         <label>ID (IF FROM https://north-cyprus-properties.net/)</label>
        <input type="text" value={formValuesEN.id} onChange={(e) => handleInputChange2('id',e.target.value)} />
        
        {error ? <p className='error'>{error}</p> : null}
        <label>BEDROOMS</label>

        <input type="text" value={formValuesEN.bedrooms} onChange={(e) => handleInputChange2('bedrooms',e.target.value)} />

        <label>BATHROOMS</label>
        <input type="text" value={formValuesEN.bathrooms} onChange={(e) => handleInputChange2('bathrooms',e.target.value)} />
        <label>TYPE</label>
        <select value={formValuesEN.type} onChange={(e) => handleInputChange2('type',e.target.value)}>
          <option value="1">Appartament</option>
          <option value="2">Villa</option>
        </select>
      </form>
      <form>
        <label>TITLE</label>
        <input type="text" value={getFormValues().title} onChange={(e) => handleInputChange2('title', e.target.value)} />

        
       
 
       
        <label>DESCRIPTION</label>
        <input type="text" value={getFormValues().description} onChange={(e) => handleInputChange2('description',e.target.value)} />

        <label>LOCATION</label>
        <input type="text" value={getFormValues().location} onChange={(e) => handleInputChange2('location',e.target.value)} />

        <label>LOCATION DESCRIPTION</label>
        <input
          type="text"
          value={getFormValues().locationDescription}
          onChange={(e) => handleInputChange2('locationDescription',e.target.value)}
        />

        <label>FEATURES</label>
        <input type="text" value={getFormValues().features} onChange={(e) => handleInputChange2('features',e.target.value)} />

        <label>imagesEN</label>
        {imagesEN.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            
            {index > 0 && (
              <button type="button" onClick={() => removeInput(index)}>
                Image -
              </button>
            )}
          </div>
        ))}
        
              <button type="button" onClick={addInput}>
                Image +
              </button>

              <button type='button' onClick={() =>submitToDb()}>SUBMIT</button>
      </form>
      </div>
      </div>
      <div >
      <h1>PREVIEW</h1>
      
        <div className='apartament-container'>
      <div className='apartament-leftBox'>
        <h2>{getFormValues().title}</h2>
        <div id="image-gallery">
        <ImageGallery items={imagesEN.map((image, index) => ({
           original: image,
           thumbnail: image,
           originalAlt: `Image ${index + 1}`,
           thumbnailAlt: `Thumbnail ${index + 1}`,
         }))} />
        </div>
      </div>
      <div className='apartament-rightBox'>
        <div className='price-wrap'>
          <div><p>{formValuesEN.price}</p></div>
          <div><p>{formValuesEN.pricePerSquareMeter}</p></div>
        </div>
        <div className='location-wrap'>
          <p><MdLocationOn/></p>
          <p className='location'>{getFormValues().location}</p>
          </div>
        <div className='general-info'>
          <div>
            <p>TOTAL AREA:</p>
            <p className='m2bedroomValues'>{formValuesEN.squareMeter}m²</p>
          </div>
          <div>
            <p>BEDROOMS</p>
            <p className='m2bedroomValues'>{formValuesEN.bedrooms}</p>
          </div>
          <div>
            <p>BATHROOMS</p>
            <p className='m2bedroomValues'>{formValuesEN.bathrooms}</p>
          </div>
        </div>
        <div className='description-wrap'>
        <p>DESCRIPTION</p>
        <p className='bigText'>{getFormValues().description}</p>
        </div>
        <div className='location_features'>
          <div>
            <div className='Name'  onClick={handleClickFeatures}>
              <p>FEATURES</p>
              {FeaturesClicked ? <p className='textRight'><MdOutlineKeyboardArrowDown/></p> :<p className='textRight'><BsDash/></p> }
            </div>
            <div>
              {FeaturesClicked && <p>{getFormValues().features}</p>}
            </div>
          </div>
          <div className='borderB'>
            <div className='Name' onClick={handleClickLocation}>
              <p>LOCATION</p>
              
              {LocationClicked ? <p className='textRight'><MdOutlineKeyboardArrowDown/></p> :<p className='textRight'><BsDash/></p> }
            </div>
            <div>
              {LocationClicked && <p>{getFormValues().locationDescription}</p>}
            </div>
          </div>
          </div>

      </div>
      
    </div>
      </div>
      </div>
         ): null}
      {editAdvert ? (
      <div className='Search'>
      <h1>EDIT</h1>
      <label>SEARCH</label>
      <input placeholder='search...' onChange={(e) => setSearch(e.target.value)}/>
      <button onClick={() =>searchForItem(search)}> Search</button>
      </div>
       ): null}

{editAdvert&&searchItem?(
      <div className='EditBlogs'>
        <div className='textwrap'>

        {searchItem && searchItem.map((item,key)=>{
          return(
            <div>
            <h3>{item.language}</h3>
            <label>Title</label>
            <input value={item.title} onChange={(e) => handleInputChange5(item.language,'title', e.target.value)}/>
            <label>Price</label>
            <input value={item.price} onChange={(e) => handleInputChange5(item.language,'price', e.target.value)}/>
            <label>Price per m2</label>
            <input value={item.priceperm2} onChange={(e) => handleInputChange5(item.language,'priceperm2', e.target.value)}/>
            <label>m2</label>
            <input value={item.m2} onChange={(e) => handleInputChange5(item.language,'m2', e.target.value)}/>
            <label>ID</label>
            <input value={item.id} onChange={(e) => handleInputChange5(item.language,'id', e.target.value)}/>
            <label>Bedrooms</label>
            <input value={item.bedrooms} onChange={(e) => handleInputChange5(item.language,'bedrooms', e.target.value)}/>
            <label>Bathrooms</label>
            <input value={item.bathrooms} onChange={(e) => handleInputChange5(item.language,'bathrooms', e.target.value)}/>
            <label>Description</label>
            <input value={item.description} onChange={(e) => handleInputChange5(item.language,'description', e.target.value)}/>
            <label>Location</label>
            <input value={item.location} onChange={(e) => handleInputChange5(item.language,'location', e.target.value)}/>
            <label>Location Description</label>
            <input value={item.locationdescription} onChange={(e) => handleInputChange5(item.language,'locationdescription', e.target.value)}/>
            <label>Features</label>
            <input value={item.features} onChange={(e) => handleInputChange5(item.language,'features', e.target.value)}/>
          </div>
          )
        })}
  

      </div>
      <button type='submit' onClick={(e)=>updateEditedPosts()}>UPDATE</button>
    <button type='submit' onClick={(e)=>handleConfirmation2()}>DELETE</button>
        <div className='editImageWrap'>

        {editPostImages.map((item,key)=>{
          return(
              <img onClick={() => imagePressed(key)} className='editpostimg' src={item.url}/>
          )
        })}

    </div> 

    {selectedImage !== "" && 
        <div className='selectedImg'>
          SELECTED IMAGE
          <img src={editPostImages[selectedImage].url}/>
          <br></br>
          <button>DELETE</button>
          <div className='flex'>
          <input type='file'/>
          <h2>OR</h2>
          <input placeholder='url...' value={changeUrl} onChange={(e)=>setChangeUrl(e.target.value)}/>
          <button onClick={()=>setNewImage()}>SET</button>
          </div>
          <div className='exit'><a onClick={()=>closePopup()}>X</a></div>
        </div>
}
    </div>
    
    ):null}
    </div>
  )
}

export default Admin
