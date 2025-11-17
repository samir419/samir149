 class Player{
    constructor(num,char){
        this.num = num
        this.char = char
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
        this.stun_counter = 20
        this.dash_velocity = 0
        this.dash_direction = 0
        this.meter = 0
        this.special_moves = char.specials
        this.cpu_buffer=0
        this.health=100
        this.isultimate = false
        this.isSpecial = false
        this.ultimatemove = char.ultimate
        this.direction=0
    }
    update(){
        if(this.meter>90){
            this.meter=90
        }
        if(this.char.name=='bad guy'&&this.meter<70){
            this.meter=70
        }
        if(this.state=='parry'){
            this.parry_counter--
            if(this.parry_counter==0){
                this.state='idle'
            }
            return
        }
        if(this.state=='stun'){
            this.stun_counter--
            if(this.stun_counter<=0){
                this.state='idle'
                this.stun_counter=20
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
            let move = generate(this.special_moves[Math.floor(Math.random()* this.special_moves.length)])
            move.onstart(this, opponent, game);
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
        let image = new Image()
        image.src = this.char.idle
        if(this.state=='parry'){
            image.src = this.char.parry
        }
        if(this.isSpecial==true){
            image.src = this.char.special
        }
        return {image:image,w:image.width,h:image.height};
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
        this.lasthit=null
    }
    update(){
        this.x+=this.dx
        this.y+=this.dy
    }
}