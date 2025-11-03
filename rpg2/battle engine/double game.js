
class DoubleGame{
    constructor(player_list){
        this.players = player_list
        this.player_queue = []
        this.current_turn = 0;
        this.current_player;
        this.current = 0
        this.state = 'wait'; // 'waiting', 'in_progress', 'finished'
    }
    update(){
        this.players.forEach(player=>{
            if(this.current_player.id==player.id){
                player.moves.forEach(move=>{
                    move.update()
                })
            }
           
        })
    }
    play(user,target,move_instance){
        if(this.state=='wait'){
            return
        }
        if(this.state=='end'){
            log('game ended')
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
    update_ui(){
       this.players.forEach(p=>{
        if(p.elem){
            let stat = p.elem.querySelector('.player-status')
            stat.innerHTML=`<div>${p.health}</div> <div>${p.status_effects.join(', ')}</div> <div>${p.lastmoveused?p.lastmoveused.name:'none'}</div> <div>${p.lastDamageReceived}</div>`
            let health = p.elem.querySelector('.player-health')
            health.innerHTML=''
            for(let i =0;i<p.health;i+=100){
                let healthbar = document.createElement('div')
                healthbar.className='health-bar'
                health.appendChild(healthbar)
            }
        }
        
       })

    }
    start(){
        log('game started')
        this.players.forEach(play=>{
            play.moves.forEach((m,index)=>{
                play.weight+=m.weight
            })
            this.player_queue.push(play)
            play.id = this.player_queue.length
        })
        this.player_queue = this.sortPlayerQueue(this.player_queue)
        this.current_player=this.player_queue[this.current]
        this.state='running'
         log(`${this.current_player.name} turn`)
        this.update_ui()
    }
    check_winner(){
        const midpoint = Math.ceil(this.players.length / 2);
        const teamA = this.players.slice(0, midpoint);
        const teamB = this.players.slice(midpoint);

        // Check if all players in a team have 0 or less health
        const teamADead = teamA.every(player => player.health <= 0);
        const teamBDead = teamB.every(player => player.health <= 0);
        if(teamADead){
            log('team 2 wins')
            let data = JSON.parse(sessionStorage.getItem('rpg_data'))
            data.stats.losses+=1
            data.level+=1.5
            sessionStorage.setItem('rpg_data',JSON.stringify(data))
            alert('you lost')
            time_foward(400)
            this.state='end'
        }
        if(teamBDead){
            log('team 1 wins')
             let data = JSON.parse(sessionStorage.getItem('rpg_data'))
            data.stats.wins+=1
            data.money+=reward_amount
            data.level+=1
            sessionStorage.setItem('rpg_data',JSON.stringify(data))
            alert('you won')
            display_inventory()
            time_foward(400)
            this.state='end'
        }
    }
    sortPlayerQueue(players, descending = false) {
        return [...players].sort((a, b) => {
            return descending ? b.weight - a.weight : a.weight - b.weight;
        });
    }
    handle_cpu() {
        setTimeout(() => {
            if (this.current_player.type === 'cpu' && this.state === 'running') {
                cpu_state = 'active';

                // Choose a random enabled move
                const enabled_moves = this.current_player.moves.filter(m => m.isenabled);
                if (enabled_moves.length === 0) return;
                const move = enabled_moves[Math.floor(Math.random() * enabled_moves.length)];

                // Divide players into two teams
                const midpoint = Math.ceil(this.players.length / 2);
                const teamA = this.players.slice(0, midpoint);
                const teamB = this.players.slice(midpoint);

                // Determine which team the current player is in
                const isInTeamA = teamA.includes(this.current_player);
                const enemyTeam = isInTeamA ? teamB : teamA;

                // Filter out dead opponents
                const validTargets = enemyTeam.filter(p => p.health > 0);

                // If no valid targets remain, stop
                if (validTargets.length === 0) {
                    cpu_state = 'inactive';
                    return;
                }

                // Pick a random living target
                const target = validTargets[Math.floor(Math.random() * validTargets.length)];

                // Execute the move
                this.play(this.current_player, target, move);

                cpu_state = 'inactive';
            }

            // Continue checking if state changes back to 'wait'
            if (this.state === 'wait') {
                this.handle_cpu();
            }
        }, 1000);
    }

}








    
