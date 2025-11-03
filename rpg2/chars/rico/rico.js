function increase_friendly(num,c){
    let data = JSON.parse(sessionStorage.getItem(c));
    data.friendly+=1*num;
    sessionStorage.setItem(c,JSON.stringify(data));
    update_char(data);
}
function increase_emotion(num,c){
    let data = JSON.parse(sessionStorage.getItem(c));
    data.emotion+=1*num;
    sessionStorage.setItem(c,JSON.stringify(data));
    update_char(data);
}
function give_item(item,price){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    data.items.push({name:item,price:price});
    sessionStorage.setItem('rpg_data',JSON.stringify(data));
    display_inventory()
}
function add_contact(char){
  let data = JSON.parse(sessionStorage.getItem('rpg_data'))
  if(!data.contacts.some(user => user.name == char)){
      data.contacts.push({name:char,messages:[]})
      sessionStorage.setItem('rpg_data',JSON.stringify(data))
  };
}
function give_moves(arr){
    let data = JSON.parse(sessionStorage.getItem('rpg_data'));
    arr.array.forEach(element => {
       data.availablemoves.push(element);
    });
    sessionStorage.setItem('rpg_data',JSON.stringify(data));
}
let rico = {
    name:'rico',
    images:['chars/rico/assistant1.png','chars/rico/assistant2.png','chars/rico/assistant3.png','chars/rico/assistant4.png'],
    friendly:0,
    emotion:0,
    source:"chars/rico/rico.js",
    battle_img:'chars/rico/assistant1.png',
    pong_sprite:'game assets/player2.png',
    moveset:['Replenish','Repair','Strike','Angel Guard','fusion xyz','Force Field'],
    desired_items:['cupcake','balloon'],
    level:1
}
if(!sessionStorage.getItem('rico')){
    sessionStorage.setItem('rico',JSON.stringify(rico))
}
rico = JSON.parse(sessionStorage.getItem('rico'))


const rico_custom_interactions = [
    //loosing battle
    {text:'i lost? what a bummer',img:0,func:function(){increase_friendly(-1,'rico')}},
    //winning battle
    {text:'haha i beat you',img:0,func:function(){increase_emotion(1,'rico')}},
    //loosing pong
    {text:'that was such a great match, lets do it again',img:0,func:function(){increase_friendly(1,'rico')}},
    //winning pong
    {text:'woohoo im the best',img:0,func:function(){return}},
    //desired item 1
    {text:'oh my god i love cupcakes',img:0,func:function(){increase_emotion(1,'rico')}},
    //desired item 2
    {text:'is it my birthday today?',img:0,func:function(){increase_friendly(1,'rico')}},
]
const rico_conv = [
        [//friendly 0
            [//emotion 0
                {text:"how are you",img:1,custom:true,
                options:
                [
                    {text:'great, you',func:function(){increase_friendly(1,'rico');say('thats great to hear, im fantastic')}},
                    {text:'not so much',func:function(){say('sorry, have a cookie');give_item('cookie',5)}}
                ]},
                {text:"what move style do you play",img:2,custom:true,
                options:
                [
                    {text:'offensive',func:function(){increase_friendly(1,'rico');say('wow thats cool, im more of a defensive player')}},
                    {text:'defensive',func:function(){
                        increase_friendly(1,'rico')
                        increase_emotion(1,'rico')
                        say('wow me too. here you can try out my move set')
                        let data = JSON.parse(sessionStorage.getItem('rpg_data'))
                        data.movesets.push(rico.moveset)
                        sessionStorage.setItem('rpg_data',JSON.stringify(data))
                    }}
                ]},
            ],
            [//emotion 1
                {text:"looks like i made a new friend, do you want to add me to your contact list",img:1,custom:true,
                options:
                [
                    {text:'yes',func:function(){
                        increase_friendly(1,'rico')
                        say('lets go!')
                        let newdata = JSON.parse(sessionStorage.getItem('rpg_data'))
                        if(!newdata.contacts.some(user => user.name === "rico")){
                            newdata.contacts.push({name:'rico',messages:[]})
                            sessionStorage.setItem('rpg_data',JSON.stringify(newdata))
                        };
                    }},
                    {text:'no',func:function(){
                        increase_emotion(-1,'rico');
                        say('no friends?')
                    }}
                ]},
            ], 
        ],
        [//friendly 1
            [//emotion 0
                {text:"how you doin<<<<<<3",img:1,custom:true,
                options:
                [
                    {text:'great, you',func:function(){say('hey, put some more energy into the response')}},
                    {text:'absolutely fantastic',func:function(){increase_emotion(1,'rico');say('thats good to hear');}}
                ]},
                {text:"wanna know my current stats?",img:2,custom:true,
                options:
                [
                    {text:'no',func:function(){say('you like to keep it a mystery i see')}},
                    {text:'yes',func:function(){
                        let data = JSON.parse(sessionStorage.getItem('rico'))
                        say(`emotion: ${data.emotion}, friendly: ${data.friendly}, desired items:${data.desired_items}`)
                    }}
                ]},
            ],
            [//emotion 1
                {text:"you did it. you maxexd out my friendly and emotional stats. easy enough since im just a test character. but the other characters have much more dialogue and higher stats to reach",img:1},
            ], 
        ]
    ];