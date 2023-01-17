import React, { useEffect, useState } from "react";
import PlayScreen from "./PlayScreen";
import cube1 from "../assets/cube/cube1.png"
import cube2 from "../assets/cube/cube2.png"
import cube3 from "../assets/cube/cube3.png"
import cube4 from "../assets/cube/cube4.png"
import cube5 from "../assets/cube/cube5.png"
import cube6 from "../assets/cube/cube6.png"
import curative from '../assets/potions/curative.png'
import nocurative from '../assets/potions/nocurative.png'
import StartScreen from "./StartScreen";


function ResultScreen ({winnerResult,allPotions}){

 const [viewPlayScreen, setViewPlayScreen] = useState(false)
 const [healthyPotion,setHealthyPotion] = useState()
 const [poisonPotion,setPoisonPotion] = useState()


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


    setPoisonPotion(poisonPotion)
    setHealthyPotion(healthyPotion)

}

    console.log(winnerResult)

    function handleButtonPlayAgain(){
        distributionHealthyPoisonPotions(allPotions)
        setViewPlayScreen(true)
    }


    return(
        <>
        {viewPlayScreen ? (<PlayScreen healthy={healthyPotion} poison={poisonPotion} allPotions={allPotions}/>) :(
            <div>
                <div>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop:'200px', marginBottom:'20px'}}>
                        <div>
                            <img src={winnerResult.winner.curative ? curative : nocurative} style={{height: 250}}/>
                        </div>
                        <div>
                            <img style={{height: 200}} src={winnerResult.winner.cube === 1 ? cube1 : winnerResult.winner.cube === 2 ? cube2 : winnerResult.winner.cube === 3 ? cube3 : winnerResult.winner.cube=== 4 ? cube4 : winnerResult.winner.cube === 5 ? cube5 : winnerResult.winner.cube === 6 ? cube6 : null}/>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom:'50px'}}>
                        <div className="LittleFont">
                            <p>Resultado de la poción ganadora: {winnerResult.winnerCalculate} = {winnerResult.winnerResult}</p>
                            <p>Resultado de la poción perdedora: {winnerResult.loserCalculate} = {winnerResult.loserResult}</p>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <button className= "PrincipalBoton" onClick={handleButtonPlayAgain}>PLAY AGAIN</button>
                </div>
            </div>
        )}
        
        </>
    )
}

export default ResultScreen;