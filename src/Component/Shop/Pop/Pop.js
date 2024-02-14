import { Alert, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import './Pop.css'
import coinSet from "../../NavBar/coinSet";
import POST from "../../POST";
import { Decrypt, Encrypt } from "../../../EncrypteStorage";


// this will display purchase screen
export default function Pop(props) {


    const [displayError, setDisplayError] = React.useState('none');
    const { coins, setCoins} = useContext(coinSet);


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        };
    }, []);
    
    
    async function handlePurchase() {
        console.log(props.carDetail.carPrise, coins);


        // return when car more expensive then available coin
        if (props.carDetail.carPrise > coins.coin) {
            setDisplayError('flex')
            return;
        }


        // reading local data and pushing purchase request to server
        let username = await Decrypt('username');
        let response = await POST('http://192.168.0.190/BuyCar',{
            username: username,
            carID: props.carDetail.carID,
            carName: props.carDetail.carName,
            carIMG: props.carDetail.carIMG,
            carPrise: props.carDetail.carPrise
        });


        // hendling response
        console.log(response);
        Encrypt('carsOwned',response);
        let newValue = coins.coin - props.carDetail.carPrise;
        setCoins({coin: newValue.toFixed(2),car: response})
        Encrypt('coins', newValue.toFixed(2));
        setDisplayError('none');
        props.setDisplay(false)
    }


    
    return (
        <div className="popwindow">
            <div className="item">
                <Alert style={{ display: displayError }} severity="error">Not Enough Coins</Alert>
                <div className="itemDetailBuy">
                    <img className="itemImage" src={props.carDetail.carIMG} alt='car' />
                    <div className="itemdetail">
                        <div>{props.carDetail.carName}</div>
                        <div>{props.carDetail.carPrise}</div>
                    </div>
                </div>
                <div className="bnContainer">
                    <Button onClick={() => handlePurchase()} variant="contained" className="btnBuy">BUY</Button>
                    <Button onClick={() => props.setDisplay(false)} className="btnBuy" variant="outlined">Cancle</Button>
                </div>
            </div>
        </div>
    )
}