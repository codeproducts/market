import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import {useNavigate} from 'react-router-dom';
import { storage,fs } from "../../Config/Config";


function Addprod(){
    const [title, setTitle]=useState('');
    const [description, setDescription]=useState('');
    const [price, setPrice]=useState('');
    const [image,setImage]=useState('');

    const[imageError, setImageError]=useState('');
    
    const [sucessMsg,setSuccessMsg]=useState()
    const [uploadError, setUploadError]=useState('');

    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
        if(selectedFile&&types.includes(selectedFile.type)){
            setImage(selectedFile);
            setImageError('');
        }else{
            setImage(null)
            setImageError('please select a valid image file type')
        }
    }
    else{
        console.log('please select your file');
    }
    }

    const handleAddProducts=(e)=>{
        
        e.preventDefault()
        
        const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress)
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                fs.collection('Products').add({
                    title,
                    description,
                    price: Number(price),
                    url
                }).then(()=>{
                    setSuccessMsg('product added successfully');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    document.getElementById('file').value='';
                    imageError('');
                    setUploadError('');
                    setTimeout(()=>{
                         setSuccessMsg('')
                    },3000)
                }).catch(error=>setUploadError(error.message));
            })
        })
    }

    return(
        <div>
            <Navbar/>
            <div className="logincontent">
                <div className="heading">PRODUCTS</div>
                <div className="form">
                    {sucessMsg&&<>
                        <div className="success">{alert('product added successfully')}</div>
                    <br></br>
                    </>}

                    <form onSubmit={handleAddProducts}>
                        <input type="text" placeholder="Product Title" onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                        <input type="text" placeholder="Product Description" onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                        <input type="text" placeholder="Product Price" onChange={(e)=>setPrice(e.target.value)} value={price}></input><br></br>

                        <input type="file" id="file" onChange={handleProductImg}></input>
                      
                        {imageError&&<><br></br>
                        <div>{imageError}</div>
                        </>}  <br></br>

                        <button type="submit">Submit</button>

                    </form>
                    {uploadError&&<><br></br>
                        <div>{uploadError}</div>
                        </>}
                </div>

            </div>
            <img src="images/headphones.jpeg" className="flowers"></img>
        </div>
    )
}

export default Addprod