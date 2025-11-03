let stat_display=document.getElementById('my-stats')

document.getElementById('moveinput').addEventListener("input", () => {
    const query = document.getElementById('moveinput').value.toLowerCase();
    let suggestions=document.getElementById('sugg')
    suggestions.innerHTML = "";

    if (query.length === 0) return;
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    const matches = data.availablemoves.filter(item =>
        item.toLowerCase().includes(query)
    );

    matches.forEach(match => {
        const div = document.createElement("div");
        div.textContent = match;
        div.addEventListener("click", () => {
        document.getElementById('moveinput').value = match;
        suggestions.innerHTML = "";
        });
        suggestions.appendChild(div);
    });
});

// Hide suggestions when clicking outside
document.addEventListener("click", e => {
    if (e.target !==  document.getElementById('moveinput')) {
    document.getElementById('sugg').innerHTML = "";
    }
});
let move_data = JSON.parse(sessionStorage.getItem('rpg_data'));
move_data.availablemoves.forEach(m=>{
    let btn = document.createElement('button')
    btn.textContent = m
    btn.onclick=()=>{addmove(m)}
    document.getElementById('av-moves').appendChild(btn)
})
let player_moves=[]
function addmove(move){
    if(!move_data.availablemoves.includes(move)){
        return
    }
    player_moves.push(move)
    document.getElementById('move-display').innerHTML+=`<div>${move}</div>`
}
function createset(){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    data.movesets.push(player_moves)
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    player_moves=[]
    display_movesets()
    alert('new set created')
}

item_list = document.getElementById('items')
function display_items(){
    item_list.innerHTML=''
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.items.forEach((item,index)=>{
        item_list.innerHTML+=`<div>${item.name} <button onclick="delete_item(${index})">discard</button></div>`
    })
}
function delete_item(id){
    if(!confirm('Are you sure you want to delete?')) {
        return;
    }
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.items.pop(id)
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    display_items()
}

function display_stat(){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    stat_display.innerHTML=`<div>wins:${data.stats.wins}</div>
    <div>losses:${data.stats.losses}</div>
    <div>friends:${data.stats.friends}</div>
    <div>opponents beaten:${data.stats.opponents_beaten}</div>`
    
}
function display_ach(){
     let data = JSON.parse(sessionStorage.getItem('rpg_data'))
      document.getElementById('my-achievements').innerHTML=''
     data.achievements.forEach((i,index)=>{
        document.getElementById('my-achievements').innerHTML+=`<div>${i.name} completed:${i.completed}</div>`
     })
}

function set_player_pfp(src){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.pfp = src
    document.getElementById('preview').src = src
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
}
function set_name(name){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.name = name
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    alert('profile changed')
}
function sleep(){
    time_foward(2401)
}
handle_achievements()
display_items()
display_stat()
display_ach()