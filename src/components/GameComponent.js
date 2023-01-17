import React from "react";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../context";

import curative from '../assets/potions/curative.png'
import nocurative from '../assets/potions/nocurative.png'
import cube1 from "../assets/cube/cube1.png"
import cube2 from "../assets/cube/cube2.png"
import cube3 from "../assets/cube/cube3.png"
import cube4 from "../assets/cube/cube4.png"
import cube5 from "../assets/cube/cube5.png"
import cube6 from "../assets/cube/cube6.png"


function GameComponent() {
    const context = useContext(AppContext); 


    const distributionHealthyPoisonPotions = (poisons) =>{
        let healthyPotions = []
        let poisonPotions = []
    
        poisons.map((item) => {
            if(item.curative === true){
                healthyPotions.push(item)
            }else{
                poisonPotions.push(item)
            }
        })
    
    
        let healthyPotion = healthyPotions[Math.floor(Math.random() * healthyPotions.length)];
        let poisonPotion = poisonPotions[Math.floor(Math.random() * poisonPotions.length)];
        
        poisonPotion.cube = Math.floor(Math.random()*(6-1+1)+1);
        healthyPotion.cube = Math.floor(Math.random()*(6-1+1)+1);
    
    
        context.handlePoisonPotion(poisonPotion)
        context.handleHealthyPotion(healthyPotion)
    }

      
  function enterButtonClick(){
    axios({
      method: 'get',
      url: `https://gist.githubusercontent.com/Oskar-Dam/ad2c96601e79ad108227bc25f90e4e53/raw/25dc0198b2aaa85f0b5583978a0c6772cab63aba/Potions.js`,
    })
    .then(response => {
      context.handleAllPotions(response.data)
      distributionHealthyPoisonPotions(response.data)
      context.handleViewScreen("playScreen")

    })
    .catch(error => {
      alert(error)
    });
    
  }


  function battleWinner (healthy,poison) {
    let healthyPoints = (healthy.cube * 0.1 * healthy.power / healthy.mana).toFixed(2)
    let poisonPoints = (poison.cube * 0.1 * poison.power / poison.mana).toFixed(2)

    let healthyPointsString = `${(healthy.cube).toFixed(2)} * 0.1 * ${(healthy.power).toFixed(2)} / ${(healthy.mana).toFixed(2)}`
    let poisonPointsString = `${(poison.cube).toFixed(2)} * 0.1 * ${(poison.power).toFixed(2)} / ${(poison.mana).toFixed(2)}`

    if(healthyPoints>=poisonPoints){
        context.handleWinnerData({winner : healthy, winnerCalculate : healthyPointsString, loserCalculate : poisonPointsString, winnerResult : healthyPoints, loserResult: poisonPoints})
    }else{
        context.handleWinnerData({winner : poison, winnerCalculate : poisonPointsString, loserCalculate : healthyPointsString, winnerResult : poisonPoints, loserResult: healthyPoints})
    }
    context.handleViewScreen("resultScreen")
}

function handleButtonPlayAgain(){
    context.handleViewScreen("playScreen")
    distributionHealthyPoisonPotions(context.allPotions)
}

    return(
       context.viewScreen==null ?( <div className="InitialContainer">
            <div className="SecondayContainer">
                <p className= "PrincipalP">LAS PÓCIMAS REBELDES</p>
                <button className= "PrincipalBoton" onClick={enterButtonClick}>ENTER</button>
            </div>
        </div>):context.viewScreen == "playScreen" ? (
        <>
        <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop:'200px', marginBottom:'20px'}}>
          <div>
            <img alt="Potion type" src={context.healthyPotion.curative ? curative : nocurative} style={{height: 250}}/>
          </div>
          <div>
            <img style={{height: 200}} alt="Potion cube" src={context.healthyPotion.cube == 1 ? cube1 : context.healthyPotion.cube === 2 ? cube2 : context.healthyPotion.cube === 3 ? cube3 : context.healthyPotion.cube === 4 ? cube4 : context.healthyPotion.cube === 5 ? cube5 : context.healthyPotion.cube === 6 ? cube6 : null} />
          </div>
          <div>
            <img style={{height: 200}} alt="Potion cube" src={context.poisonPotion.cube === 1 ? cube1 : context.poisonPotion.cube === 2 ? cube2 : context.poisonPotion.cube === 3 ? cube3 : context.poisonPotion.cube === 4 ? cube4 : context.poisonPotion.cube === 5 ? cube5 : context.poisonPotion.cube === 6 ? cube6 : null} />
          </div>
          <div>
            <img alt="Potion type" src={context.poisonPotion.curative ? curative : nocurative} style={{height: 250}}/>
          </div>
          
        </div>
        <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom:'50px'}}>
          <div className="LittleFont">
            <p>name: {context.healthyPotion.name}</p>
            <p>alias: {context.healthyPotion.alias}</p>
            <p>curative: {context.healthyPotion.curative.toString()}</p>
            <p>power: {context.healthyPotion.power}</p>
            <p>mana: {context.healthyPotion.mana}</p>
          </div>
          <div className="LittleFont" >
            <p>name: {context.poisonPotion.name}</p>
            <p>alias: {context.poisonPotion.alias}</p>
            <p>curative: {context.poisonPotion.curative.toString()}</p>
            <p>power: {context.poisonPotion.power}</p>
            <p>mana: {context.poisonPotion.mana}</p>
          </div>
        </div>
        <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <button className= "PrincipalBoton" onClick={() => battleWinner(context.healthyPotion,context.poisonPotion)}>Launch battle</button>
        </div>
    </>
        
        ) :context.viewScreen === "resultScreen"? (

        <div>
                <div>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop:'200px', marginBottom:'20px'}}>
                        <div> {console.log(context)}
                            <img src={context.winnerData.winner.curative ? curative : nocurative} style={{height: 250}}/>
                        </div>
                        <div>
                            <img style={{height: 200}} src={context.winnerData.winner.cube === 1 ? cube1 : context.winnerData.winner.cube === 2 ? cube2 : context.winnerData.winner.cube === 3 ? cube3 : context.winnerData.winner.cube=== 4 ? cube4 : context.winnerData.winner.cube === 5 ? cube5 : context.winnerData.winner.cube === 6 ? cube6 : null}/>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom:'50px'}}>
                        <div className="LittleFont">
                            <p>Resultado de la poción ganadora: {context.winnerData.winnerCalculate} = {context.winnerData.winnerResult}</p>
                            <p>Resultado de la poción perdedora: {context.winnerData.loserCalculate} = {context.winnerData.loserResult}</p>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <button className= "PrincipalBoton" onClick={handleButtonPlayAgain}>PLAY AGAIN</button>
                </div>
            </div>
        
        
        ) :null
    )
}


export default GameComponent 