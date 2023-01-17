import './App.css';
import React,{useState} from "react";
import axios from "axios";
import AppContext from './context';
import { useContext } from "react";
import GameComponent from './components/GameComponent';


function App() {

  const [allPotions, setAllPotions] = useState()
  const [viewScreen, setViewScreen] = useState(null)
  const [healthyPotion, setHealthyPotion] = useState()
  const [poisonPotion, setPoisonPotion] = useState()
  const [winnerData, setWinnerData] = useState ()

  function handleAllPotions (potions){
    setAllPotions(potions)
  }

  function handleViewScreen (view){
    setViewScreen(view)
  }
  
  function handleHealthyPotion (HealthyPotion){
    setHealthyPotion(HealthyPotion)
  }

  function handlePoisonPotion (PoisonPotion){
    setPoisonPotion(PoisonPotion)
  }

  function handleWinnerData (winnerData){
    setWinnerData(winnerData)
  }


  return (
    
    <AppContext.Provider value={{allPotions:allPotions, viewScreen:viewScreen, healthyPotion:healthyPotion, poisonPotion:poisonPotion, winnerData:winnerData,handleAllPotions,handleViewScreen,handleHealthyPotion,handlePoisonPotion,handleWinnerData}}>
      <GameComponent/>
    </AppContext.Provider>
  )
}

export default App;
