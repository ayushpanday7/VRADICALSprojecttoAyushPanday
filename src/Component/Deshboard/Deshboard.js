import React, { useContext, useEffect, useState } from "react";
import './Deshboard.css'
import { Decrypt } from "../../EncrypteStorage";
import coinSet from "../NavBar/coinSet";
import { useNavigate } from "react-router-dom";

// Deshboard Display
function Deshboard() {


    // Setting up states
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const { coins } = useContext(coinSet);
    const [infleationValue, setInfleationValue] = useState(0);
    const [username, setUserName] = useState('');
    const [coin, setCoin] = useState('');


    // using useEffect for update
    useEffect(() => {
        async function getData() {
            if (await Decrypt('username') === null) {
                navigate('/Login')
            }
            setUserName(await Decrypt('username'));
            setCoin(await Decrypt('coins'));
            let response = await fetch("http://192.168.0.190/getCoinPrise");
            response = await response.json();
            console.log(response)
            let cr = response.cr - 1;
            setInfleationValue(cr.toFixed(2));
        }
        setData(coins.car);
        getData();
    }, [coins.car, navigate])


    // Loading component
    return (
        <>
            <div className="wrapData">
                <div className="displayData"><span className="DisplayTitle">Hallo: </span>{username}</div>
                <div className="displayData"><span className="DisplayTitle">Coins: </span>{coin}</div>
                <div className="infleationValue"><span className="DisplayTitle">Infleation: </span>{infleationValue}</div>
            </div>
            <div className="PurchasedVehicles">Cars Will Apear Heare When You Buy</div>
            <div className="shopBody">
                {
                    data.map((item) => (

                        <div className="shopSection">
                            <img className="itemImage" src={item.carIMG} alt='car' />
                            <div className="itemdetail">
                                <div>{item.carName}</div>
                                <div>{item.carPrise}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default Deshboard;