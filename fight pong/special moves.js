function generate(move){
    let special = {
        x:move.x||null,
        y:move.y||null,
        w:move.w||null,
        h:move.h||null,
        owner:null,
        dx:move.dx||null,
        dy:move.dy||null,
        state:move.state||null,
        lifespan:move.lifespan||null,
        color:move.color||null,
        onstart:move.onstart||null,
        update:move.update||null,
    }
    return special
}
blaze = new Audio()
blaze.src='Nova pasta.wav'
function play_voice(ent,num){
    if(ent.char.voice_lines){
        let aud = new Audio()
        aud.src=ent.char.voice_lines[num]
        aud.play()
    }
}

const projectile = {
    x:0,y:0,w:30,h:30,dx:0,dy:0,state:'inactive',lifespan:0,color:'blue',owner:null,name:'projectile',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        this.x=user.x
        this.y=user.y
        if(user.num==1){
            this.dx=10
        }else{
            this.dx=-10
        }
        this.owner=user
        this.owner.isSpecial=true
        console.log(`${this.owner.char.name}`)
        this.state='active'
        this.lifespan=120
        play_voice(user,0)
        let aud = new Audio()
            aud.src = 'shoot.wav'
            aud.play()
        game.processes.push(this)
    },
    update:function(game){
        this.x+=this.dx
        this.lifespan--
        let opponent
        if(this.owner.num==1){
            opponent=game.players[1]
        }
        if(this.owner.num==2){
            opponent=game.players[0]
        }
        if(this.lifespan<=100){
            this.owner.isSpecial=false
        }
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.dx*=-1
            this.state='dead'
        }
        if(game.get_collision(opponent,{x:this.x,y:this.y,width:this.w,height:this.h})){
            opponent.state='stun'
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const echo = {
    x:0,y:0,w:70,h:70,dx:0,dy:0,state:'inactive',lifespan:0,color:'green',owner:null,name:'echo',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        this.x=user.x
        this.y=user.y
        if(user.num==1){
            this.dx=2
        }else{
            this.dx=-2
        }
        this.owner=user
        this.owner.isSpecial=true
        console.log(`${this.owner.char.name}`)
        this.state='active'
        this.lifespan=400
       play_voice(user,0)
        game.processes.push(this)
    },
    update:function(game){
        this.x+=this.dx
        this.lifespan--
        if(this.lifespan<=220){
            this.owner.isSpecial=false
        }
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.dx*=-1
            game.ball.x+=this.dx*2
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const reflector = {
    x:0,y:0,w:30,h:150,dx:0,dy:0,state:'inactive',lifespan:0,color:'orange',owner:null,name:'reflector',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.x = user.x+50
            this.y = user.y-50
        }else{
            this.x = user.x-50
            this.y = user.y-50
        }
        this.owner=user
        this.owner.isSpecial=true
        this.state='active'
        this.lifespan=400
        play_voice(user,1)
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        if(this.lifespan<=220){
            this.owner.isSpecial=false
        }
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.dx*=-1
            game.ball.x+=game.ball.dx
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const teleport = {
    x:0,y:0,w:30,h:150,dx:0,dy:0,state:'inactive',lifespan:0,name:'teleport',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        user.y=game.ball.y
       
    },
    update:function(game){
        return
    }
}

const feint = {
    x:0,y:0,w:25,h:25,dx:0,dy:0,state:'inactive',lifespan:0,color:'white',owner:null,name:'feint',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        this.owner=user
        this.state='active'
        this.lifespan=100
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        if(game.get_collision(game.ball,this.owner)){
            this.x = game.ball.x
            this.y = game.ball.y
            this.dx = game.ball.dx*-1
            this.dy = game.ball.dy*-1
            setTimeout(() => { this.owner.isSpecial = false; }, 200);
            play_voice(this.owner,0)

        }
        this.x+=this.dx
        this.y+=this.dy
        if(this.y>480||this.y<0){
            this.dy*=-1
        }
        if(this.lifespan==0){
            this.state='dead'
            this.owner.isSpecial=false
        }
    }
}

const direct_shot = {
    x:0,y:0,w:25,h:25,dx:0,dy:0,state:'inactive',lifespan:0,color:'white',owner:null,name:'direct shot',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        this.owner=user
        this.state='active' 
        this.lifespan=100
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        this.y=this.owner.y
        this.x = this.owner.x
        let main=this.owner
        let timeref = null
        if(game.get_collision(game.ball,this.owner)){
            game.state = 'freezeframe'
            game.freezetimer=20
            setTimeout(() => { this.owner.isSpecial = false; }, 200);
            if(this.id==1){
                game.ball.dx = 20
                game.ball.dy = 10*main.direction
                game.ball.x+=15
            }else{
                game.ball.dx = -20
                game.ball.dy = 10*main.direction
                game.ball.x-= 15
            }
            play_voice(this.owner,1)
            let aud = new Audio()
            aud.src = 'shoot.wav'
            aud.play()
            this.state='dead'

        }
        
        if(this.lifespan==0){
            this.state='dead'
            this.owner.isSpecial=false
        }
    }
}

const shadowclones = {owner:null,name:'shadow clones',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        user.isSpecial=true
        let img = new Image()
        img.src = user.char.idle
        play_voice(user,1)
        const clone1 = {x:0,y:0,w:50,h:70,player:user,color:'white',lifespan:400,state:'active',owner:null,image:img,
            update:function(game){
                let main
                if(game.players[0]==this.player){
                    main = game.players[0]
                }else{
                    main = game.players[1]
                }
                this.x = main.x
                this.y = main.y-150
                if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
                    game.ball.dx*=-1
                }
                this.lifespan--
                if(this.lifespan<=220){
                    main.isSpecial=false
                }
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        const clone2 = {x:0,y:0,w:50,h:70,player:user,color:'white',lifespan:400,state:'active',image:img,
            update:function(game){
                let main
                if(game.players[0]==this.player){
                   main = game.players[0]
                }else{
                   main = game.players[1]
                }
                this.x = main.x
                this.y = main.y+150
                if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
                    game.ball.dx*=-1
                }
                this.lifespan--
                if(this.lifespan<=220){
                    main.isSpecial=false
                }
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        game.processes.push(clone1)
        game.processes.push(clone2)
    }
    
}

const blackhole= {
    x:0, y:0,
    w:40, h:40,
    dx:0,dy:0,
    state:'inactive',
    lifespan:0,
    owner:null,
    color:'purple',
    name:'blackhole',
    onstart(user, target, game) {
        if (user.meter < 30) {
            console.log('not enough meter');
            return;
        }
        user.meter -= 30;

        this.owner = user;
        this.lifespan = 90;
        this.state = 'active';
        // Position well slightly in front of player
        if (user.num === 1) {
            this.x = user.x + 20;
            this.dx=10
        } else {
            this.x = user.x - 20;
            this.dx=-10
        }
        this.y = user.y;

        // Brief special state window for visuals / FX
        user.isSpecial = true;
        setTimeout(() => { user.isSpecial = false; }, 200);
        play_voice(user,0)
        let aud = new Audio()
        aud.src = 'blackhole.wav'
        aud.play()
        
        // Register instance
        game.processes.push(this);
    },

    update(game) {
        if (this.state !== 'active') return;

        this.lifespan--;
        let pullStrength=0.2
        const ball = game.ball;
        this.x+=this.dx
        // Calculate pull vector toward the well center
        let dx = (this.x + this.w/2) - (ball.x + ball.width/2);
        let dy = (this.y + this.h/2) - (ball.y + ball.height/2);

        // Apply small pull
        ball.dx += dx * pullStrength * 0.01;
        ball.dy += dy * pullStrength * 0.01;

        // Optional: clamp vertical to avoid crazy speeds
        if (ball.dy > 12) ball.dy = 12;
        if (ball.dy < -12) ball.dy = -12;

        if (this.lifespan <= 0) {
            this.state = 'dead';
        }
    }
};

const magnetism= {
    x:0, y:0,
    w:40, h:40,
    dx:0,dy:0,
    state:'inactive',
    lifespan:0,
    owner:null,
    color:'purple',
    name:'magnetism',
    onstart(user, target, game) {
        if (user.meter < 30) {
            console.log('not enough meter');
            return;
        }
        user.meter -= 30;

        this.owner = user;
        this.lifespan = 90;
        this.state = 'active';
        // Position well slightly in front of player
        if (user.num === 1) {
            this.x = user.x + 20;
            this.dx=10
        } else {
            this.x = user.x - 20;
            this.dx=-10
        }
        this.y = user.y;

        // Brief special state window for visuals / FX
        user.isSpecial = true;
        setTimeout(() => { user.isSpecial = false; }, 200);
        play_voice(user,0)
        let aud = new Audio()
        aud.src = 'blackhole.wav'
        aud.play()
        
        // Register instance
        game.processes.push(this);
    },

    update(game) {
        if (this.state !== 'active') return;

        this.lifespan--;
        let pullStrength=0.2
        const ball = game.ball;
        this.x=this.owner.x
        this.y=this.owner.y
        // Calculate pull vector toward the well center
        let dx = (this.x + this.w/2) - (ball.x + ball.width/2);
        let dy = (this.y + this.h/2) - (ball.y + ball.height/2);

        // Apply small pull
        ball.dx += dx * pullStrength * 0.01;
        ball.dy += dy * pullStrength * 0.01;

        // Optional: clamp vertical to avoid crazy speeds
        if (ball.dy > 6) ball.dy = 6;
        if (ball.dy < -6) ball.dy = -6;
        if (ball.dx > 6) ball.dy = 6;
        if (ball.dx < -6) ball.dy = -6;

        if (this.lifespan <= 0) {
            this.state = 'dead';
        }
    }
};

const curve= {
    x:0, y:0,
    w:40, h:40,
    dx:0,dy:0,
    state:'inactive',
    lifespan:0,
    owner:null,
    color:'orange',
    name:'curve',
    onstart(user, target, game) {
        if (user.meter < 30) {
            console.log('not enough meter');
            return;
        }
        user.meter -= 30;

        this.owner = user;
        this.lifespan = 90;
        this.state = 'active';

        // Brief special state window for visuals / FX
        user.isSpecial = true;
        setTimeout(() => { user.isSpecial = false; }, 200);
        play_voice(user,1)
        // Register instance
        game.processes.push(this);
    },

    update(game) {
        if (this.state !== 'active') return;
        this.lifespan--;
        this.x = this.owner.x
        this.y = this.owner.y
        game.ball.dy+=(this.owner.y-240)*0.01
        if(game.ball.dy>6){
            game.ball.dy=6
        }
         if(game.ball.dy<-6){
            game.ball.dy=-6
        }
        if(game.ball.y<=0||game.ball.y>=480){
            this.state='dead'
        }
        if (this.lifespan <= 0) {
            this.state = 'dead';
        }
    }
};

const portal = {
    x:0,y:0,w:30,h:90,dx:0,dy:0,state:'inactive',lifespan:0,color:'yellow',owner:null,name:'portal',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.x = user.x+350
            this.y = user.y-50
        }else{
            this.x = user.x-350
            this.y = user.y-50
        }
        this.owner=user
        this.owner.isSpecial=true
        this.dy=4
        this.state='active'
        this.lifespan=400
        play_voice(user,1)
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        this.y+=this.dy
        if(this.y<0||this.y>480-this.h){
            this.dy*=-1
            this.y+=this.dy
        }
        if(this.lifespan<=220){
            this.owner.isSpecial=false
        }
        if(game.get_collision(game.ball,this.owner)){
            game.ball.x=this.x
            game.ball.y=this.y
            game.ball.dx*=-1
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const happy_chaos = {owner:null,name:'happy chaos',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        user.isSpecial=true
        let img = new Image()
        img.src = user.char.idle
        let velx
        if(user.num==1){
            velx=4
        }else{
            velx=-4
        }
        play_voice(user,1)
        const ball1 = {x:user.x,y:user.y,w:25,h:25,player:user,color:'yellow',lifespan:400,state:'active',owner:null,dx:velx,dy:4,
            update:function(game){
                this.x+=this.dx
                this.y+=this.dy
                if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
                    game.ball.dx*=-1
                }
                if(this.x<0||this.x>720){
                    this.dx*=-1
                }
                if(this.y<0||this.y>480){
                    this.dy*=-1
                }
                this.lifespan--
                if(this.lifespan<=220){
                    this.player.isSpecial=false
                }
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        const ball2 = {x:user.x,y:user.y,w:25,h:25,player:user,color:'red',lifespan:400,state:'active',owner:null,dx:velx,dy:-4,
            update:function(game){
                this.x+=this.dx
                this.y+=this.dy
                if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
                    game.ball.dx*=-1
                }
                if(this.x<0||this.x>720){
                    this.dx*=-1
                }
                if(this.y<0||this.y>480){
                    this.dy*=-1
                }
                this.lifespan--
                if(this.lifespan<=220){
                    this.player.isSpecial=false
                }
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        game.processes.push(ball1)
        game.processes.push(ball2)
    }
    
}


//ultimate moves

const super_shot = {owner:null,
    onstart:function(user,opponent,game){
        if(user.isultimate==false){
            if(user.meter==90){
                user.meter-=90
                user.isultimate=true
                this.owner=user
                game.processes.push(this);
                blaze.play()
            }else{
                console.log('not enough meter')
                return
            }
            
            return
        }
        
    },
    update:function(game){
        if(game.get_collision(game.ball,this.owner)&&this.owner.isultimate==true){
            game.ball.state = 'super'
            game.ball.width = 100
            game.ball.height = 100
            if(this.owner.num == 1){
                game.ball.dx = 20
            }else{
                game.ball.dx = -20
            }
            game.ball.dy=0
            this.owner.isultimate=false
            game.state = 'freezeframe'
            game.freezetimer=20
            let blast = new Audio()
            blast.src = 'blast.wav'
            blast.play()
            play_voice(this.owner,2)
        }
    }
}

const great_wall = {
    x:0,y:0,w:40,h:600,dx:0,dy:0,state:'inactive',lifespan:0,color:'orange',owner:null,
    onstart:function(user,target,game){
        if(user.meter==90){
            user.meter-=90
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.x = user.x+50
            this.dx=1
        }else{
            this.x = user.x-50
            this.dx=-1
        }
        this.y=-10
        this.owner=user
        user.isSpecial = true;
        setTimeout(() => { user.isSpecial = false; }, 200);
        this.state='active'
        this.lifespan=300
        game.state = 'freezeframe'
        game.freezetimer=20
        game.processes.push(this)
        play_voice(user,2)
        blaze.play()
       
    },
    update:function(game){
        this.lifespan--
        this.x+=this.dx
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            if (game.ball.x < this.x) {
                game.ball.x = this.x - game.ball.width;       // push ball left
            } else {
                game.ball.x = this.x + this.w;           // push ball right
            }

            if(game.ball.state=='super'){
                this.state='dead'
            }
            game.ball.dx*=-1.5
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}
let moves = [projectile,echo,reflector,direct_shot,curve,magnetism,portal,shadowclones,happy_chaos,feint,teleport,blackhole]