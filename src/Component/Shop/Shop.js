import React, { useEffect, useState } from "react";
import './Shop.css'
import Pop from "./Pop/Pop";


// this will help to get available cars in server to buy
async function loadCarData() {
    let response = await fetch('http://192.168.0.190/GetCars');
    response = await response.json();
    console.log(response);
    return response;
}

// this will display cars of list using Array's map function
const CarList = (props) => {
    return (
        <div className="shopBody">
            {
                props.data.map((item) => (

                    <div className="shopSection" onClick={() => { props.setCallBuy(true); props.setCarDetail(item) }}>
                        <img className="itemImage" src={item.carIMG} alt='car' />
                        <div className="itemdetail">
                            <div>{item.carName}</div>
                            <div>{item.carPrise}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

// main component is rendring here
function Shop() {

    // setting states for this component
    const [carDataArray, setCarDataArray] = useState([]);
    const [callBuy, setCallBuy] = useState(false);
    const [carDetail, setCarDetail] = useState({
        carID: null,
        carName: null,
        carUrl: null,
        carPrice: null,
    })


    // updating data once when component render
    useEffect(()=>{
        loadCarData().then((newData)=>{
            setCarDataArray(newData);
        })
    }, [])

    // loding data to screen with ui
    return (
        <>
            {
                callBuy ? <Pop setDisplay={setCallBuy} carDetail={carDetail} /> : ''
            }
            <CarList data={carDataArray} setCallBuy={setCallBuy} setCarDetail={setCarDetail} />
        </>
    )
}
export default Shop;
