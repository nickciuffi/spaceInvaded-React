import React from 'react'
import Player from './Player'
import Enemy from './Enemy'
import {useState, useEffect} from 'react'
import useEventListener from '@use-it/event-listener'
import Bullet from './Bullet'
import { v4 as uuidv4 } from 'uuid';

export default function Screen() {

    const [leftPlayer, setLeftPlayer] = useState(30)
    const [enemies, setEnemies] = useState([{key:0, life:4}])
    const [bullets, setBullets] = useState([])
    

    useEffect(generateEnemies ,[])

    setInterval(() =>{
        if(bullets.length>0){
        moveBullet()
        }
    }, 20)


    function moveBullet(){
        var bullets = document.querySelectorAll(".bullet");
       
        for(let i = 0; i < bullets.length; i++){
            let yAtual = parseInt(bullets[i].style.top.split("px")[0]);
            bullets[i].style.top =  `${yAtual-1}px`;
        }
      
        }

    function destroyBullet(key){
        var newBullets = bullets
        for(let i = 0; i<newBullets.length; i++){
            if(newBullets[i].key === key){
                newBullets.splice(i, 1)
                
            }
        }
        /*
        let bulDest = newBullets.find(bullet => bullet.key === key)
        
        bulDest ={key:null, x:null}
        console.log(bullets[0])
        */
    }


   
    function generateEnemies(){
        let newEnemies = [];
       for(let i = 0; i<32; i++){
           newEnemies.push({
               key:i,
               life:4

           })
           setEnemies(newEnemies)

       }
    }

    function checkCollisionBullet(key){
        let bullet =  document.getElementById(key);
        for(let i = 0; i<enemies.length; i++){
            let enemy = document.getElementById(enemies[i].key)
            isCollapsed(bullet, enemy)
        }
    }

  
    function isCollapsed(obj1, obj2){
        let x1 = parseInt(obj1.style.left.split("%")[0])
        let x2 = obj2.id
        while(x2>7){
            x2 = x2-8
        }
       x2 = x2*11.25
       console.log(x1)
      }
      function checkCollisions(x1, y1, w1, h1, x2, y2, w2, h2){
        if (x1 + w1 >= x2 && x1 + w1 <= x2 + w2 && y1 + h1 >= y2 && y1 + h1 <= y2 + h2) {
            return true;
        } else if (x1 >= x2 && x1 <= x2 + w2 && y1 >= y2 && y1 <= y2 + h2) {
            return true;
        } else {
            return false;
        }
    }
   
    useEventListener('keydown', (event) =>{
        if(event.key === 'ArrowRight' || event.key ==='d'){
           if(leftPlayer>=90) return
            setLeftPlayer(leftPlayer+1)
           
        }
        else if(event.key === 'ArrowLeft' || event.key ==='a'){
           if(leftPlayer<=0) return
            setLeftPlayer(leftPlayer-1)

            }
        if(event.key === 'q'){
           setBullets([...bullets, {key:uuidv4().substring(0, 5), x:leftPlayer+5}])
        }
    });

  return (
    <div id='screen' className='screen'>
        <div className='enemyBox'>

        {
        enemies.map(enemy =>{
            return <Enemy info={enemy} key={enemy.key} />
        })}
        </div>
        <div className='playerBox'> 
       {
           bullets.map(bullet =>{
               if(bullets.length > 0){
                   
               return <Bullet checkCollisionBullet={checkCollisionBullet} destroyBullet={destroyBullet} id={bullet.key} x={bullet.x} />}
           })
       }
        <Player left={`${leftPlayer}%`} />
        </div>
    </div>
  )
}
