import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { auth,fs } from "../../Config/Config";
import {useNavigate} from 'react-router-dom';


import "./Login.scss";
function Login(){
    const  history=useNavigate()
    const [email,setEmail]=useState('');
    const  [password ,setPassword]=useState('');

    const[errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    
    const handleSignin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Sucessfull. You will automatically get redirected to Home')
            
            setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history('/');
                },2000)
                document.getElementById("back").style.backgroundColor="#F7F7F7";    
        }).catch(error=>setErrorMsg(error.message));
    }
    return(
        <div className="loginpage">
            <Navbar/>
            <div className="logincontent">
                <div className="heading">LOGIN</div>
                {
                    successMsg&&<>{alert('Login Sucessfull. You will automatically get redirected to Home')}</>
                }
                <div className="form">
                    <form onSubmit={handleSignin}>
                        <input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} req></input>
                        <button type="submit">LOGIN</button>
                        <hr></hr>
                        <Link to="/signup"><button className="createacc" type="submit" onclick="return getData()">CREATE ACCOUNT</button></Link>

                    </form>
                    {
                    errorMsg&&<> <div>{errorMsg}</div><br></br></>
                }
                </div>

            </div>
            <img src="images/headphones.jpeg" className="flowers"></img>
        </div>
    )
}

export default Login;