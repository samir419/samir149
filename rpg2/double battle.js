const params = new URLSearchParams(window.location.search);
let character = null
const Hchar = params.get('char');
if(Hchar){
    let data = JSON.parse(sessionStorage.getItem(Hchar))
    character = {name:data.name,moveset:data.moveset,battle_img:data.battle_img,level:data.level}
}

let random = true

let sessiondata = JSON.parse(sessionStorage.getItem('rpg_data'))

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
let curr_opponent=null
let player1 ={ent:new player(),elem:document.getElementById('player1')}
let player2 ={ent:new player(),elem:document.getElementById('player2')}
let player3 ={ent:new player(),elem:document.getElementById('player3')}
let player4 = {ent:new player(),elem:document.getElementById('player4')}
player3.ent.type='cpu'
player2.ent.type = 'cpu'
player4.ent.type = 'cpu'
let player_list = [player1,player2,player3,player4]
let game = new DoubleGame([player1.ent,player2.ent,player3.ent,player4.ent])
let reward_amount=0


