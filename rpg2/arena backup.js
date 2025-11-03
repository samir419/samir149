let player1 
let player2
let game
cpu = true
const opponents = [
    {name:'Aisha',moveset:['Replenish','Heal','Holy Blade','Angel Guard'],battle_img:'game assets/opponents/aisha.jpg', level:1},
    {name:'Blake',moveset:['Force Field','Shield Strike','Repair','Angel Guard'],battle_img:'game assets/opponents/blake.jpg',level:1},
    {name:'Nero',moveset:['Strike','Replenish','Blast Cannon','Power Up'],battle_img:'N.png',level:0},
    {name:'Pumkin queen',moveset:['Baneful Binding','Demon Charge','fusion xyz','Malevonent Armor','Covenant of Carnage','Repair'],battle_img:'game assets/opponents/pumkin.jpg',level:5},
    {name:'Red',moveset:['Beast Mode','Attack Up','Power Up','Strike','Repair','Blast Cannon'],battle_img:'game assets/opponents/red.jpg',level:5},
    {name:'Quetzie',moveset:['Blast Cannon','Demon Charge','Strike','Replenish','Repair','Force Field'],battle_img:'game assets/opponents/quetzie.jpg',level:5},
    {name:'awakened Nero',moveset:['Strike','Replenish','Blast Cannon','Power Up','Repair','Attack Up','Angel Guard','Shield Strike'],battle_img:'N.png',level:15},
    {name:'Dynatrol',moveset:['Strike','Blast Cannon','Beast Mode','Baneful Binding','Demon Charge','fusion xyz','Mirror Match'],battle_img:'N.png',level:15},
]
opponents.forEach((opp,index)=>{
    if(index%3==0&&index!=0){
        document.getElementById('opponents').innerHTML+=`<div>difficulty ${index/3}</div>`
    }
    document.getElementById('opponents').innerHTML+=`<div class="container-horizontal"><img src="${opp.battle_img}"><p>${opp.name}</p><button onclick="startgame(opponents[${index}])">challenge</button></div>`
})
let curr_opponent
let reward_amount
function startgame(opp){
    document.getElementById('game').style.display='flex'
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    if(data.level<opp.level){
        log(`level ${opp.level} required`)
        return
    }
    reward_amount=50+opp.level*10
    let health_cap = 600+data.level*100
    let move_cap 
    if(data.level<15){move_cap=6}
    if(data.level<10){move_cap=5}
    if(data.level<5){move_cap=4}
    let opp_health_cap = 700+opp.level*100
    
    document.getElementById('log').innerHTML=''
    document.getElementById('moves').innerHTML=''
    curr_opponent=opp
    document.getElementById('opp_img').src = opp.battle_img
    document.getElementById('opp_img_mobile').src = opp.battle_img
    document.getElementById('img').src = data.pfp
    document.getElementById('img_mobile').src = data.pfp
    player1 = new player(JSON.parse(sessionStorage.getItem('rpg_data')).name)
    player2 = new player(opp.name)
    player1.health=health_cap
    player2.health=opp_health_cap
    player1.moves=[]
    player2.moves=[]
    if(main_set.length==0){
        for(let i=0;i<move_cap;i++){
            let availableMoves = moves.filter(m => !player1.moves.includes(m));
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            player1.add_move(randomMove);
        }
    }else{
        main_set.forEach((m,index) => {
            for(let i = 0; i<moves.length;i++){
                if(m==moves[i].name&&index<=move_cap){
                    player1.add_move(moves[i]);
                }
            }
        });
    }
    
    /**moves2.forEach(m => {
        for(let i = 0; i<moves.length;i++){
            if(m==moves[i].name){
                player2.moves.push(moves[i])
            }
        }
    });**/
    if(opp.moveset){
        opp.moveset.forEach(m => {
            for(let i = 0; i<moves.length;i++){
                if(m==moves[i].name){
                    player2.add_move(moves[i]);
                }
            }
        });
    }else{
         for(let i=0;i<6;i++){
            let availableMoves = moves.filter(m => !player2.moves.includes(m));
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            player2.add_move(randomMove);
        }
    }
   
    player2.add_move(attack);
    player2.add_move(defend);
    player1.moves.forEach(m=>{
        let elem = document.createElement('div')
        let btn = document.createElement('button')
        let image = document.createElement('img')
        image.className = 'move_img'
        image.src = `game assets/moves/${m.img}`
        btn.appendChild(image)
        btn.innerHTML+=m.name
        btn.onclick = ()=>{
            if(game.state=='wait'){
                log('select an option')
                return;
            }
            cpu_state = 'inactive'
            game.play(player1,player2,m,'1');
            if(player2.health>0){
                handle_cpu()
            }
            
        }
        m.elem = btn
        elem.appendChild(btn)
        document.getElementById('moves').appendChild(elem)
    })
    player1.add_move(attack);
    player1.add_move(defend);
    game = new Game(player1,player2)
    game.start()
    handle_cpu()
}
function handle_cpu(){
    setTimeout(() => {
        if(game.state=='wait'){
            handle_cpu()
            return;
        }
        cpu_state = 'active'
        let enabled_moves = player2.moves.filter(m => m.isenabled);
        let move = enabled_moves[Math.floor(Math.random()*enabled_moves.length)];
        game.play(player2,player1,move,'2');
    }, 1000);
}


const params = new URLSearchParams(window.location.search);
const char = params.get('char');
if(char){
    let data = JSON.parse(sessionStorage.getItem(char))
    let msg = document.createElement('p')
    let btn = document.createElement('button')
    msg.textContent=`${data.name} is ready to battle`
    btn.textContent='go'
    btn.onclick=()=>{startgame(data)}
    document.getElementById('log').appendChild(msg)
     document.getElementById('log').appendChild(btn)
    document.getElementById('game').style.display='flex'
}