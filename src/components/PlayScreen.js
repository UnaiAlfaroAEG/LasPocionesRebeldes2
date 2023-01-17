import React, { useEffect, useState } from "react";
import curative from '../assets/potions/curative.png'
import nocurative from '../assets/potions/nocurative.png'
import cube1 from "../assets/cube/cube1.png"
import cube2 from "../assets/cube/cube2.png"
import cube3 from "../assets/cube/cube3.png"
import cube4 from "../assets/cube/cube4.png"
import cube5 from "../assets/cube/cube5.png"
import cube6 from "../assets/cube/cube6.png"
import ResultScreen from "./ResultScreen";


function PlayScreen ({healthy,poison,allPotions}) {

    const [winnerData, setWinnerData] = useState()
    const [viewResultScreen,setViewResultScreen] = useState(false)

    function battleWinner (healthy,poison) {
        let healthyPoints = (healthy.cube * 0.1 * healthy.power / healthy.mana).toFixed(2)
        let poisonPoints = (poison.cube * 0.1 * poison.power / poison.mana).toFixed(2)

        let healthyPointsString = `${(healthy.cube).toFixed(2)} * 0.1 * ${(healthy.power).toFixed(2)} / ${(healthy.mana).toFixed(2)}`
        let poisonPointsString = `${(poison.cube).toFixed(2)} * 0.1 * ${(poison.power).toFixed(2)} / ${(poison.mana).toFixed(2)}`

        if(healthyPoints>=poisonPoints){
            setWinnerData({winner : healthy, winnerCalculate : healthyPointsString, loserCalculate : poisonPointsString, winnerResult : healthyPoints, loserResult: poisonPoints})
        }else{
            setWinnerData({winner : poison, winnerCalculate : poisonPointsString, loserCalculate : healthyPointsString, winnerResult : poisonPoints, loserResult: healthyPoints})
        }
        setViewResultScreen(true)
    }

    return(
        viewResultScreen?(<ResultScreen winnerResult={winnerData} healthyPotions={healthy} poisonPotions={poison} allPotions={allPotions}/>):
        <>
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop:'200px', marginBottom:'20px'}}>
                  <div>
                    <img alt="Potion type" src={healthy.curative ? curative : nocurative} style={{height: 250}}/>
                  </div>
                  <div>
                    <img style={{height: 200}} alt="Potion cube" src={healthy.cube == 1 ? cube1 : healthy.cube === 2 ? cube2 : healthy.cube === 3 ? cube3 : healthy.cube === 4 ? cube4 : healthy.cube === 5 ? cube5 : healthy.cube === 6 ? cube6 : null} />
                  </div>
                  <div>
                    <img style={{height: 200}} alt="Potion cube" src={poison.cube === 1 ? cube1 : poison.cube === 2 ? cube2 : poison.cube === 3 ? cube3 : poison.cube === 4 ? cube4 : poison.cube === 5 ? cube5 : poison.cube === 6 ? cube6 : null} />
                  </div>
                  <div>
                    <img alt="Potion type" src={poison.curative ? curative : nocurative} style={{height: 250}}/>
                  </div>
                  
                </div>
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom:'50px'}}>
                  <div className="LittleFont">
                    <p>name: {healthy.name}</p>
                    <p>alias: {healthy.alias}</p>
                    <p>curative: {healthy.curative.toString()}</p>
                    <p>power: {healthy.power}</p>
                    <p>mana: {healthy.mana}</p>
                  </div>
                  <div className="LittleFont" >
                    <p>name: {poison.name}</p>
                    <p>alias: {poison.alias}</p>
                    <p>curative: {poison.curative.toString()}</p>
                    <p>power: {poison.power}</p>
                    <p>mana: {poison.mana}</p>
                  </div>
                </div>
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <button className= "PrincipalBoton" onClick={() => battleWinner(healthy,poison)}>Launch battle</button>
                </div>
            </>
    )
}

export default PlayScreen;