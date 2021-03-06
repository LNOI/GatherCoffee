
var avtCharacters=sessionStorage.getItem("avtCharacters");
const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");

const width=canvas.width=document.body.clientWidth;
const height=canvas.height=document.body.clientHeight;

const fps=60;
const spriteSheet=new Image();
spriteSheet.src="/static/image/animate-"+avtCharacters+".png"
const frameWidth=150;
const frameHeight=170;
const Background=new Image();
Background.src="/static/image/Lobby.png";
const widthLobby=2000;
const heightLobby=1000;
var bgframex=0;
var bgframey=0;
const bgWidth=width;
const bgHeight=height;
const bgPosX=0;
const bgPosY=0;

var xPos=10;
var yPos=400;
var count=0;
var reverse=0;

const scale=1;
const secondsToUpdate=1*fps;
var frameIndex=0;
var arrBoxMessenger=[]
context.scale(1,1);
var my_mess=""
 
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
}
function animateSub(indexFrameSub,xPosSub,yPosSub,reSub,avtFriends,nameMess,user_mess){
    const friend=new Image();
    friend.src="/static/image/animate-"+avtFriends+".png"
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
    const fm=document.getElementById(nameMess+"Messenger");
    if(fm){
        if(user_mess!=""){
            fm.style.left=(xPosSub-bgframex)+"px";
            fm.style.top=(yPosSub-bgframey-70)+"px";
        }
    }
}
const statePlayer={
    states:{},
    generalState:function(name,xPosFriend,yPosFriend,avtCharacters) {
        if(!this.states[name]){
            this.states[name]={
                user_mess:"",
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
         animateSub(statePlayer.states[name].indexFrame,statePlayer.states[name].xPosFriend,statePlayer.states[name].yPosFriend,statePlayer.states[name].frameReverse,statePlayer.states[name].avtCharacters,name,statePlayer.states[name].user_mess);
    });
    requestAnimationFrame(frame);
}
const walk=20;
var check=0;
var checkInput=0;
document.addEventListener("keydown",(e)=>{
    if(checkInput) return;
    if(e.key=='d'){
        reverse=0;
        xPos+=walk;
        check=1;
     
        if (xPos>=(width/2+30)) {
            if(bgframex+bgWidth<=widthLobby-20){
                xPos=(width/2+30);
                bgframex+=walk;
            };
        }
        if(xPos>=width-150) xPos=width-150;
    }else if(e.key=='a'){
        xPos-=walk;
        reverse=1;
        check=1;
        if (xPos<=(width/2-80)){
            if(bgframex>=30){
                xPos=(width/2-80);
                bgframex-=walk;
            };
        };
        if(xPos<=0) xPos=0;
    }
    else if(e.key=='w'){
        yPos-=walk;
        check=1;
        if(yPos<=(height/2-50)) {
            if(bgframey>=30){
                yPos=(height/2-50);
                bgframey-=walk;
            };
        };
        if(yPos<=-30) yPos=-30;
        
    }
    else if(e.key=='s'){
        yPos+=walk;
        check=1;
        if(yPos>=(height/2+30)){
            if(bgframey+bgHeight<=heightLobby-20){
                yPos=(height/2+30);
                bgframey+=walk;
            };
        } 
        if (yPos>=height-150) yPos=height-150;
    }
    if(e.key=='s'||e.key=='a'||e.key=="d"||e.key=="w"){
        if(check){
            if (count > 1){
                frameIndex++;
                count=0;
            }
            if (frameIndex >5){
                frameIndex=0;
            }
            count++;
            boxMessengerOwner.style.left=xPos+"px";
            boxMessengerOwner.style.top=(yPos-60)+"px";
            chatSocket.send(JSON.stringify({
                'message': (my_mess=="")?"":my_mess,
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
            check=0;
        }
        
    }
    CheckArea();
}) 
function CheckArea(){
  
    if(xPos+bgframex>=230 && bgframex+xPos<=510 && yPos+bgframey>=320 && bgframey+yPos<=470){
        indexArea=1;
       
    }else  if(xPos+bgframex>=700 && bgframex+xPos<=970 && yPos+bgframey>=320 && bgframey+yPos<=470){
        indexArea=2;
        console.log("Index 2");
    }else{
        indexArea=0;
    }
}
frame();
var indexArea=0;
const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
const userName = JSON.parse(document.getElementById('json-username').textContent);

var boxMessengerOwner=document.getElementById(userName+"Messenger");
boxMessengerOwner.style.display="none";
const iconMessengerOwner=document.getElementById(userName+"-icon");

const textMessengerOwner=document.getElementById(userName+"-text");


commonSocket=new WebSocket(
    'ws://'
    + window.location.host
    +'//common/'
)
commonSocket.onopen=function(e){
    
}
commonSocket.onmessage=function(e){
    const data = JSON.parse(e.data);
    if(data.username!=userName){
        console.log(data);
        if(data.message.split(":")[1]==userName){
           
            if(data.message.split(":")[0]=="AddFriend"){
                const toast=` <div class="toast show alertInvite noti-`+data.username+`" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <img src="/static/image/avtUser/p4.jpg" style="width: 15%;" class="rounded me-2" alt="...">
                  <strong class="me-auto">`+data.username+`</strong>
                  <small class="text-muted">just now</small>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  `+'K???t b???n khum'+` <button type="button" onclick="addFriendNow('`+data.username+`')" class="btn btn-danger float-end" style="margin-top: -10px;" id="JangNam" >Add</button>
                </div>
                </div>`
                document.querySelector(".notification  .toast-container").innerHTML+=toast;
            }else if(data.message.split(":")[0]=="InviteRoom"){
                console.log("cO 1 NGUOI DANG MOI BAN"+data.username);
                const indexRoom=data.indexRoom
                var nameRoom="";
                if(indexRoom==1){
                    nameRoom="JangNam"
                }else if(indexRoom==2) {
                    nameRoom="SixCoffee"
                }else{
                    nameRoom="Lobby"
                }
                const toast=` <div class="toast show alertInvite" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <img src="/static/image/avtUser/p4.jpg" style="width: 15%;" class="rounded me-2" alt="...">
                  <strong class="me-auto">`+data.username+`</strong>
                  <small class="text-muted">just now</small>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  `+nameRoom+` Khumm<button type="button" onclick="gonow(`+indexRoom+`)" class="btn btn-danger float-end" style="margin-top: -10px;" id="JangNam" >Go now</button>
                </div>
                </div>`
                document.querySelector(".notification  .toast-container").innerHTML+=toast;
            }
        }
    }else{
        if (data.message.split(":")[0]=="GetInfo"){
            const dataU=data.dataInfo.split(":");
            document.getElementById("aliasU").innerHTML=dataU[0];
            document.getElementById("p-fullname").innerHTML=dataU[1];
            document.getElementById("p-address").innerHTML=dataU[2];
            document.getElementById("p-sex").innerHTML=dataU[3];
            document.getElementById("p-age").innerHTML=dataU[4];
            document.getElementById("p-email").innerHTML=dataU[5];
            document.getElementById("p-phone").innerHTML=dataU[6];
            document.querySelector(".informationUser").style.display="block";
        }
    }
}
commonSocket.onclose = function(e) {
    console.log('The socket close unexpectadly');
};

function gonow(index){
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
    if(index==0){
        window.location.replace('/room/lobby/?username='+userName);
    }
    else {
        window.location.replace('/room/area-'+index+"/?username="+userName);
    }
}

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + roomName
    + '/'
);

chatSocket.onopen=function(e){
    avatar=`<div class="dropdown">
        <button class="btn dropdown-toggle" style="height: 40px;" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <img class="bg-transparent float-start" src="/static/image/avtUser/p2.png" alt="avatart" style="width: 15%;">
        <p class="text-white float-start mx-2 fs-5">`+userName+`</p>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" onclick="funcInfo('`+userName+`')" id="btnInfo" href="#">My Info</a></li>
        </ul>
        </div>`
    document.querySelector(".box-friends").innerHTML+=avatar;
    chatSocket.send(JSON.stringify({
        'message': "Connected to Lobby",
        'username': userName,
        'room': roomName,   
        'indexFrame':0,
        'frameReverse':0,
        'xPos':10,
        'yPos':400,
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
        console.log("Disconnect");
        return;
    }
    if (data.message!=""){
        if(data.message.includes("__loop")){
            
        }else if(data.message.includes("emoji")){
            if(friend!=userName){
                document.getElementById(friend+"Messenger").style.display="block";
                document.getElementById(friend+"-icon").style.display="block";
                document.getElementById(friend+"-icon").src="/static/image/emoji/"+data.message+".gif";
                document.getElementById(friend+"-text").style.display="none";
                setTimeout(() => {
                    document.getElementById(friend+"Messenger").style.display="none";
                }, 10000);
            }
            document.querySelector('.box-chat').innerHTML +=  ('<div><img src="/static/image/avtUser/p2.png" alt=""><b>'+ data.username + '</b>: <p> <img src="/static/image/emoji/' + data.message+ '.gif" alt="emoji"></p> </div>');

        }else{
            if(friend!=userName){
                if(document.getElementById(friend+"Messenger")){
                    document.getElementById(friend+"Messenger").style.display="block";
                    document.getElementById(friend+"-icon").style.display="none";
                    document.getElementById(friend+"-text").innerHTML=data.message;
                    document.getElementById(friend+"-text").style.display="block";
                    setTimeout(() => {
                         document.getElementById(friend+"Messenger").style.display="none";
                    }, 10000);
                }
            }
           
            document.querySelector('.box-chat').innerHTML += ('<div><img src="/static/image/avtUser/p2.png" alt=""><b>'+ data.username + '</b>: <p>' + data.message + '</p> </div>');
        }
    }
    if(!statePlayer.states[friend]&&friend!=userName){
        const aa=document.querySelectorAll(".box-myfriends .invite");
        let checkInList=0;
        aa.forEach(e=>{
            if(friend==e.id){
                checkInList=1;
            }
        })
        if(checkInList){
            favatar=`<div class="dropdown "  id="icon-`+friend+`">
            <button class="btn dropdown-toggle" style="height: 40px;" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <img class="bg-transparent float-start" src="/static/image/avtUser/p2.png" alt="avatart" style="width: 15%;">
            <p class="text-white float-start mx-2 fs-5">`+friend+`</p>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" onclick="funcInfo('`+friend+`')" id="btnInfo" href="#">Info</a></li>
           
            </ul>
            </div>`
            document.querySelector(".box-friends").innerHTML+=favatar;
        }else{
            favatar=`<div class="dropdown "  id="icon-`+friend+`">
            <button class="btn dropdown-toggle" style="height: 40px;" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <img class="bg-transparent float-start" src="/static/image/avtUser/p2.png" alt="avatart" style="width: 15%;">
            <p class="text-white float-start mx-2 fs-5">`+friend+`</p>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" onclick="funcInfo('`+friend+`')" id="btnInfo" href="#">Info</a></li>
            <li><a class="dropdown-item"  onclick="funcAddFriend('`+friend+`')" id="btnAddFriend" href="#">AddFriend</a></li>
            </ul>
            </div>`
            document.querySelector(".box-friends").innerHTML+=favatar;
        }
        
        let bMess=document.createElement("div");
        bMess.id=friend+"Messenger";
        bMess.className="boxMessenger";

        let sMess=document.createElement("div");
        sMess.className="bg_boxMessenger";

        let imgMess=document.createElement("img");
        imgMess.src="/static/image/boxChat.png"
        imgMess.className="bg_boxMessenger";

        let pMess=document.createElement("p");
        pMess.classList.add("fw-bold");
        pMess.classList.add("text-white");
        pMess.classList.add("headMess");
        pMess.innerHTML=friend;

        let iconMess=document.createElement("img");
        iconMess.src=""
        iconMess.className="icon_boxMessenger"
        iconMess.id=friend+"-icon";
        iconMess.style.display='none';

        let p2Mess=document.createElement("p");
        p2Mess.classList.add("text_boxMessenger");
        p2Mess.classList.add("text-secondary");
        p2Mess.id=friend+"-text"
        p2Mess.innerHTML="Helllo";

        sMess.appendChild(imgMess);
        sMess.appendChild(pMess);
        sMess.appendChild(p2Mess);
        sMess.appendChild(iconMess)

        bMess.appendChild(sMess);
        bMess.style.display="none";
        document.getElementById("boxMess").appendChild(bMess);
        statePlayer.generalState(friend,0,0,1);
    }
    if(friend!=userName){
        statePlayer.states[friend].user_mess=data.message;
        statePlayer.states[friend].indexFrame=data.indexFrame;
        statePlayer.states[friend].frameReverse=data.frameReverse;
        statePlayer.states[friend].xPosFriend=data.xPos;
        statePlayer.states[friend].yPosFriend=data.yPos;
        statePlayer.states[friend].avtCharacters=data.avtCharacters;
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
                'checkCoffee':0,
                'idCoffee':0,
            }));
        }
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
                    'checkCoffee':0,
                    'idCoffee':0,
        }));
        window.location.replace('/room/area-'+indexArea);
    }
})

const fieldInput=document.querySelector("#input-messenger");
const btnMessSubmit=document.querySelector("#chat-messenger-submit");
const btnHome=document.querySelector(".home");
var listEmoji=document.querySelectorAll(".emoji ul li");
const listMyFriend=document.querySelectorAll(".box-myfriends .invite");

listMyFriend.forEach(e=>{
    e.addEventListener("click",()=>{
        commonSocket.send(JSON.stringify({
            'message':"InviteRoom:"+e.id,
            'username':userName,
            'indexRoom':0,
            'dataInfo':''
        }));
    })
})

function TimeHideMess(){
    setTimeout(()=>{
        my_mess="";
        chatSocket.send(JSON.stringify({
            'message': "",
            'username': userName,
            'room': roomName,
            'indexFrame':frameIndex,
            'frameReverse':reverse,
            'xPos':xPos+bgframex,
            'yPos':yPos+bgframey,
            'avtCharacters':avtCharacters,
            'checkCoffee':0,
            'idCoffee':0
        }));
        boxMessengerOwner.style.display="none";
    },10000);
}

function init(){
    if(fieldInput){
        fieldInput.addEventListener("focus",()=>{
            console.log("click input");
            checkInput=1;
        })
        fieldInput.addEventListener("blur",()=>{
            console.log("out input");
            checkInput=0;
        })
    }
    listEmoji.forEach((e)=>{
        e.addEventListener("click",()=>{
           
            boxMessengerOwner.style.display="block";
            textMessengerOwner.style.display="none";
            iconMessengerOwner.style.display="block";
            iconMessengerOwner.src="/static/image/emoji/"+e.id+".gif";
            TimeHideMess();
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
                'checkCoffee':0,
                'idCoffee':0,
            }));
        })
    });
    btnHome.addEventListener("click",()=>{
        window.location.href="/";
    })
    btnMessSubmit.addEventListener("click",()=>{
         var mess=fieldInput.value;
         
         if(mess!=""){
            boxMessengerOwner.style.display="block";
            my_mess=jsEscape(mess)+"__loop";
            textMessengerOwner.style.display="block";
            iconMessengerOwner.style.display="none";
            textMessengerOwner.innerHTML=jsEscape(mess);
            TimeHideMess();
            chatSocket.send(JSON.stringify({
                'message': my_mess,
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
init();
function funcAddFriend(name){
    commonSocket.send(JSON.stringify({
        'message':"AddFriend:"+name,
        'username':userName,
        'indexRoom':0,
        'dataInfo':''
    }));
}
function addFriendNow(name) {
    commonSocket.send(JSON.stringify({
        'message':"OkeFriend:"+name,
        'username':userName,
        'indexRoom':0,
        'dataInfo':''
    }));
    const v=document.querySelectorAll(".noti-"+name);
    v.forEach(e=>{
        e.style.display="none";
    })

}
function funcInfo(name){
    commonSocket.send(JSON.stringify({
        'message':"GetInfo:"+name,
        'username':userName,
        'indexRoom':0,
        'dataInfo':''
    }));
}

function jsEscape(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
    });
}