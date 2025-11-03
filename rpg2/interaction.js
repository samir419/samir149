let dialogue = document.getElementById('dialogue')
let char = document.getElementById('character')
let chars = [
    {ent:erza,conv:erza_conv,custom:erza_custom_interactions},
    {ent:rico,conv:rico_conv,custom:rico_custom_interactions},
    {ent:sailor,conv:sailor_conv,custom:sailor_custom_interactions},
    {ent:blanche,conv:blanche_conv,custom:blanche_custom_interactions}
]
let current_char
const params = new URLSearchParams(window.location.search);
const date = params.get('char');
if(date){
   chars.forEach((c,index)=>{
    if(c.ent.name==date){
        current_char=c
    }
   })
}else{
    current_char = chars[Math.floor(Math.random() *chars.length)]
}



function talk(){
    update_char(current_char.ent)
    let c = current_char
    let rand = Math.floor(Math.random()*c.conv[c.ent.friendly][c.ent.emotion].length);
    let interaction = c.conv[c.ent.friendly][c.ent.emotion][rand]
    say(interaction.text)
    pose(interaction.img)
        if(interaction.custom == true){
        for(let i =0; i<interaction.options.length;i++){
            const option = document.createElement("button");
            option.textContent = interaction.options[i].text;
            option.onclick =  ()=>interaction.options[i].func();
            dialogue.appendChild(option);
        }
        
    }
    time_foward(25)
}
function say(text){
    dialogue.innerHTML=`${text}\n emo: ${current_char.ent.emotion},fre: ${current_char.ent.friendly}`
}
function pose(img){
    char.src = current_char.ent.images[img]
}
function update_char(data){
    let char = JSON.parse(sessionStorage.getItem(data.name))
    if(char.friendly>current_char.conv.length-1){
        char.friendly-=1
    }
    sessionStorage.setItem(char.name,JSON.stringify(char))
    if(char.emotion>current_char.conv[char.friendly].length-1){
        char.emotion-=1
    }
    sessionStorage.setItem(char.name,JSON.stringify(char))
    current_char.ent = char
}
function item(){
    document.getElementById('give-items').innerHTML=''
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    data.items.forEach((item,index)=>{
        let elem = document.createElement('div')
        elem.textContent=item.name
        elem.onclick=()=>{
            console.log('clicked')
            current_char.ent.desired_items.forEach((d,i)=>{
                if(d==item.name){
                    data.items.splice(index, 1)
                    say(current_char.custom[i+4].text)
                    current_char.custom[i+4].func()
                    console.log('gave item')
                }
            })
            sessionStorage.setItem('rpg_data',JSON.stringify(data))
            document.getElementById('give-items').innerHTML=''
        }
        document.getElementById('give-items').appendChild(elem)
    })
}

say('hey there')
pose(0)