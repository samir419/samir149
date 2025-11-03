
let cpu 
let cpu_state
class Game{
    constructor(player1,player2){
        this.player1 = player1;
        this.player2 = player2;
        this.player1_score = 0;
        this.player2_score = 0;
        this.current_turn = 0;
        this.max_rounds = 5;
        this.choices = ['rock','paper','scissors'];
        this.winner = null; // 'player1', 'player2', 'draw'
        this.state = 'waiting'; // 'waiting', 'in_progress', 'finished'
    }
    update(){
        this.player1.moves.forEach(move => {move.update();});
        this.player2.moves.forEach(move => {move.update();});
        this.update_ui()
        this.current_turn += 0.5
        if(this.state=='1'){
            this.state='2'
            return;
        }
        if(this.state=='2'){
            this.state='1'
            log(`-----------------turn ${Math.floor(this.current_turn)}-----------------`)
        }
        
    }
    play(user,target,move_instance,playstate){
        if(this.state=='wait'){
            return
        }
        if(playstate==this.state){
            user.moves.forEach((m,index)=>{
                if(move_instance.name==m.name){
                    m.use(user,target,this)
                    user.lastmoveused = m
                }
            })
            this.update()
            this.check_winner()
        }else{
            log('not your turn')
            return;
        }
       
        
    }
    update_ui(){
        render_health(document.getElementById('player1-health'),this.player1.health)
        //document.getElementById('player1-health').innerText = `${this.player1.name} health:`+this.player1.health
        document.getElementById('player-name').innerHTML = `name: ${this.player1.name}`
        document.getElementById('player-health').innerHTML = `health: ${this.player1.health}`
        document.getElementById('player-status').innerHTML = `status: ${this.player1.status_effects.join(', ')}`
        document.getElementById('player-lastmove').innerHTML = `last move:${this.player1.lastmoveused ? this.player1.lastmoveused.name : 'None'}`
        document.getElementById('player-lastdamage').innerHTML = `dmg: ${this.player1.lastDamageReceived}`
       
        render_health(document.getElementById('player-health2'),this.player2.health)
        //document.getElementById('player2-health').innerText = `${this.player2.name} health:`+this.player2.health
         document.getElementById('player2-name').innerHTML = `name: ${this.player2.name}`
        document.getElementById('player2-health').innerHTML = `health: ${this.player2.health}`
        document.getElementById('player2-status').innerHTML = `status: ${this.player2.status_effects.join(', ')}`
        document.getElementById('player2-lastmove').innerHTML = `last move:${this.player2.lastmoveused ? this.player2.lastmoveused.name : 'None'}`
        document.getElementById('player2-lastdamage').innerHTML = `dmg: ${this.player2.lastDamageReceived}`

        document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;

    }
    start(){
         log('game started')
         let weight1=0
         this.player1.moves.forEach((m,index)=>{
            weight1+=m.weight
         })
        let weight2=0
        this.player2.moves.forEach((m,index)=>{
            weight2+=m.weight
        })
        if(weight1>weight2){
            this.state='2'
            log(`${this.player2.name} turn`)
        }else{
            this.state='1'
            log(`${this.player1.name} turn`)
        }
        this.update_ui()
    }
    check_winner(){
        if(this.player1.health<=0&&this.player2.health>0){
            log(`${this.player2.name} wins`)
            let data = JSON.parse(sessionStorage.getItem('rpg_data'))
            data.stats.losses+=1
            data.level+=1.5
            sessionStorage.setItem('rpg_data',JSON.stringify(data))
            alert('you lost')
            time_foward(400)
            this.state='end'
        }
        if(this.player1.health>0&&this.player2.health<=0){
            log(`${this.player1.name} wins`)
            let data = JSON.parse(sessionStorage.getItem('rpg_data'))
            data.stats.wins+=1
            if(!data.stats.opponents_beaten.includes(curr_opponent.name)){
                data.stats.opponents_beaten.push(curr_opponent.name)
            }
            data.money+=reward_amount
            data.level+=1
            sessionStorage.setItem('rpg_data',JSON.stringify(data))
            alert('you won')
            display_inventory()
            time_foward(400)
            this.state='end'
        }
    }
}



class player {
    constructor(player_name){
        this.id=0
        this.name = player_name || 'player';
        this.health = 1500;
        this.moves = [];
        this.status_effects = []; // e.g., ['stunned', 'poisoned']
        this.lastmoveused
        this.lastDamageReceived = 0
        this.weight=0
        this.type='player'
        this.elem = null;
    }
    add_move(move_data){
        this.moves.push(new move(move_data.name, move_data.type, move_data.damage, move_data.healing, move_data.turns, move_data.durability,
             move_data.weight, move_data.effects,move_data.img, move_data.onhit, move_data.onupdate));
    }
}

function render_health(elem,health){
    elem.innerHTML = ''
    health = Math.max(0,health)
    for(let i=0;i<health;i+=100){
        let bar = document.createElement('div')
        bar.className = 'health_bar'
        elem.appendChild(bar)
    }
}

function log(message){
    let msg = document.createElement('p')
    msg.textContent = message
    document.getElementById('log').appendChild(msg);
}

function get_prompt(message, options) {
  return new Promise((resolve) => {
    // If CPU mode
    if (cpu && cpu_state === 'active') {
      resolve(Math.floor(Math.random() * 6));
      return;
    }

    // Create main container
    const div = document.createElement('div');

    // Add message text
    const p = document.createElement('p');
    p.textContent = message;
    div.appendChild(p);

    // Create buttons
    options.forEach((option, i) => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.addEventListener('click', () => {
        div.remove(); // remove the prompt UI
        resolve(i);
      });
      div.appendChild(btn);
    });

    // Append to log
    const prompt = document.createElement('div');
    prompt.appendChild(div);
    const log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', '<p>Select option:</p>');
    log.appendChild(prompt);
  });
}

let attack =  new move(
        'Attack',        // move_name
        'attack',       // type
        100,              // damage
        0,              // healing
        0,              // turns
        100,             // durability
        0,                // weight
        [],             // effects
        function(user, target) {   // onhit
            return;
        },
        function(self, user, target, moves) {  // update
           return;
        }
    )


let defend = new move(
        'Defend',        // move_name
        'spell',       // type
        0,              // damage
        0,              // healing
        1,              // turns
        100,             // durability
        0,                // weight
        [],             // effects
         'move.png',    //image
         function(user, target,game_instance) {   // onhit
            user.status_effects.push('guard');
        },
        function(self, user, target, moves) {  // update
                if(self.turn_count==0){
                    let index = user.status_effects.indexOf('guard');
                    if (index > -1) {
                    user.status_effects.splice(index, 1);
                    log(`${user.name} is no longer guarded`);
                    }
            }
        }
    )
window.onerror = function(message, source, lineno, colno, error) {
  log(`error:${message} at ${source},${lineno},${colno},${error}`);
  // do something with it, like send to your backend
  return false; // returning true prevents the default console error
};
    
