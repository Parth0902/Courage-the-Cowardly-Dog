import { DUST,Fire ,Flash} from "./particles.js";

const states={
    sitting:0,
    running:1,
    jumping:2,
    falling:3,
    rolling:4,
    diving:5,
    hit:6
}

class State{
    constructor(state,game)
    {
        this.state=state;
        this.game=game;
    }
}

export class Sitting extends State{
    constructor(game)
    {
        super('SITTING',game);
       
    }
    enter()
    {
        this.game.player.frameX=0;
        this.game.player.frameY=5;
        this.game.player.maxFrame=4;

    }

    handleInput(input)
    {
        if(input.includes('ArrowLeft') || input.includes('ArrowRight'))
        {
            this.game.player.setState(states.running,1);
        }
        if(input.includes('Enter')){
            this.game.player.setState(states.rolling,2)
        }

    }
}

export class Running extends State{
    constructor(game)
    {
        super('RUNNING',game);
     
    }
    enter()
    {
        this.game.player.frameX=0;
        this.game.player.frameY=3;
        this.game.player.maxFrame=8;

    }

    handleInput(input)
    {
        this.game.particles.unshift(new DUST(this.game,this.game.player.x+this.game.player.width*0.6,this.game.player.y+this.game.player.height));
        if(input.includes('ArrowDown'))
        {
            this.game.player.setState(states.sitting,0);
        }
        else if(input.includes('ArrowUp'))
        {
            this.game.player.setState(states.jumping,1)
        }
        if(input.includes('Enter')){
            this.game.player.setState(states.rolling,2)
        }


    }
}

export class Jumping extends State{
    constructor(game)
    {
        super('JUMPING',game);
      
    }
    enter()
    {
        if(this.game.player.onGround()) this.game.player.vy-=25;
        this.game.player.frameX=0;
        this.game.player.frameY=1;
        this.game.player.maxFrame=6;


    }

    handleInput(input)
    {
        if(this.game.player.vy>this.game.player.weight)
        {
            this.game.player.setState(states.falling,1);
        }
        else if(input.includes('Enter')){
            this.game.player.setState(states.rolling,2)
        }else if(input.includes('ArrowDown')){
            this.game.player.setState(states.diving,0)
        }


    }
}

export class Falling extends State{
    constructor(game)
    {
        super('FALLING',game);
       
    }
    enter()
    {
        this.game.player.frameX=0;
        this.game.player.frameY=2;
        this.game.player.maxFrame=6;
        

    }

    handleInput(input)
    {
        if(this.game.player.onGround())
        {
            this.game.player.setState(states.running,1);
        }else if(input.includes('ArrowDown')){
            this.game.player.setState(states.diving,0)
        }


    }
}


export class Rolling extends State{
    constructor(game)
    {
        super('ROLLING',game);
   
    }
    enter()
    {
        this.game.player.frameX=0;
        this.game.player.frameY=6;
        this.game.player.maxFrame=6;
    }

    handleInput(input)
    {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x+this.game.player.width*0.5,this.game.player.y+this.game.player.height*0.5));
        if(!input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.running,1);
        }else if(!input.includes('Enter') && !this.game.player.onGround())
        {
            this.game.player.setState(states.falling,1);
        }
        else if(input.includes('Enter')&& input.includes('ArrowUp')&& this.game.player.onGround())
        {
            this.game.player.vy-=27;
        }else if(input.includes('ArrowDown')){
            this.game.player.setState(states.diving,0)
        }


    }
}


export class Diving extends State{
    constructor(game)
    {
        super('DIVING',game);
   
    }
    enter()
    {
        this.game.player.frameX=0;
        this.game.player.frameY=6;
        this.game.player.maxFrame=6;
        this.game.player.vy=15;
    }

    handleInput(input)
    {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x+this.game.player.width*0.5,this.game.player.y+this.game.player.height*0.5));
        if(this.game.player.onGround()){
            this.game.player.setState(states.running,1);
            for(let i=0;i<30;i++){
                this.game.particles.unshift(new Flash(this.game,this.game.player.x,this.game.player.y));
            };
        }else if(!input.includes('Enter') && this.game.player.onGround())
        {
            this.game.player.setState(states.rolling,2);
        }
   

    }
}