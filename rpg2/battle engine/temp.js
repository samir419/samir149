let cpu 
let cpu_state
let move =  new move(
        'fusion xyz',        // move_name
        'spell',      // type
        0,             // damage
        0,               // healing
        0,                // turns
        1,              // durability
        1,               // weight
        [],              // effects
         'move.png',    //image
        function(user, target,game_instance) {  // onhit
            (async () => {
                let state_ref = game_instance.state
                game_instance.state = 'wait'
                 let options = []
                user.moves.forEach(move => {options.push(move.name)})
                let num = await get_prompt('select move:',options);
                let num2 = await get_prompt('select second move:',options);
                user.moves[num].use(user,target,game_instance)
                if(num2!=num){
                    user.moves[num2].use(user,target,game_instance)
                }
                game_instance.state='running'
                
            })();
        },
        function(self, user, target, moves) {  // update
            return;
        }
    )
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
class Game{
    constructor(player_list){
        this.players = player_list
        this.player_queue = []
        this.current_turn = 0;
        this.current_player;
        this.current = 0
        this.max_rounds = 5;
        this.choices = ['rock','paper','scissors'];
        this.winner = null; // 'player1', 'player2', 'draw'
        this.state = 'wait'; // 'waiting', 'in_progress', 'finished'
    }
    play(user,target,move_instance){
        if(this.state=='wait'){
            return
        }
        if(this.current_player.id==user.id){
            if(this.current_player.health>0){
                user.moves.forEach((m,index)=>{
                    if(move_instance.name==m.name){
                        m.use(user,target,this)
                        user.lastmoveused = m
                    }
                })
            }
           
            this.current += 1
            if(this.current>this.player_queue.length-1){
                this.current = 0
                 this.current_turn += 1
                log(`-----------------turn ${Math.floor(this.current_turn)}-----------------`)
            }
            this.current_player=this.player_queue[this.current]
            this.update()
            log(`${this.current_player.name} turn`)
            this.update_ui()
            this.check_winner()
            this.handle_cpu()

        }else{
            log('not your turn')
            return;
        }
       
        
    }
     handle_cpu(){
        setTimeout(() => {
            if(this.current_player.type=='cpu'&&this.state=='running'){
                cpu_state='active'
                let enabled_moves = this.current_player.moves.filter(m => m.isenabled);
                let move = enabled_moves[Math.floor(Math.random()*enabled_moves.length)];
                let targets
                if(this.current_player.id<3){
                    targets = [this.players[2],this.players[3]]
                }else{
                    targets = [this.players[0],this.players[1]]
                }
                this.play(this.current_player,targets[Math.floor(Math.random() * targets.length)],move)
                cpu_state='inactive'
            }
            if(this.state=='wait'){
                this.handle_cpu()
            }
        }, 1000);
        
    }
}

