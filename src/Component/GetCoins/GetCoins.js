import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import './GetCoins.css'
import { Decrypt, Encrypt } from "../../EncrypteStorage";
import { useNavigate } from 'react-router-dom';
import coinSet from "../NavBar/coinSet";

 
function GetCoins() {

    // setting States
    const [crd,setCrd] = useState();
    const [pwd,setPwd] = useState('');
    const [amm,setAmm] = useState();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('Invelid Ammount');
    const [displayError, setDisplayError] = React.useState('none');
    const { coins, setCoins } = useContext(coinSet);


    //setting submit handle
    async function handleSubmit(event) {
        event.preventDefault();
        

        // loading user Data from Encrypted Storage
        let username; 
        let password; 
        await Decrypt('username').then(localUsername=>username = localUsername);
        await Decrypt('password').then(localPassword=>password = localPassword);


        // checking if user data is null or not
        if (username === null || password === null) {
            setErrorMessage('Login To Continue');
            setDisplayError('flex');
            return;
        }


        // setting creditiontial velidation
        if (crd < 1000 || pwd.length < 4 || amm < 1) {
            setErrorMessage('Invelid Inputs');
            setDisplayError('flex');
            return;
        }


        // connection to server and setting incomming data
        let response;
        try {
            response = await fetch('http://192.168.0.190/BuyCoin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ammount:amm, username: username, password: password })
            })
            response = await response.json();
            if (response.code === 0) {
                setDisplayError('flex');
            }
            else {
                console.log(response);
                Encrypt('coins', response.coin);
                Encrypt('cr', response.cr);
                setDisplayError('none');
                setCoins({coin: response.coin,car: coins.car});
                navigate('/Shop')
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    // Rendering Components
    return (
        <>
            <div className="inputSystem">
                <Box className="paymentMode" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <div className="header">Payment</div>
                    <Alert style={{ display: displayError }} severity="error">{errorMessage}</Alert>
                    <TextField value={crd} onChange={(event)=>setCrd(event.target.value)} className="InputFields" id="standard-basic" label="Card Number" type="number" variant="filled" />
                    <TextField value={pwd} onChange={(event)=>setPwd(event.target.value)} className="InputFields" id="standard-basic" label="Password" type="password" variant="filled" />
                    <TextField value={amm} onChange={(event)=>setAmm(event.target.value)} className="InputFields" id="standard-basic" label="Ammount" type="number" variant="filled" />
                    <div className="btnCnt">
                        <Button variant="contained" type="submit">Pay Now</Button>
                        <Button onClick={() => navigate('/Shop')} variant="outlined">Cancel</Button>
                    </div>
                </Box>
            </div>
        </>
    )
}
export default GetCoins;
