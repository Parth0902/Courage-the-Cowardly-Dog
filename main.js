import { Player } from "./player.js";
import { Input } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy,GroundEnemy,ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";
window.addEventListener('load',()=>
{
    const canvas=document.getElementById('canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=500;
    canvas.height=500;

    
    class Game{

        constructor(width,height)
        {
            this.width=width;
            this.height=height;
            this.groundMargin=80;
            this.player=new Player(this);
            this.background=new Background(this);
            this.input=new Input(this);
            this.UI=new UI(this);
            this.speed=0;
            this.maxSpeed=6;
            this.enemies=[];
            this.particles=[];
            this.maxParticles=50;
            this.enemyTimer=0;
            this.enemyInterval=1000;
            this.debug=true;
            this.score=0;
            this.gameColor='black';
            this.player.currentState=this.player.states[0];
            this.player.currentState.enter();
       
        }

    
        
        update(deltaTime){
            this.background.update()
            this.player.update(this.input.keys,deltaTime);
            
            //HandleEnemies
            if(this.enemyTimer>this.enemyInterval){
                this.addEnemy();
                this.enemyTimer=0
            }
            else{
                 this.enemyTimer+=deltaTime;
            }
            
            this.enemies.forEach(object=>
                {
                    object.update(deltaTime);
                    if(object.markedForDeletion) this.enemies.splice(this.enemies.indexOf(object),1);
                })
            
             //handle Particles
              this.particles.forEach((particle,index)=>
                {
                    // console.log(particle);
                    particle.update();
                    if(particle.markedForDeletion) this.particles.splice(index,1);
                })

                if(this.particles.length>this.maxParticles)
                {
                    this.particles=this.particles.slice(0,this.maxParticles);
                }


        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(object=>
                {  
                    object.draw(context);
                })
            this.UI.draw(context);

            this.particles.forEach((particle,index)=>
            {
                particle.draw(context);
               
            })
        }

        addEnemy(){
            if(this.speed>0 && Math.random()<0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed>0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            
        }
    }

    const game=new Game(canvas.width,canvas.height);
    let lastTime=0; 
    const animate=(timeStamp)=>
    {
        let deltaTime=timeStamp-lastTime;
        lastTime=timeStamp
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);

   

});
