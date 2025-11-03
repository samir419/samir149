shop = document.getElementById('shop items')
player_items = document.getElementById('player items')
document.getElementById('shop moves').style.display='none'
const shop_items = [
    {name:'z fighter',price:200},
    {name:'balloon',price:20},
    {name:'rose',price:50},
    {name:'cheese cake',price:40},
    {name:'kitchen knife',price:20}
]
function display_shop(){
    shop.innerHTML='';
    player_items.innerHTML='';
    shop_items.forEach((item,index)=>{
        shop.innerHTML+=`<div>${item.name} $${item.price} <button onclick="prompt('buy this item?');buy_item(${index})">buy</button></div>`
    })
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.items.forEach((item,index)=>{
        player_items.innerHTML+=`<div>${item.name} $${item.price} <button onclick="prompt('sell this item?');sell_item(${index})">sell</button></div>`
    })
}
function display_moves(){
    document.getElementById('shop moves').innerHTML='';
    Zmoves.forEach((item,index)=>{
         document.getElementById('shop moves').innerHTML+=`<div>${item} $${100} <button onclick="prompt('buy this item?');buy_move(${index})">buy</button></div>`
    })
}

function buy_item(id){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    if(data.money<shop_items[id].price){
        alert('not enough money')
        return
    }
    data.money-=shop_items[id].price
    data.items.push(shop_items[id])
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    display_shop()
    display_inventory()
}
function buy_move(id){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    if(data.money<100){
        alert('not enough money')
        return
    }
    data.money-=100
    data.availablemoves.push(Zmoves[id])
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    display_moves()
    display_inventory()
}
function sell_item(id){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.money+=data.items[id].price
    data.items.splice(id,1)
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    display_shop()
    display_inventory()
}
display_shop()
display_moves()