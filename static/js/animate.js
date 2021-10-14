var avtCharacters=sessionStorage.getItem("avtCharacters");
console.log(avtCharacters);
const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");
const width=canvas.width=1800;
const height=canvas.height=800;
const fps=60;

// ----------------------------image character---------------
const spriteSheet=new Image();
spriteSheet.src="/static/image/animate-"+avtCharacters+".png"
const frameWidth=150;
const frameHeight=170;


const Background=new Image();
Background.src="/static/image/Lobby.png";
var bgframex=0;
var bgframey=0;
const bgWidth=1800;
const bgHeight=800;
const bgPosX=0;
const bgPosY=0;

var xPos=10;
var yPos=200;
var count=0;
var reverse=0;



const scale=1;
const secondsToUpdate=1*fps;
var frameIndex=0;
canvas.style.marginTop=window.innerHeight/2-height/2+"px";
context.scale(1,1);



function animateMain(){

    context.drawImage(
        Background,
        bgframex,
        bgframey,
        bgWidth,
        bgHeight,
        bgPosX,
        bgPosY,
        bgWidth,
        bgHeight,
    );
    context.drawImage(
        spriteSheet,
        frameWidth*frameIndex,
        frameHeight*reverse,
        frameWidth,
        frameHeight,
        xPos,
        yPos,
        frameWidth*scale,
        frameHeight*scale,
    );
    
}
function animateSub(indexFrameSub,xPosSub,yPosSub,reSub,avtFriends){
    const friend=new Image();
    friend.src="/static/image/animate-"+avtFriends+".png"
    context.drawImage(
        friend,
        frameWidth*indexFrameSub,
        frameHeight*reSub,
        frameWidth,
        frameHeight,
        xPosSub,
        yPosSub,
        frameWidth*scale,
        frameHeight*scale,
    );

}
const statePlayer={
    states:{},
    generalState:function(name,xPosFriend,yPosFriend,avtCharacters) {
        if(!this.states[name]){
            this.states[name]={
                indexFrame:0,
                xPosFriend:xPosFriend,
                yPosFriend:yPosFriend,
                avtCharacters:avtCharacters,
                

            }
        }
    },
    getState:function(name){
        return this.states[name];
    }
}


function frame(){
    context.clearRect(0,0,width,height);
    animateMain();
    Object.keys(statePlayer.states).forEach((name)=>{
         animateSub(statePlayer.states[name].indexFrame,statePlayer.states[name].xPosFriend,statePlayer.states[name].yPosFriend,statePlayer.states[name].frameReverse,statePlayer.states[name].avtCharacters);
    });

    requestAnimationFrame(frame);
}

const walk=20;

document.addEventListener("keydown",(e)=>{
    if(e.key=='d'){
        reverse=0;
        xPos+=walk;

       
        if (xPos>=1150) {
            if(bgframex+bgWidth<=2980){
            
                xPos=1150;
                bgframex+=walk;
            };
        }

        if(xPos>=1700) xPos=1700;
    }else if(e.key=='a'){
        xPos-=walk;
        reverse=1;
       
        if (xPos<=350){
            if(bgframex>=30){
                xPos=350;
                bgframex-=walk;
            };
        };
        if(xPos<=0) xPos=0;
    }
    else if(e.key=='w'){
        yPos-=walk;

        if(yPos<=100) {
            if(bgframey>=30){
                yPos=100;
                bgframey-=walk;
            };
        };
        if(yPos<=-30) yPos=-30;
        
    }
    else if(e.key=='s'){
        yPos+=walk;
        if(yPos>=500){
            if(bgframey+bgHeight<=2000){
                yPos=500;
                bgframey+=walk;
            };
        } 
        if (yPos>=700) yPos=700;

    }
    if (count > 1){
        frameIndex++;
        count=0;
    }
    if (frameIndex >5){
        frameIndex=0;
    }
   
    count++;
    chatSocket.send(JSON.stringify({
        'message': '',
        'username': userName,
        'room': roomName,
        'indexFrame':frameIndex,
        'frameReverse':reverse,
        'xPos':xPos,
        'yPos':yPos,
        'avtCharacters':avtCharacters,
        'checkCoffee':0
    }));
    CheckArea();



}) 
function CheckArea(){
    console.log("offset x: "+(xPos+bgframex)+"   y :"+(yPos+bgframey))
    if(xPos+bgframex>=630 && bgframex+xPos<=910 && yPos+bgframey>=360 && bgframey+yPos<=440){
        indexArea=1;
        console.log("area1");
    }else{
        indexArea=0;
    }
}

frame();

// ----------------------------------------------------------------------------------------------------

var indexArea=0;
const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
const userName = JSON.parse(document.getElementById('json-username').textContent);
const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + roomName
    + '/'
);

chatSocket.onopen=function(e){
    console.log(e);
}
chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const friend=data.username;
    if(data.message=="disconnect"){
        delete statePlayer.states[friend];
        console.log("Disconect");
        return;
    }
    
    if(!statePlayer.states[friend]&&friend!=userName){
        statePlayer.generalState(friend,0,0,1);
    }
    if(friend!=userName){
        statePlayer.states[friend].indexFrame=data.indexFrame;
        statePlayer.states[friend].frameReverse=data.frameReverse;
        statePlayer.states[friend].xPosFriend=data.xPos;
        statePlayer.states[friend].yPosFriend=data.yPos;
        statePlayer.states[friend].avtCharacters=data.avtCharacters;

        console.log("Doi phuong="+data.avtCharacters);
    }
};

chatSocket.onclose = function(e) {
    console.log('The socket close unexpectadly');
};




document.addEventListener("keydown",(e)=>{
    if(e.key=="Enter" && indexArea){
    chatSocket.send(JSON.stringify({
                'message': 'disconnect',
                'username': userName,
                'room': roomName,
                'indexFrame':0,
                'frameReverse':0,
                'xPos':0,
                'yPos':0,
                'avtCharacters':avtCharacters,
                'checkCoffee':0
    }));
    window.location.replace('/room/area-'+indexArea+"/?username="+userName);
    }
})
