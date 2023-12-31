class Particle{
    constructor(game){
        this.game=game;
        this.markedForDeletion=false;
    }
    update()
    {
        this.x -=this.speedX+ this.game.speed;
        this.y -= this.speedY;
        this.size *=0.97;
        if(this.size <0.5) this.markedForDeletion=true;
    }
}

export class DUST extends Particle{
    constructor(game,x,y){
        super(game);
        this.size=Math.random()* 10 +10;
        this.x=x;
        this.y=y;
        this.speedX=Math.random();
        this.speedY=Math.random();
        this.color='rgb(0,0,0,0.3)'
      
    };

    draw(context)
    {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI*2);
        context.fillStyle=this.color;
        context.fill();  

    }
    
}

export class Flash extends Particle{

    constructor(game,x,y)
    {
        super(game);
        this.game=game;
        this.size=Math.random()*100+30;
        this.x=x;
        this.y=y;
        this.speedX=Math.random()*6-4;
        this.speedY=Math.random()*2+1;
        this.gravity=0;
        this.image=document.getElementById('fire');
    }

    update()
    {
        super.update();
        this.gravity+=0.1;
        this.y+=this.gravity;
    }
    draw(context)
    {
        context.drawImage(this.image,this.x,this.y,this.size,this.size);

    }
}

export class Fire extends Particle{

    constructor(game,x,y)
    {
        super();
        this.game=game;
        this.image=document.getElementById('fire');
        this.size=Math.random()*100+50;
        this.speedX=1;
        this.speedY=1;
        this.x=x;
        this.y=y;
        this.angle=0;
        this.va=Math.random()*0.2-0.1;
    }

    update()
    {
        super.update();
        this.angle+=this.va;
    }
    draw(context)
    {
      context.save();
      context.translate(this.x,this.y);
      context.rotate(this.angle);
      context.drawImage(this.image,-this.size*0.5,-this.size*0.5,this.size,this.size);
      context.restore();
    }
}