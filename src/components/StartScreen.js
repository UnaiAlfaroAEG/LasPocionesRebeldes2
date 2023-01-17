import React,{useState} from "react";
import axios from "axios";
import PlayScreen from "./PlayScreen";


function StartScreen(){


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

    const enterButtonClick = () =>{
        axios({
            method: 'get',
            url: `https://gist.githubusercontent.com/Oskar-Dam/ad2c96601e79ad108227bc25f90e4e53/raw/25dc0198b2aaa85f0b5583978a0c6772cab63aba/Potions.js`,
          })
          .then(response => {
            distributionHealthyPoisonPotions(response.data)
            setViewPlayScreen(true)
          })
          .catch(error => {
            alert(error)
          });
    }

    return(

        viewPlayScreen ? (<PlayScreen healthy={healthyPotion} poison={poisonPotion}/>): 
        (
        <div className="InitialContainer">
            <div className="SecondayContainer">
                <p className= "PrincipalP">LAS PÓCIMAS REBELDES</p>
                <button className= "PrincipalBoton" onClick={enterButtonClick}>ENTER</button>
            </div>
        </div>)
    )
}

export default StartScreen;