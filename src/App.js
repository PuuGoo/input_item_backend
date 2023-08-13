import { useEffect, useState } from 'react';
import '../src/css/style.css';
import '../src/css/style copy.css';
import '../src/css/reset.css';
import '../src/css/globalStyles.css';
import '../src/css/dogFoods.css';
import '../src/css/components.css';
import Image from '../src/Image/default-thumbnail.jpg'
import {Auth} from "./components/auth";
import {db, auth, storage} from "./config/firebase";
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { ref , uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee , faStar} from '@fortawesome/free-solid-svg-icons'  

function App() {
  const [movieList, setMovieList] = useState([]);

  // Info about Item
  const [idItem, setIdItem] = useState("");
  const [nameItem, setNameItem] = useState("");
  const [descItem, setDescItem] = useState("");
  const [author, setAuthor] = useState("");
  const [unitPriceItem, setUnitPriceItem] = useState("");
  const [unitItem, setUnitItem] = useState("");
  const [priceItem, setPriceItem] = useState("");

  // Image upload
  const [fileUpload, setFileUpload] = useState(Image);

  // Load Image
  const [loadImage, setLoadImage] = useState(Image);

  // Image Lists
  const [imageList, setImageList] = useState([]);

  // Image link only
  const [imageLink, setImageLink] = useState("");

  const movieCollectionRef = collection(db, "itemChewy");

  const getMovieList = async () => {
    // READ THE DATA
    // SET THE MOVIE LIST
    try {
    const data = await getDocs(movieCollectionRef);
    const filterdData = data.docs.map((doc) => ({
      ...doc.data(), 
      id: doc.id
    }));
    // console.log();
    setImageList(filterdData);
    } catch (err) {
      console.error(err);
    };
  };



  const onSubmitChewy = async (url) => {
    try {
    await addDoc(movieCollectionRef, {
      idItem: idItem, 
      nameItem: nameItem,
      descItem: descItem,
      author: author,
      unitPriceItem: unitPriceItem,
      unitItem: unitItem,
      priceItem: priceItem,
      imageBig: url
    });
    getMovieList();
    } catch(err) {
      console.error(err);
    }
  }
  // console.log(fileUpload);
  // const deleteMovie = async (id) => {
  //   const movieDoc = doc(db, "movies", id);
  //   // console.log(movieDoc);
  //   deleteDoc(movieDoc);
  //   getMovieList();
  // };

  // const updateMovie = async (id) => {
  //   const movieDoc = doc(db, "movies", id);
  //   // console.log(movieDoc);
  //   updateDoc(movieDoc, {title: newUpdateTitle});
  //   getMovieList();
  // };

  // const imageListRef = ref(storage, "projectFiles/");
  const uploadFile = async () => {
    if(!fileUpload) {
      return;
    }
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name + v4()}`);
    try {
    await uploadBytes(fileFolderRef, fileUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
        setImageLink((prev) => [...prev, url]);
        // console.log(url);
        // return url;
        onSubmitChewy(url);
        // document.querySelector("#image").src = url;
      });
    })
    } catch(err) {
      console.error(err);
    }
  }
  // uploadFile();
  // uploadFile();
  // console.log(uploadFile());
  // useEffect(() => {
  //   getMovieList();
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       // console.log(item);
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   })
  //   console.log(imageList);
  // }, []);

  useEffect(() => {
    getMovieList();
  });
  // console.log(imageList);
  
  return ( 
    <div className="App">
      <div class="input__items">
            <div class="container">
                <div class="input__items__wrapper">
                    <div class="items__image">
                        <div class="items__image__big">
                            <img src={loadImage} id="image" alt="" />
                            <label for="input__image__big"></label>
                            <input type="file" id="input__image__big" name="bigImage" 
                              onChange={(e) => {
                                setFileUpload(e.target.files[0]);
                                setLoadImage(URL.createObjectURL(e.target.files[0]));
                              }}
                            />
                        </div>
                        <div class="items__image__small">
                            <div class="items__image__small__1">
                                <img src={Image} alt="" />
                                <label for="input__image__small__1"></label>
                                <input type="file" id="input__image__small__1" />
                            </div>
                            <div class="items__image__small__2">
                                <img src={Image} alt="" />
                                <label for="input__image__small__2"></label>
                                <input type="file" id="input__image__small__2" />
                            </div>
                            <div class="items__image__small__3">
                                <img src={Image} alt="" />
                                <label for="input__image__small__3"></label>
                                <input type="file" id="input__image__small__3" />
                            </div>
                            <div class="items__image__small__4">  
                                <img src={Image} alt="" />
                                <label for="input__image__small__4"></label>
                                <input type="file" id="input__image__small__4" />
                            </div>
                            <div class="items__image__small__5">
                                <img src={Image} alt="" />
                                <label for="input__image__small__5"></label>
                                <input type="file" id="input__image__small__5" />
                            </div>
                        </div>
                    </div>
                    <div class="items__input__data">
                        {/* <a href="/content">Content</a> */}
                        <h1>Form Input Item</h1>
                        <div class="items__code__name__description">
                            <div class="items__code">
                                <label for="item__code">Id Item</label>
                                <input type="text" name="idItem" id="item__code" onChange={(e) => setIdItem(e.target.value)} />
                            </div>
                            <div class="items__code">
                                <label for="item__name">Name Item</label>
                                <input type="text" name="itemName" id="item__name" onChange={(e) => setNameItem(e.target.value)} />
                            </div>
                            <div class="items__code">
                                <label for="item__description">Description Item</label>
                                <input type="text" name="desItem" id="item__description" onChange={(e) => setDescItem(e.target.value)} />
                            </div>
                            <div class="items__code">
                                <label for="item__author">Author</label>
                                <input type="text" name="authorItem" id="item__author" onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div class="items__code">
                                <label for="item__UnitPrice">Unit Price Item</label>
                                <input type="text" name="unitPriceItem" id="item__UnitPrice" onChange={(e) => setUnitPriceItem(e.target.value)} />
                            </div>
                            <div class="items__code">
                                <label for="item__Unit">Unit Item</label>
                                <input type="text" name="unitItem" id="item__Unit" onChange={(e) => setUnitItem(e.target.value)} />
                            </div>
                            <div class="items__code">
                                <label for="item__Price">Price Item</label>
                                <input type="text" name="priceItem" id="item__Price" onChange={(e) => setPriceItem(e.target.value)} />
                            </div>
                        </div>
                        <div class="button">
                            <button name="list" class="save" onClick={(e) => {
                              onSubmitChewy();
                              uploadFile();
                              alert("Save done successfully!")
                            }}>Save Done</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>

        <div id='export'>
          {imageList.map((e) => {
            return <div className='container'>
                      <div className='item__options'>
                        <ul>
                          <li>
                            <div className='item__options__wrapper'>
                              <a className='item__options__image' href={"/contentDetails.html?" + e.idItem}>
                                <div>
                                  <img src={e.imageBig} width="232px" height="256px"></img>
                                </div>
                              </a>
                              <div className='item__options__description'>
                                <a href={"/contentDetails.html?" + e.idItem}>
                                  <div className='item__options__name'>More Choices Available</div>
                                  <div className='item__options__desc'>
                                    <strong id='name'>{e.nameItem}</strong>
                                    <span id='description'>{e.descItem}</span>
                                  </div>
                                  <div className='item__options__icon'>
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  </div>
                                </a>
                                <div id='price' className='item__options__price'>{e.priceItem}</div>
                                <div className='item__options__new_custiomers'>New Customers Only: Spend 49+ Get $20 off</div>
                                <div className='item__options__free'>FREE 1-3 day shipping over $49</div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                   </div>
          })}
        </div>
    </div>
  );
}

export default App;
