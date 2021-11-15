var avtCharacters=sessionStorage.getItem("avtCharacters");
console.log(avtCharacters);
const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");

const width=canvas.width=window.innerWidth;
const height=canvas.height=window.innerHeight;
const fps=60;
// ----------------------------image character---------------
const spriteSheet=new Image();
spriteSheet.src="/static/image/animate-"+avtCharacters+".png"

const emoji=new Image();
emoji.src="/static/image/emoji/emoji1.gif";
const frameWidth=150;
const frameHeight=170;

const Background=new Image();
Background.src="/static/image/JangNam.png";
const widthJangNam=3112;
const heightJangNam=1868;
var bgframex=0;
var bgframey=0;
const bgWidth=width;
const bgHeight=height;
const bgPosX=0;
const bgPosY=0;

var xPos=10;
var yPos=200;
var count=0;
var reverse=0;

// ----------------------------image coffee---------------

const imageCoffee=new Image();

const frameWidthCoffee=60;
const frameHeightCoffee=90;

var xPosCoffee=xPos;
var yPosCoffee=yPos;


const scale=1;
const secondsToUpdate=1*fps;
var frameIndex=0;
canvas.style.marginTop=window.innerHeight/2-height/2+"px";
context.scale(1,1);
var getCoffee=0;
var my_mess=""

function TimeHideMess(){
    setTimeout(()=>{
        my_mess="";
        chatSocket.send(JSON.stringify({
            'message': my_mess,
            'username': userName,
            'room': roomName,
            'indexFrame':frameIndex,
            'frameReverse':reverse,
            'xPos':xPos+bgframex,
            'yPos':yPos+bgframey,
            'avtCharacters':avtCharacters,
            'checkCoffee':getCoffee,
            'idCoffee':idCoffee
        }));
    },3000);
}


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
        frameWidth*0.7,
        frameHeight*0.7,
    );
    // context.drawImage(
    //     emoji,
    //     0,
    //     0,
    //     400,
    //     400,
    //     xPos,
    //     yPos,
    //     frameWidth*0.7,
    //     frameHeight*0.7,
    // );
    if (getCoffee){
        context.drawImage(
            imageCoffee,
            0,
            0,
            frameWidthCoffee,
            frameHeightCoffee,
            xPos,
            yPos,
            frameWidthCoffee*0.7,
            frameHeightCoffee*0.7,
        )
    }
    context.font = "30px Arial";
    context.fillText(my_mess, xPos, yPos-20);
}

function animateSub(user_mess,indexFrameSub,xPosSub,yPosSub,reSub,avtFriends,checkCoffee,idCoffee){

    const friend=new Image();
    friend.src="/static/image/animate-"+avtFriends+".png"
    const cfOfFriend=new Image();
    cfOfFriend.src="/static/image/Drink_of_Store_1/Drink_"+idCoffee+".png";
    context.drawImage(
        friend,
        frameWidth*indexFrameSub,
        frameHeight*reSub,
        frameWidth,
        frameHeight,
        xPosSub-bgframex,
        yPosSub-bgframey,
        frameWidth*0.7,
        frameHeight*0.7,
    );
    if(checkCoffee){
        context.drawImage(
            cfOfFriend,
            0,
            0,
            frameWidthCoffee,
            frameHeightCoffee,
            xPosSub-bgframex,
            yPosSub-bgframey,
            frameWidthCoffee*0.7,
            frameHeightCoffee*0.7,
        );
    }
    context.font = "30px Arial";
    context.fillText(user_mess, xPosSub-bgframex, yPosSub-bgframey-20);
}
const statePlayer={
    states:{},
    generalState:function(name,xPosFriend,yPosFriend,avtCharacters,checkCoffee,idCoffee) {
        if(!this.states[name]){
            this.states[name]={
                user_mess:"",
                indexFrame:0,
                xPosFriend:xPosFriend,
                yPosFriend:yPosFriend,
                avtCharacters:avtCharacters,
                checkCoffee:checkCoffee,
                idCoffee:idCoffee

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
         animateSub(statePlayer.states[name].user_mess,statePlayer.states[name].indexFrame,statePlayer.states[name].xPosFriend,statePlayer.states[name].yPosFriend,statePlayer.states[name].frameReverse,statePlayer.states[name].avtCharacters,statePlayer.states[name].checkCoffee,statePlayer.states[name].idCoffee);
    });
    requestAnimationFrame(frame);
}
const walk=20;
var checkKey=0;
document.addEventListener("keydown",(e)=>{
    if(e.key=='d'){
        checkKey=1;
        reverse=0;
        xPos+=walk;
        if (xPos>=(width/2+30)) {
            if(bgframex+bgWidth<=widthJangNam){
            
                xPos=(width/2+30);
                bgframex+=walk;
            };
        }
        if(xPos>=width-150) xPos=width-150;
    }else if(e.key=='a'){
        checkKey=1;
        xPos-=walk;
        reverse=1;
        if (xPos<=(width/2-80)){
            if(bgframex>=30){
                xPos=(width/2-80);
                bgframex-=walk;
            };
        };
        if(xPos<=0) xPos=0;
    }
    else if(e.key=='w'){
        checkKey=1;
        yPos-=walk;
        if(yPos<=(height/2-50)) {
            if(bgframey>=30){
                yPos=(height/2-50);
                bgframey-=walk;
            };
        };
        if(yPos<=-30) yPos=-30;
        
    }
    else if(e.key=='s'){
        checkKey=1;
        yPos+=walk;
        if(yPos>=(height/2+30)){
            if(bgframey+bgHeight<=heightJangNam){
                yPos=(height/2+30);
                bgframey+=walk;
            };
        } 
        if (yPos>=height-150) yPos=height-150;
    }
    else if (e.key=="e"|| e.key=="E"){
        if(!eventOrder.hidden){
            Menu.hidden=false;

        }
    }
    if(checkKey){
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
            'xPos':xPos+bgframex,
            'yPos':yPos+bgframey,
            'avtCharacters':avtCharacters,
            'checkCoffee':getCoffee,
            'idCoffee':idCoffee
        }));
        CheckArea();
    }
    checkKey=0;
   
}) 

function CheckArea(){
   
   CheckOrder();
  
}
function CheckOrder(){
    if(xPos+bgframex>=470 &&xPos+bgframex<=830&&yPos+bgframey<=220&&yPos+bgframey>=60){
        eventOrder.hidden=false;
    }
    else{
        eventOrder.hidden=true;
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
    document.querySelector(".box-friends").innerHTML+=(' <div><b><img src="/static/image/avtUser/p2.png" alt="">'+userName+'</b></div>')
    chatSocket.send(JSON.stringify({
        'message': "Connecting",
        'username': userName,
        'room': roomName,
        'indexFrame':0,
        'frameReverse':0,
        'xPos':10,
        'yPos':200,
        'avtCharacters':avtCharacters,
        'checkCoffee':0,
        'idCoffee':0,
    }));
}
chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const friend=data.username;
    if(data.message=="disconnect"){
        delete statePlayer.states[friend];
        const iconD=document.getElementById("icon-"+friend);
        iconD.parentNode.removeChild(iconD);
        console.log("Disconect");
        return;
    }
    if (data.message){

        if(data.message.includes("emoji")){
            console.log(data.message);
            document.querySelector('.box-chat').innerHTML +=  ('<div><img src="/static/image/avtUser/p2.png" alt=""><b>'+ data.username + '</b>: <p> <img src="/static/image/emoji/' + data.message+ '.gif" alt="emoji"></p> </div>');

        }else{
            document.querySelector('.box-chat').innerHTML +=  ('<div><img src="/static/image/avtUser/p2.png" alt=""><b>'+ data.username + '</b>: <p>' + data.message + '</p> </div>');
        }
    }
    if(!statePlayer.states[friend]&&friend!=userName){
        document.querySelector(".box-friends").innerHTML+=(' <div id="icon-'+friend+'" ><b><img src="/static/image/avtUser/p2.png" alt="">'+friend+'</b></div>')
        statePlayer.generalState(friend,0,0,1,0,0);
    }
    if(friend!=userName){
        statePlayer.states[friend].user_mess=data.message;
        statePlayer.states[friend].indexFrame=data.indexFrame;
        statePlayer.states[friend].frameReverse=data.frameReverse;
        statePlayer.states[friend].xPosFriend=data.xPos;
        statePlayer.states[friend].yPosFriend=data.yPos;
        statePlayer.states[friend].avtCharacters=data.avtCharacters;
        statePlayer.states[friend].checkCoffee=data.checkCoffee;
        statePlayer.states[friend].idCoffee=data.idCoffee;
        if (data.message=="Connecting" ){
            chatSocket.send(JSON.stringify({
                'message': '',
                'username': userName,
                'room': roomName,
                'indexFrame':frameIndex,
                'frameReverse':reverse,
                'xPos':xPos+bgframex,
                'yPos':yPos+bgframey,
                'avtCharacters':avtCharacters,
                'checkCoffee':getCoffee,
                'idCoffee':idCoffee
            }));
        }
    }
};

chatSocket.onclose = function(e) {
    console.log('The socket close unexpectadly');
};

var listDrinkCoffee=document.querySelectorAll(".menu .dt-menu ul li");
var Menu=document.querySelector(".menu");
var eventOrder=document.getElementById("event-Order");
var btnExitMenu=document.querySelector(".btn-exitMenu");
var btnOrderMenu=document.querySelector(".btn-order");
var idCoffee=1;
var lobby=document.querySelector(".lobby");
const fieldInput=document.querySelector("#input-messenger");
const btnMessSubmit=document.querySelector("#chat-messenger-submit");
const valueMoney=document.querySelector("#myMoney p");

var listEmoji=document.querySelectorAll(".emoji ul li");

function initMenu(){
    listDrinkCoffee.forEach((e)=>{
        e.addEventListener("click",()=>{
            e.style.background="rgb(65, 168, 236)";
            imageCoffee.src="/static/image/Drink_of_Store_1/Drink_"+e.id+".png";
            idCoffee=e.id;
            
            listDrinkCoffee.forEach((other)=>{
                if(other!=e){
                    other.style.background="";
                }
            })
        })
    });
    listEmoji.forEach((e)=>{
        e.addEventListener("click",()=>{
         
            const idEmoji=e.id;
            chatSocket.send(JSON.stringify({
                'message': idEmoji,
                'username': userName,
                'room': roomName,
                'indexFrame':frameIndex,
                'frameReverse':reverse,
                'xPos':xPos+bgframex,
                'yPos':yPos+bgframey,
                'avtCharacters':avtCharacters,
                'checkCoffee':getCoffee,
                'idCoffee':idCoffee
            }));
        })
    });
    Menu.hidden=true;
    eventOrder.hidden=true;
    btnExitMenu.addEventListener("click",()=>{
        Menu.hidden=true;
    })
    btnOrderMenu.addEventListener("click",()=>{
        Menu.hidden=true;
        console.log("#"+idCoffee+" p.price")
        priceCoffee=document.querySelector("#"+idCoffee+" p.price").innerHTML.split("$")[0];
        
        valueMoney.innerHTML=parseInt(valueMoney.innerHTML)-parseInt(priceCoffee);
    
        chatSocket.send(JSON.stringify({
            'message': "-"+priceCoffee,
            'username': userName,
            'room': roomName,
            'indexFrame':frameIndex,
            'frameReverse':reverse,
            'xPos':xPos+bgframex,
            'yPos':yPos+bgframey,
            'avtCharacters':avtCharacters,
            'checkCoffee':0,
            'idCoffee':0,
        }));
        getCoffee=1;
        
    });
    lobby.addEventListener("click",()=>{
        chatSocket.send(JSON.stringify({
            'message': 'disconnect',
            'username': userName,
            'room': roomName,
            'indexFrame':0,
            'frameReverse':0,
            'xPos':0,
            'yPos':0,
            'avtCharacters':avtCharacters,
            'checkCoffee':0,
            'idCoffee':0,
        }));
        window.location.href="/room/lobby/?username="+userName;

    });
    btnMessSubmit.addEventListener("click",()=>{
        var mess=fieldInput.value;
        if(mess){
            my_mess=mess;
            TimeHideMess();
           chatSocket.send(JSON.stringify({
               'message': mess,
               'username': userName,
               'room': roomName,
               'indexFrame':frameIndex,
               'frameReverse':reverse,
               'xPos':xPos+bgframex,
               'yPos':yPos+bgframey,
               'avtCharacters':avtCharacters,
               'checkCoffee':0,
               'idCoffee':0,
           }));
        }
        fieldInput.value="";
   })
}

initMenu();





