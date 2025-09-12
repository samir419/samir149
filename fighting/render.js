const bg_img = new Image();
bg_img.src = 'assets/Ken stage.png';
let bgx = -140
let bgy = 0

const button = {
    x: 350,
    y: 185,
    width: 25,
    height: 25,
    text: "btn",
    pressed: false
  };

function isInsideButton(x, y) {
return (
    x >= button.x &&
    x <= button.x + button.width &&
    y >= button.y &&
    y <= button.y + button.height
);
}

function get_direction(){
    if(players[0].x > players[1].x){
        players[0].direction = -1
        players[1].direction = 1
    }else{
        players[0].direction = 1
        players[1].direction = -1
    }
}

function render(){
    get_direction()
    ctx.clearRect(0,0,cvs.width,cvs.height);
   
    ctx.strokeStyle= 'green'

    ctx.strokeRect(players[0].x,players[0].y,players[0].width,players[0].height);
    ctx.strokeRect(players[1].x,players[1].y,players[1].width,players[1].height);

    ctx.strokeStyle= 'red'

    ctx.strokeRect(players[0].hitbox.x,players[0].hitbox.y,players[0].hitbox.width,players[0].hitbox.height);
    ctx.strokeRect(players[1].hitbox.x,players[1].hitbox.y,players[1].hitbox.width,players[1].hitbox.height);

    
    ctx.drawImage(bg_img,bgx,bgy,560,cvs.height);

    if(players[0].getimage() instanceof HTMLImageElement){
        ctx.drawImage(players[0].getimage(),players[0].x-32,players[0].y-32);
    }
    if(players[1].getimage() instanceof HTMLImageElement){
        ctx.drawImage(players[1].getimage(),players[1].x-32,players[1].y-32);
    }
   
   
    ctx.fillStyle = 'yellow'
    ctx.fillRect(10,10,players[0].healthbar,25)
    ctx.fillRect(280,10,players[1].healthbar,25)

    ctx.fillStyle = 'green'
    ctx.fillRect(button.x, button.y, button.width, button.height);

    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);


  
}