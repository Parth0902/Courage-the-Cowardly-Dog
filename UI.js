export class UI{
    constructor(game)
    {
        this.game=game;
        this.fontsize=30;
        this.fontFamily='Creepster';
        this.fontColor='black';
        this.lifeImage=document.getElementById('heart');
    }

    draw(context){
        context.save();
        context.shadowOffsetX=2;
        context.shadowOffsetY=2;
        context.shadowColor='white';
        context.shadowBlur=0;
        context.font = this.fontsize+'px '+ this.fontFamily;
        context.textAlign='left';
        context.fillStyle=this.fontColor;

        context.fillText('score: '+this.game.score,20,50);

        context.font=this.fontsize *.8 + 'px '+ this.fontFamily;
        context.fillText('Time: '+(this.game.time*0.001).toFixed(1),20,80);
        for(let i=0;i<this.game.lives;i++)
        {
            context.drawImage(this.lifeImage ,25*i+20,95,22,22)
        }

        if(this.game.gameOver){
            context.textAlign='center';
            context.font=this.fontsize*2+ 'px '+ this.fontFamily;

            if(this.game.score>this.game.winningScore)
            {
                context.fillText("Mission completed",this.game.width* 0.5,this.game.height*0.5-20);
                context.font= this.fontsize* 0.7+ 'px '+this.fontFamily;
                context.fillText("Nice!! you have completed this mission",this.game.width* 0.5,this.game.height*0.5 +20);
                document.getElementById('reload-btn').classList.toggle('abc');

            }else
            {
                context.fillText("Mission failed",this.game.width* 0.5,this.game.height*0.5-20);
                context.font= this.fontsize* 0.7+ 'px '+this.fontFamily;
                context.fillText("Better Luck next time",this.game.width* 0.5,this.game.height*0.5 +20);
               
            }
        }
        context.restore();
    }
}