import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Component/NavBar/NavBar";
import Deshboard from "./Component/Deshboard/Deshboard";
import SignIn from "./Component/SignIn/SignIn";
import SignUp from "./Component/SignUp/SignUp";
import Shop from "./Component/Shop/Shop";
import coinSet from "./Component/NavBar/coinSet";
import { useEffect, useState } from "react";
import { Decrypt } from "./EncrypteStorage";
import GetCoins from "./Component/GetCoins/GetCoins";
import Admin from "./Component/Admin/Admin";


function App() {

  // setting basic Context use state to accessable
  const [coins, setCoins] = useState({coin: 0,car: []});


  // using useEffect for real time update
  useEffect(()=>{
    async function FetchLocalUser() {
        let coins = await Decrypt('coins');
        let cars = await Decrypt('carsOwned');
        if(coins === null){
          setCoins({coin: 0,car: []});
          return;
        }
        console.log('cars:', cars);
        setCoins({coin: coins,car: cars});
    }
    FetchLocalUser();
  },[]);


  // loading component
  return (
    <coinSet.Provider value={{ coins, setCoins }}>
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Deshboard />} />
            <Route path="/Login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/BuyCoins" element={<GetCoins />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </coinSet.Provider>
  );
}
export default App;
