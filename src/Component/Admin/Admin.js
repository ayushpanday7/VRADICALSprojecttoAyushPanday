import React, { useEffect, useState } from "react";
import './Admin.css'
import { Button, TextField } from "@mui/material";
function Admin() {
    const [curd, setCURD] = useState(0);
    const [curdData, setCurdData] = useState([]);
    const [infleationValue, setInfleationValue] = useState(0);
    useEffect(()=>{
        async function getData(){
            let response = await fetch("http://192.168.0.190/Admin");
            response = await response.json();
            console.log(response);
            setCURD(response.curdData.length);
            setInfleationValue(response.cr);
            setCurdData(response.curdData);
        }
        getData();
    },[])
    return (
        <>
            <div className="wrapData">
                <div className="displayData"><span className="title">Hallo: </span>Admin</div>
                <div className="displayData"><span className="title">CURDs: </span>{curd}</div>
                <div className="infleationValue"><span className="title">Coin Price: </span>{infleationValue}</div>
            </div>
            <form action="/addCars" method="post" className="AddCar">
                <span className="title">Add Cars to Shop </span>
                <TextField style={{width: '70%'}}placeholder="Car ID" type="number" name="carID" />
                <TextField style={{width: '70%'}}variant="outlined" placeholder="Car Name" type="text" name="carName" />
                <TextField style={{width: '70%'}}variant="outlined" placeholder="Car IMG" type="text" name="carIMG" />
                <TextField style={{width: '70%'}}variant="outlined" placeholder="Car Prise" type="number" name="carPrise" />
                <Button variant="contained" type="submit">Sumbit</Button>
            </form>

            <div style={{margin:'auto',display:'flex',flexDirection:'column'}}>
                {
                    curdData.map((item) => (
                        <div style={{margin:'auto',paddingTop:'1rem'}}>
                            <div className="itemdetail" style={{display:'flex',flexDirection: 'column'}}>
                                <div>{item.title}</div>
                                <div>{item.description}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
};
export default Admin;
