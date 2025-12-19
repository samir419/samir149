let data = {
    name:'',
    pfp:'N.png',
    level:1,
    movesets:[
        ['Strike','Heal','Force Field','Blast Cannon']
    ],
    contacts:[],
    items:[],
    money:0,
    stats:{wins:0,losses:0,friends:[],bffs:[],lovers:[],opponents_beaten:[]},
    achievements:[
        {name:'make one friend',completed:false},
        {name:'win one match',completed:false},
        {name:'earn 100 zenny',completed:false}
    ],
    time:0,
    day:0,
    availablemoves:[
        'Strike','Heal','Force Field','Blast Cannon'
    ]
}
let tabbing = false
if(!sessionStorage.getItem('rpg_data')){
    username = prompt('enter your name')
    data.name = username
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
}
data = JSON.parse(sessionStorage.getItem('rpg_data'))


let map = document.getElementById('map')
let player_data = document.getElementById('player-data')
let chats = document.getElementById('chats')
let move_sets = document.getElementById('moveset')
mock_data = {
    name:'player',
    movesets:[
        ['attack','heal','blastcannon','guard','attack','defend'],
        ['charge','replenish','forcefield','fusionxyz','attack','defend']
    ],
    contacts:[
        {name:'reimu',messages:[
            {sender:'reimu',message:'hi'},
            {sender:'you',message:'hello'}
        ]}
    ],
    items:[
        'sword','stick','armor'
    ],
    money:5,
}
function open_chat(id){
    document.getElementById('messages').innerHTML=''
    let chat = JSON.parse(sessionStorage.getItem('rpg_data')).contacts[id]
    chat.messages.forEach(message=>{
        if(message.sender=='you'){
            document.getElementById('messages').innerHTML+=`<p style="background-color:'red';">${message.sender}:${message.message}</p>`
        }else{
            document.getElementById('messages').innerHTML+=`<p>${message.sender}:${message.message}</p>`
        }
    })
    document.getElementById('messages').innerHTML+=`<button onclick="handle_chat(${id},'talk')">talk</button> <button onclick="handle_chat(${id},'battle')">challenge</button>
    <button onclick="handle_chat(${id},'date')">invite</button>`
}
function handle_chat(id,cmd){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    let chat = data.contacts[id]
    if(cmd=='talk'){
        chat.messages.push({sender:'you',message:'you sent a message'})
        const chat_messages = [
            "Hey! How’s it going?",
            "What are you up to today?",
            "That’s awesome!",
            "I totally agree with you.",
            "Can you send me the file?",
            "Haha, that’s funny 😂",
            "Let’s meet up later!",
            "What do you think about this?",
            "Good morning!",
            "I’ll be there in 5 minutes.",
            "That sounds like a plan.",
            "Did you watch the game last night?",
            "No worries, take your time.",
            "I’ve been super busy lately.",
            "Talk to you soon!",
            "Can you help me with something?",
            "That’s exactly what I was thinking!",
            "Sounds good to me.",
            "LOL, classic move!",
            "Just finished my work for the day."
        ];
        chat.messages.push({sender:chat.name,message:chat_messages[Math.floor(Math.random() *chat_messages.length)]})
        data.contacts[id]=chat
        sessionStorage.setItem('rpg_data',JSON.stringify(data))
        open_chat(id)
    }
    if(cmd=='battle'){
        chat.messages.push({sender:'you',message:'you sent a battle request'})
       
        if(tabbing){
            chat.messages.push({sender:chat.name,message:`yeah im down for a battle lets meet <a href="arena mobile.html?char=${chat.name}">here</a>`})
        }else{
            chat.messages.push({sender:chat.name,message:`yeah im down for a battle lets meet <a href="arena.html?char=${chat.name}">here</a>`})
        }
        data.contacts[id]=chat
        sessionStorage.setItem('rpg_data',JSON.stringify(data))
        open_chat(id)
        
    }
    if(cmd=='date'){
        chat.messages.push({sender:'you',message:'you sent an invite'})
       
        if(tabbing){
            chat.messages.push({sender:chat.name,message:`ok lets meet up at <a href="park mobile.html?char=${chat.name}">this location</a>`})
        }else{
            chat.messages.push({sender:chat.name,message:`ok lets meet up at <a href="park.html?char=${chat.name}">this location</a>`})
        }
        data.contacts[id]=chat
        sessionStorage.setItem('rpg_data',JSON.stringify(data))
        open_chat(id)
        
    }
   
    
}
function display_inventory(){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    player_data.innerHTML=`
        <div class="box">
            <h3>stats</h3>
            <p>name:${data.name}</p>
            <p>level:${data.level}</p>
            <p>money:${data.money}</p>
            <h3>items</h3>
            <ul id='playeritems'>
            </ul>
        </div>`
    if(data.items){
        data.items.forEach(item=>{
            document.getElementById('playeritems').innerHTML+=`<li>${item.name}</li>`
        })
    }
    document.getElementById('time').innerHTML=`day:${data.day} time:${data.time}`
}

if(chats){
    chats.innerHTML = `
        <div id='contacts' class="box">
        </div>
        <div id='messages' class="box">
        </div>`
    data.contacts.forEach((chat,index)=>{
        if(!chat){return}
        let cnt =document.createElement('p')
        cnt.textContent = chat.name
        cnt.onclick=()=>open_chat(index)
        document.getElementById('contacts').appendChild(cnt)
    })
}
function display_movesets(){
    if(move_sets){
        move_sets.innerHTML=''
        let data = JSON.parse(sessionStorage.getItem('rpg_data'))
        data.movesets.forEach((set,index)=>{
            if(!set){return}
           
            move_sets.innerHTML+=`
            <div class="table">
                <div>set:${index}</div>
                <ul id="set-moves${index}">
                    
                </ul>
                <button onclick="delete_set(${index})">delete</button>
                <button onclick="select_set(${index});this.textContent='selected'">select</button>
            </div>`
            set.forEach(m=>{
                document.getElementById(`set-moves${index}`).innerHTML+=`<li>${m}</li>`
            })

        })
    }
}
function delete_set(num){
    if (!confirm('Are you sure you want to delete?')) {
    return;
    }
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    data.movesets.splice(num,1)
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    display_movesets()
    alert('data deleted')
}
let main_set = []
function select_set(num){
     let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    main_set = data.movesets[num]
}

function saveData() {
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();

    URL.revokeObjectURL(url);
}

function loadData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
    try {
        const loadedData = JSON.parse(e.target.result);
        // Copy data into our object
        sessionStorage.setItem('rpg_data',JSON.stringify(loadedData))
        alert("✅ JSON data loaded successfully!");
    } catch (error) {
        alert("❌ Invalid JSON file.");
    }
    };
    reader.readAsText(file);
}
function display_all(){
    display_inventory()
    display_movesets()
}
const Zmoves = ['Strike','Replenish','Force Field','Blast Cannon','Heal','Holy Blade',
    'Demon Charge','Shield Strike','Covenant of Carnage','Mirror Match','Power Up','Baneful Binding',
    'Repair','Attack Up','fusion xyz','Beast Mode','Malevonent Armor','Angel Guard']

function handle_achievements(){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    if(data.contacts.length>0){
        data.achievements[0].completed=true
    }
    if(data.stats.wins>0){
        data.achievements[1].completed=true
    }
    if(data.money>100){
        data.achievements[2].completed=true
    }
     sessionStorage.setItem('rpg_data',JSON.stringify(data))
}

function handle_time_events(){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    if(data.day==0&&data.time==0){
        notify(`welcome ${data.name}`)
       
    }
    if(data.day%7==0&&data.day>0){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        sessionStorage.setItem('event_token',JSON.stringify(result))
        notify(`new event at <a href='event.html?token=${result}'>location</a>`)
    }
    if(data.contacts.length==0){
        return
    }
    if((data.day%7==0||data.day%4==0)&&(data.time==700||data.time==1200||data.time==1700||data.time==2000)){
        let char = data.contacts[Math.floor(Math.random() *data.contacts.length)]
        if(char.friendly>0||char.emotion>0){
             if(window.innerWidth>800){
                notify(`${char.name} has invited you to the <a href='park.html?char=${char.name}'>park</a>`)
            }else{
                notify(`${char.name} has invited you to the <a href='park mobile.html?char=${char.name}'>park</a>`)
            }
        }
       
        
    }
    if(Math.floor(Math.random() *10)<2){//data.time>1550&&data.time<1800
        if(Math.floor(Math.random() *10)<5){
             let char = data.contacts[Math.floor(Math.random() *data.contacts.length)]
            if(char.friendly>0){
                 if(window.innerWidth>800){
                    notify(`${char.name} has challenged you to a battle at the <a href='arena.html?char=${char.name}'>arena</a>`)
                }else{
                notify(`${char.name} has challenged you to a battle at the <a href='arena mobile.html?char=${char.name}'>arena</a>`)
                }
            }
           
        }
       
        
    }
     if(Math.floor(Math.random() *10)<2){
        let char = data.contacts[Math.floor(Math.random() *data.contacts.length)]
        if(char.friendly>0&&char.emotion>0){
                if(window.innerWidth>800){
                notify(`${char.name} has invited you to a team match at at the <a href='double battle.html?char=${char.name}'>arena</a>`)
            }else{
                notify(`${char.name} has invited you to a team match at at the <a href='double battle mobile.html?char=${char.name}'>arena</a>`)
            }
        }
       
    }
}
function time_foward(num){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'))
    data.time+=num
    if(data.time>=2400){
        data.time=0
        data.day+=1
    }
    sessionStorage.setItem('rpg_data',JSON.stringify(data))
    document.getElementById('time').innerHTML=`day:${data.day} time:${data.time}`
    handle_time_events()
}

function notify(msg){
    let elem = document.createElement('div')
    elem.innerHTML=`<h2>🔴${msg}</h2>`
    document.body.prepend(elem);
}
document.addEventListener('DOMContentLoaded', () => {
    display_all()
    time_foward(100)
});
