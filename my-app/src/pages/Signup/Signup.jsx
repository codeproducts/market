import React, { useState,useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Navbar from "../../components/navbar/navbar";

import "./Signup.scss";
import { auth, fs } from "../../Config/Config";
import {useNavigate} from 'react-router-dom';

function Signup(){
    
    const history = useNavigate();

    const [fullname, setfullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    

    const[errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    

    const handleSignup=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials)
            fs.collection('users').doc(credentials.user.uid).set({
                fullname: fullname,
                username: email,
                password: password
                
            }).then(()=>{
                setSuccessMsg('Signup Successfull.You will now automatically get redirected to login');
                setfullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        });
    }

    
    return(
        <div>
            <Navbar></Navbar>
            <div className="logincontent">
                <div className="heading">Signup</div>
                {
                    successMsg&&<> <div>{alert('Signup Successfull.You will now automatically get redirected to login')}</div><br></br></>
                }
                <div className="form">
                    <form onSubmit={handleSignup}>
                        <input type="text" placeholder="Name" onChange={(e)=>setfullname(e.target.value)} value={fullname}></input>
                        <input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}></input>

                        <button type="submit">SIGNUP !</button>

                    </form>
                    {
                    errorMsg&&<> <div>{errorMsg}</div><br></br></>
                }
                </div>

            </div>
            <img src="images/smartwatch3.jpeg" className="flowers"></img>
        </div>
    )
}

export default Signup;