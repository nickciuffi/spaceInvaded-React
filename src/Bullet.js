import React from 'react'



export default function Bullet({x, destroyBullet, id, checkCollisionBullet}) {

        setInterval(() =>{
            
            detectDeystroyNeed()
            checkCollisionBullet(id)
        },50)

        function detectDeystroyNeed(){
            //trocar por valor string aleatorio
         let bullet = document.getElementById(id);
         if(!bullet) return
         if(parseInt(bullet.style.top.split("px")[0]) <= -400){
            destroyBullet(id)
         }
        }

        

       

  return (
    <div id={id} className={`bullet`} style={{left:`${x}%`, top:-5}}></div>
  )
}
