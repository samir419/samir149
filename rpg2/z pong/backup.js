 class Player{
    constructor(num){
        this.num = num
        this.x = 0
        this.y = 0
        this.width=50
        this.height=50
        this.dy = 0
        this.state = 'idle'
        this.upper_hitbox = new Hitbox(this.x,this.y,this.width,this.height/2)
        this.lower_hitbox = new Hitbox(this.x,this.y+this.height/2,this.width,this.height/2)
        this.parry_counter = 0
        this.frame_counter = 0
        this.dash_velocity = 0
        this.dash_direction = 0
        this.meter = 0
        this.special_moves = []
        this.cpu_buffer=0
        this.health=100
        this.isultimate = false
        this.ultimatemove
        this.direction=0
        this.img = new Image()
        if(this.num==1){
            this.img.src = 'game assets/player.png'
        }else{
            this.img.src = 'game assets/player2.png'
        }
    }
    update(){
        if(this.meter>90){
            this.meter=90
        }
        if(this.state=='parry'){
            this.parry_counter--
            if(this.parry_counter==0){
                this.state='idle'
            }
            return
        }
        if(this.state=='dash'){
            this.dy=this.dash_velocity
            this.dash_velocity-=1*-this.dash_direction
            this.frame_counter--
            if(this.frame_counter==0){
                this.dy=0
                this.state='idle'
            }
        }
        this.y+=this.dy
        this.upper_hitbox.update(this)
        this.lower_hitbox.update(this)
    }
    parry(){
        this.state='parry'
        this.parry_counter=20
    }
    dash(num){
        this.dash_direction=num
        this.state='dash'
        this.dash_velocity=15*this.dash_direction
        this.frame_counter = 10
    }
    cpu(self, opponent, game) {
        // Reduce CPU buffer for more responsive gameplay
        if (this.cpu_buffer > 0) {
            this.cpu_buffer--;
            return;
        }

        const ball = game.ball;
        const screenCenter = 720 / 2;
        const defensiveZone = screenCenter * 0.7; // 70% of screen is defensive territory
        
        // Smart vertical tracking with prediction
        if (ball.dy !== 0) {
            const predictedY = ball.y + (ball.dy * 5); // Predict ball position 5 frames ahead
            const targetY = this.y + (predictedY - this.y) * 0.1; // Smooth tracking
            this.dy = Math.max(-5, Math.min(5, (targetY - this.y)));
        } else {
            this.dy *= 0.9; // Smooth deceleration
        }

        // Strategic decision making based on game state
        const ballComingTowardCPU = ball.dx < 0;
        const ballInDefensiveZone = ball.x < defensiveZone;
        const distanceToBall = Math.abs(ball.y - this.y);
        const isBallCloseVertically = distanceToBall < 100;
        const isBallAligned = Math.abs(ball.x - this.x) < 150;

        // Defensive behavior - parry when ball is close and aligned
        if (ball.x==this.x-50) {
            const parryChance = this.calculateParryChance(ball, opponent);
            if (Math.random() < parryChance) {
                this.parry();
                this.cpu_buffer = 8;
                return;
            }
        }

       
        const specialMoveChance = this.calculateSpecialMoveChance(game,opponent);
        
        // Defensive special move (index 0)
        if (Math.random() < specialMoveChance * 0.3 && this.isGoodDefensivePosition(ball)) {
            this.special_moves[0].onstart(this, opponent, game);
            this.cpu_buffer = 15;
            return;
        }
        
        // Offensive special move (index 1) - use when ball is in good position
        if (Math.random() < specialMoveChance * 0.2 && ball.x > screenCenter && !ballInDefensiveZone) {
            this.special_moves[Math.floor(Math.random()*6)].onstart(this, opponent, game);
            this.cpu_buffer = 15;
            return;
        }
        if(this.meter>=90){
            let ultimove = self.ultimatemove
            ultimove.onstart(self,opponent,game)
        }

        // Adaptive difficulty based on score difference
        const scoreDiff = this.meter - opponent.meter;
        const adaptiveBuffer = Math.max(5, 12 - Math.abs(scoreDiff) * 0.5);
        
        this.cpu_buffer = adaptiveBuffer;
    }

    // Helper method to calculate dynamic parry chance
    calculateParryChance(ball, opponent) {
        let baseChance = 0.4;
        
        // Increase parry chance when losing
        if (this.score < opponent.score) {
            baseChance += 0.2;
        }
        
        // Reduce parry chance for very fast balls (harder to time)
        const ballSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
        if (ballSpeed > 10) {
            baseChance -= 0.15;
        }
        
        // Increase parry chance when ball is perfectly aligned
        const verticalAlignment = 1 - (Math.abs(ball.y - this.y) / 120);
        baseChance += verticalAlignment * 0.2;
        
        return Math.max(0.1, Math.min(0.8, baseChance));
    }

    // Helper method to calculate special move usage chance
    calculateSpecialMoveChance(game,opponent) {
        let baseChance = 0.08; // 8% base chance
        
        // Increase chance when behind in score
        if (this.meter < opponent.meter) {
            baseChance += 0.05;
        }
        
        // Reduce chance when special moves are on cooldown (if applicable)
        if (this.meter<30) {
            baseChance *= 0.3;
        }
        
        return Math.min(0.25, baseChance); // Cap at 25%
    }

    // Helper method to determine if in good defensive position
    isGoodDefensivePosition(ball) {
        const verticalDistance = Math.abs(ball.y - this.y);
        const horizontalDistance = Math.abs(ball.x - this.x);
        
        return verticalDistance < 80 && horizontalDistance < 150;
    }
    get_image(){
        
        return this.img;
    }
}
class Hitbox{
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.offset_x = x
        this.offset_y = y
        this.width=width
        this.height=height
    }
    update(user){
        this.x = user.x+this.offset_x
        this.y = user.y+this.offset_y
    }
}
class Ball{
    constructor(){
        this.x = 0
        this.y = 0
        this.width=25
        this.height=25
        this.dx = 0
        this.dy = 0
        this.state='normal'
    }
    update(){
        this.x+=this.dx
        this.y+=this.dy
    }
}
const projectile = {
    x:0,y:0,w:30,h:30,dx:0,dy:0,state:'inactive',lifespan:0,color:'blue',
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
        
        this.state='active'
        this.lifespan=120
        game.processes.push(this)
    },
    update:function(game){
        this.x+=this.dx
        this.lifespan--
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.dx*=-1
            this.state='dead'
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const reflector = {
    x:0,y:0,w:30,h:150,dx:0,dy:0,state:'inactive',lifespan:0,color:'orange',
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
        
        this.state='active'
        this.lifespan=250
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        if(game.get_collision(game.ball,{x:this.x,y:this.y,width:this.w,height:this.h})){
            game.ball.dx*=-1
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const teleport = {
    x:0,y:0,w:30,h:150,dx:0,dy:0,state:'inactive',lifespan:0,
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
    x:0,y:0,w:25,h:25,dx:0,dy:0,state:'inactive',lifespan:0,id:0,color:'white',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.id=1
            
        }else{
            this.id = 2
            
        }
        this.state='active'
        this.lifespan=250
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        let main
        if(this.id==1){
           main = game.players[0]
        }else{
            main = game.players[1]
        }
        if(game.get_collision(game.ball,main)){
            this.x = game.ball.x
            this.y = game.ball.y
            this.dx = game.ball.dx*-1
            this.dy = game.ball.dy*-1

        }
        this.x+=this.dx
        this.y+=this.dy
        if(this.y>480||this.y<0){
            this.dy*=-1
        }
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const direct_shot = {
    x:0,y:0,w:25,h:25,dx:0,dy:0,state:'inactive',lifespan:0,id:0,color:'white',
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        if(user.num==1){
            this.id=1
            
        }else{
            this.id = 2
            
        }
        this.state='active'
        this.lifespan=250
        game.processes.push(this)
       
    },
    update:function(game){
        this.lifespan--
        let main
        if(this.id==1){
           main = game.players[0]
        }else{
            main = game.players[1]
        }
        if(game.get_collision(game.ball,main)){
            game.state = 'freezeframe'
            game.freezetimer=20
            if(this.id==1){
                game.ball.dx = 20
                game.ball.dy = 10*main.direction
                game.ball.x+=15
            }else{
                game.ball.dx = -20
                game.ball.dy = 10*main.direction
                game.ball.x-= 15
            }
            this.state='dead'

        }
        
        if(this.lifespan==0){
            this.state='dead'
        }
    }
}

const shadowclones = {
    onstart:function(user,target,game){
        if(user.meter>30){
            user.meter-=30
        }else{
            console.log('not enough meter')
            return
        }
        const clone1 = {x:0,y:0,w:50,h:50,player:user,color:'white',lifespan:250,state:'active',
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
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        const clone2 = {x:0,y:0,w:50,h:50,player:user,color:'white',lifespan:250,state:'active',
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
                if(this.lifespan==0){
                    this.state='dead'
                }
            }
        }
        game.processes.push(clone1)
        game.processes.push(clone2)
    }
    
}
//ultimate moves

const super_shot = {
    onstart:function(user,opponent,game){
        if(user.isultimate==false){
            if(user.meter==90){
                user.meter-=90
            }else{
                console.log('not enough meter')
                return
            }
            user.isultimate=true
            return
        }
        game.ball.state = 'super'
        game.ball.width = 100
        game.ball.height = 100
        if(user.num == 1){
            game.ball.dx = 20
        }else{
            game.ball.dx = -20
        }
        game.ball.dy=0
        user.isultimate=false
        game.state = 'freezeframe'
        game.freezetimer=20
        
        
    },
    update:function(){

    }
}
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 720
canvas.height = 480
score_point = new Audio()
score_point.src = 'game assets/game-start-317318.mp3'
music = new Audio()
music.loop=true
music.src = 'game assets/game-music-loop-6-144641.mp3'
class Game{
    constructor(){
        this.players =[
            new Player(1),
            new Player(2)
        ]
        //this.players[0].special_moves = [projectile,direct_shot]
        this.players[0].ultimatemove=super_shot
        this.players[1].special_moves = [feint,reflector,projectile,teleport,direct_shot,shadowclones]
        this.players[1].ultimatemove=super_shot
        this.players[1].img.src = current_char.ent.pong_sprite
        this.ball = new Ball()
        this.state = 'wait'
        this.input_buffer=0
        this.input_buffer2=0
        this.freezetimer=0
        this.processes = []

        this.background = new Image()
        this.background.src = 'game assets/arena.png'
        this.meterbar = new Image()
        this.meterbar.src = 'game assets/meter bar.png'
        ctx.drawImage(this.background,0,0, canvas.width, canvas.height);
        
    }
    start(){
        this.reset()
        this.ball.dx=5
        this.ball.dy=5
        this.state='running'
        music.play()
        this.update()
    }
    reset(){
        this.players[0].x = 0
        this.players[0].y = 240
        this.players[0].meter = 0
        this.players[0].health = 100
        this.players[1].x = 670
        this.players[1].y = 240
        this.players[1].meter = 0
        this.players[1].health = 100
        this.ball.x = canvas.width/2
        this.ball.y = canvas.height/2
    }
    handle_freeze_frame(){
        this.freezetimer--
        if(this.freezetimer==0){
            if(this.players[0].health<=0||this.players[1].health<=0){
                this.reset()
            }
            this.state='running'
        }
    }
    get_collision(a,b){
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }
    handle_input(key){
        if(this.input_buffer>0){
            return
        }
        if(key=='p'){
            if(this.state=='pause'){
                this.state = 'running'
                music.play()
            }else{
                this.state = 'pause'
                music.pause()
            }
        }
        if(key=='f'){
            this.state = 'freezeframe'
            this.freezetimer=20
        }
        if(key=='d'){
            this.players[0].direction=0
            this.players[0].parry()
        }
        if(key=='q'){
            this.players[0].dash(-1)
        }
        if(key=='e'){
            this.players[0].dash(1)
        }
        if(key=='j'){
            let move = this.players[0].special_moves[0] 
            move.onstart(this.players[0],this.players[1],this)
        }
        if(key=='k'){
            let move = this.players[0].special_moves[1] 
            move.onstart(this.players[0],this.players[1],this)
        }
            if(key=='l'){
            let move = this.players[0].ultimatemove
            move.onstart(this.players[0],this.players[1],this)
        }
        this.input_buffer=10
    }
    render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle='black'
        ctx.drawImage(this.background,0,0, canvas.width, canvas.height);
        
        this.processes.forEach(p=>{
            ctx.fillStyle=p.color
            ctx.fillRect(p.x,p.y,p.w,p.h)
        })
        ctx.fillStyle='white'
        ctx.fillRect(this.ball.x,this.ball.y,this.ball.width,this.ball.height)
        this.players.forEach(function(player,index){
            if(player.isultimate==true){
                ctx.fillStyle='orange'
                ctx.fillRect(player.x-25,player.y-25,player.width+50,player.height+50)
            }
            if(player.state=='parry'){
                    ctx.fillStyle='green'
                ctx.fillRect(player.x-25,player.y-25,player.width+50,player.height+50)
                
            }
            
            ctx.strokeRect(player.x,player.y,player.width,player.height)

            ctx.drawImage(player.get_image(),player.x-35,player.y-35)
        })
        ctx.fillStyle='yellow'
        
        ctx.fillRect(0,460,this.players[0].meter,20)
        ctx.fillRect(canvas.width-90,460,this.players[1].meter,20)
        ctx.drawImage(this.meterbar,0,460)
        ctx.drawImage(this.meterbar,canvas.width-90,460)
        ctx.fillStyle='red'
        ctx.fillRect(0,0,this.players[0].health,20)
        ctx.fillRect(720-100,0,this.players[1].health,20)
    }
    update(){
        if(this.state=='running'){
            this.players[0].update()
            
            this.players[1].update()
            this.ball.update()
            this.players[1].cpu(this.players[1],this.players[0],this)

            this.processes.forEach((process,index)=>{
                process.update(this)
                if(process.state=='dead'){
                    this.processes.pop(index)
                }
            })
                
            this.players.forEach((player,index)=>{
                if(this.get_collision(this.ball,player)){
                    if(player.isultimate==true){
                        let ultimove = player.ultimatemove
                        if(player==this.players[0]){
                                ultimove.onstart(this.players[0],this.players[1],this)
                        }else{
                            ultimove.onstart(this.players[1],this.players[0],this)
                        }
                        
                    }
                    if(this.ball.state=='normal'){
                        this.ball.dx*=-1
                        player.meter+=10
                    
                        if(this.get_collision(this.ball,player.upper_hitbox)){
                            if(this.ball.dy>0){
                                this.ball.dy*=-1
                                this.ball.dy-=player.dy*0.2
                            }
                            if(this.ball.dy==0){
                                this.ball.dy = -5
                            }
                        }
                        if(this.get_collision(this.ball,player.lower_hitbox)){
                            if(this.ball.dy<0){
                                this.ball.dy*=-1
                                this.ball.dy+=player.dy*0.2
                            }
                                if(this.ball.dy==0){
                                this.ball.dy = 5
                            }
                        }
                    }
                    
                    if(player.state=='parry'){
                        if(this.ball.state!='normal'){
                            this.ball.dx*=-1
                        }
                        player.state='idle'
                        this.ball.dx*=2
                        player.meter+=10
                        this.state = 'freezeframe'
                        this.freezetimer=20

                    }
                }
                
            })
            
            
            if(this.ball.x<=0||this.ball.x>=canvas.width){
                if(this.ball.x<=0){
                    this.players[0].meter+=5
                    this.players[0].health-=10
                    score_point.play()
                }
                if(this.ball.x>=canvas.width){
                    this.players[1].meter+=5
                    this.players[1].health-=10
                    score_point.play()
                }
                if(this.ball.state!='normal'){
                        if(this.ball.x<=0){
                        this.players[0].health-=20
                    }
                    if(this.ball.x>=canvas.width){
                        this.players[1].health-=20
                    }
                    this.ball.state='normal'
                    this.ball.width=25
                    this.ball.height=25
                }
                this.ball.x = canvas.width/2
                this.ball.y = canvas.height/2
                this.ball.dx*=-1
                if(this.ball.dx<0){
                    this.ball.dx=-5
                }else{
                    this.ball.dx=5
                }
                if(this.ball.dy>5){
                    this.ball.dy=5
                }
                if(this.ball.dy<-5){
                    this.ball.dy=-5
                }
            }
            if(this.ball.y<=0||this.ball.y>=canvas.height){
                this.ball.dy*=-1
            }
            this.render()
            if(this.players[0].health<=0||this.players[1].health<=0){
                let data = JSON.parse(sessionStorage.getItem('rpg_data'))
                if(this.players[0].health>0){
                   
                    data.money+=10
                    data.level+=1
                    music.pause()
                    alert('you won')
                    if(ischarplaying==true){
                        say(current_char.custom[2].text)
                        current_char.custom[2].func()
                    }
                }else{
                    alert('you lost')
                    data.level+=1
                    if(ischarplaying==true){
                        say(current_char.custom[3].text)
                        current_char.custom[3].func()
                    }
                }
                sessionStorage.setItem('rpg_data',JSON.stringify(data))
                display_inventory()
                this.reset()
                this.state='wait'
            }
        }
        if(this.state=='freezeframe'){
            this.handle_freeze_frame()
        }
        if(this.state=='wait'){
            
        }
        if(this.input_buffer>0){
            this.input_buffer--
        }
            if(this.input_buffer2>0){
            this.input_buffer2--
        }
        requestAnimationFrame(this.update.bind(this))
    }
}
let game = new Game()

document.addEventListener("keydown", event => {
    if(game.players[0].state=='idle'){
        if (event.key === "w"){game.players[0].direction=-1;game.players[0].dy=-5;}
        if (event.key === "s"){ game.players[0].direction=1;game.players[0].dy=5;}
    }
    game.handle_input(event.key)
});
document.addEventListener("keyup", event => {
    if(game.players[0].state=='idle'){
        if (event.key === "w")game.players[0].dy=0;
        if (event.key === "s")game.players[0].dy=0;
    }
});

canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    game.players[0].y = touch.clientY - game.players[0].height;
})
canvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    game.players[0].y = touch.clientY - game.players[0].height;
})
document.getElementById('up').addEventListener("touchstart", function(e) {
    e.preventDefault();
    game.players[0].dy=-5
})
    document.getElementById('up').addEventListener("touchend", function(e) {
    e.preventDefault();
    game.players[0].dy=0
})
    document.getElementById('down').addEventListener("touchstart", function(e) {
    e.preventDefault();
    game.players[0].dy=5
})
    document.getElementById('down').addEventListener("touchend", function(e) {
    e.preventDefault();
    game.players[0].dy=0
})
