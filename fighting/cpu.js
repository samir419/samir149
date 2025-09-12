cpu_timer = 0
input_frame = 0
function cpu(){
    cpu_timer++
    switch(getstate()) {
        case 'pursuit':
            if(players[0].x-players[1].x>=50){
                players[1].move(1)
            }else if(players[0].x-players[1].x<-50){
                players[1].move(-1)
            }
            if(cpu_timer%50==0){
                players[1].hook()
            }
            break;

        case 'attack':
            if(players[0].x-players[1].x<=50||players[0].x-players[1].x>-50){
                combo_attack(players[1])
                players[1].idle()
            }
            break;
        case 'retreat':
            if(cpu_timer==520||cpu_timer==540||cpu_timer==560||cpu_timer==580)
            if(players[0].x-players[1].x<=50&&players[0].x-players[1].x>0){
                players[1].move(-1)
                players[1].jump()
            }else if(players[0].x-players[1].x>-50&&players[0].x-players[1].x<0){
                players[1].move(1)
                players[1].jump()
            }
            break;
        case 'idle':
            if(cpu_timer%50==0){
                players[1].idle()
            }
            break;
        }
        if(cpu_timer==700){
            cpu_timer=0
        }

    
    //players[1].move(-1)
}
function getstate(){
    if(cpu_timer>100&&cpu_timer<200){
        return 'pursuit'
    }else if(cpu_timer>300&&cpu_timer<400){
        return 'attack'
    }else if(cpu_timer>500&&cpu_timer<600){
        return 'retreat'
    }else if(cpu_timer>600&&cpu_timer<700){
        return 'pursuit'
    } else{
        return 'idle'
    }
    
}

class FightingAI {
    constructor() {
      this.state = 'idle'; // idle, approach, attack, block, evade
      this.reactionTime = 200; // ms delay
      this.lastDecisionTime = 0;
      this.blockChance = 0.4;
      this.attackCombo = 0;
    }
  
    update_ai(gameState, ai) {
      const now = Date.now();
  
      if (now - this.lastDecisionTime < this.reactionTime) return;
  
      this.lastDecisionTime = now;
      const {
        playerHealth=players[0].healthbar,
        aiHealth=players[1].healthbar,
        distance=players[0].x-players[1].x,
        playerAction=players[0].state,
        aiPosition=players[1].x,
        playerPosition=players[0].x,
      } = gameState;
  
      const isPlayerAttacking =players[0].attack_frames>0;
      const isPlayerJumping = players[0].y<50;
      const closeRange = players[0].x-players[1].x<=100&&players[0].x-players[1].x>=0||players[0].x-players[1].x>-100&&players[0].x-players[1].x<0;
      const midRange =distance > 80 && distance <= 200 || distance < -80 && distance >= -200;
  
      // Defensive reaction
      if (isPlayerAttacking && closeRange && Math.random() < this.blockChance) {
        this.state = 'block';
        players[1].block();
        return;
      }
  
      // Predictive jump counter
      if (isPlayerJumping && midRange && Math.random() < 0.5) {
        this.state = 'antiAir';
        players[1].jump(); // jump toward and hit
        setTimeout(() => heavy_attack(players[1]), 100); // attack mid-air
        return;
      }
  
      // Aggression based on health or distance
      if (players[0].x-players[1].x<=100&&players[0].x-players[1].x>=0||players[0].x-players[1].x>-100&&players[0].x-players[1].x<0) {
        if (Math.random() < 0.5) {
          this.state = 'attack';
          this.attackCombo++;
          combo_attack(players[1])
          if (this.attackCombo >= 3) {
            this.attackCombo = 0;
            players[1].block(); // reset with a brief block
          }
          return;
        }
      }
      
      if(players[0].x-players[1].x>=50){
           if(Math.random()<0.5){
            players[1].move(1)
           }
        }else if(players[0].x-players[1].x<-50){
            if(Math.random()<0.5){
                players[1].move(-1)
               }
        }
      if (Math.random() < 0.1) players[1].jump();
  
      // Fallback idle or reposition
      this.state = 'idle';
      if (Math.random() < 0.1) players[1].block();
      else if (Math.random() < 0.4) players[1].jump();
    }
  }

const ai = new FightingAI()
  