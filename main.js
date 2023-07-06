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
            this.groundMargin=40;
            this.player=new Player(this);
            this.background=new Background(this);
            this.input=new Input(this);
            this.UI=new UI(this);
            this.speed=0;
            this.maxSpeed=6;
            this.enemies=[];
            this.particles=[];
            this.collisions=[];
            this.maxParticles=50;
            this.enemyTimer=0;
            this.enemyInterval=1000;
            this.debug=false;
            this.score=0;
            this.gameColor='black';
            this.player.currentState=this.player.states[0];
            this.player.currentState.enter();
            this.maxTime=10000;
            this.gameOver=false;
            this.time=0;
            this.lives=5;
        }

    
        
        update(deltaTime){
            this.time+=deltaTime;
            if(this.time>this.maxTime)this.gameOver=true;
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
                
                    particle.update();
                    if(particle.markedForDeletion) this.particles.splice(index,1);
                })

                if(this.particles.length>this.maxParticles)
                {
                    this.particles=this.particles.slice(0,this.maxParticles);
                }

             //handle collisions sprite 

             this.collisions.forEach((collision,index)=>{
                collision.update(deltaTime);
                if(collision.markedForDeletion) this.collisions.splice(index,1);
             });



        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(object=>
                {  
                    object.draw(context);
                })
            this.UI.draw(context);

            this.particles.forEach((particle)=>
            {
                particle.draw(context);
               
            })

            console.log(this.collisions)
            this.collisions.forEach((collision)=>
            {
                collision.draw(context);
               
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
        if(!game.gameOver)requestAnimationFrame(animate);
    }

    animate(0);

   

});
