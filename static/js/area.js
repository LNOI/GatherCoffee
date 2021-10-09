var avtCharacters=sessionStorage.getItem("avtCharacters");
console.log(avtCharacters);
const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");
const width=canvas.width=1800;
const height=canvas.height=800;
const fps=60;
const spriteSheet=new Image();
spriteSheet.src="/static/image/animate-"+avtCharacters+".png"
const frameWidth=150;
const frameHeight=170;
var xPos=10;
var yPos=200;
const scale=1;
const secondsToUpdate=1*fps;
var count=0;
var reverse=0;
var frameIndex=0;
canvas.style.marginTop=window.innerHeight/2-height/2+"px";
context.scale(0.7,0.7);
function animateMain(){
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
function animateSub(indexFrameSub,xPosSub,yPosSub,reSub){
    context.drawImage(
        spriteSheet,
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
    generalState:function(name,xPosFriend,yPosFriend) {
        if(!this.states[name]){
            this.states[name]={
                indexFrame:0,
                xPosFriend:xPosFriend,
                yPosFriend:yPosFriend,
            }
        }
    },
    getState:function(name){
        return this.states[name];
    }
}

function frame(){
    context.clearRect(0,0,2600,1200);
    animateMain();
    Object.keys(statePlayer.states).forEach((name)=>{
         animateSub(statePlayer.states[name].indexFrame,statePlayer.states[name].xPosFriend,statePlayer.states[name].yPosFriend,0);
    });

    requestAnimationFrame(frame);
}

const walk=20;

document.addEventListener("keydown",(e)=>{
    if(e.key=='d'){
        reverse=0;
        xPos+=walk;
        if (xPos>=2450) xPos=2450;
    }else if(e.key=='a'){
        xPos-=walk;
        reverse=1;
        if (xPos<=0) xPos=0;
    }
    else if(e.key=='w'){
        yPos-=walk;
        if(yPos<=0) yPos=0;
    }
    else if(e.key=='s'){
        yPos+=walk;
        if(yPos>=1000) yPos=1000;

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
        'xPos':xPos,
        'yPos':yPos,
    }));
    CheckArea();



}) 
function CheckArea(){
    if(xPos >=630 && xPos<=870 && yPos>=320 && yPos<=440){
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
        statePlayer.generalState(friend,0,0);
    }
    if(friend!=userName){
        statePlayer.states[friend].indexFrame=data.indexFrame;
        statePlayer.states[friend].xPosFriend=data.xPos;
        statePlayer.states[friend].yPosFriend=data.yPos;
    }
};

chatSocket.onclose = function(e) {
    console.log('The socket close unexpectadly');
};
document.addEventListener("keydown",(e)=>{
    // if(e.key=="Enter" && indexArea){
    // chatSocket.send(JSON.stringify({
    //             'message': 'disconnect',
    //             'username': userName,
    //             'room': roomName,
    //             'indexFrame':0,
    //             'xPos':0,
    //             'yPos':0,
    // }));
    // window.location.replace('/room/area-'+indexArea+"/?username="+userName);
    // }
})
