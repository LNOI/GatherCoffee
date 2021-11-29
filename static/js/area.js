
var avtCharacters=sessionStorage.getItem("avtCharacters");
const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");
 
const width=canvas.width=document.body.clientWidth;
const height=canvas.height=document.body.clientHeight;

const fps=60;
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

var idCoffee=1;

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

var xycookie=document.cookie;

xy=xycookie.split(";");
xy.forEach(e=>{
  
    if(e.includes("x")){
        if(!isNaN(e.split("=")[1])){
            xPos=parseInt(e.split("=")[1]);
        }
    }
    if(e.includes("y")){
        if(!isNaN(e.split("=")[1])){
            yPos=parseInt(e.split("=")[1]);
        }
    }
    if(e.includes("idcoffee")){
        idCoffee=e.split("=")[1];
        imageCoffee.src="/static/image/Drink_of_Store_1/Drink_"+idCoffee+".png";

    }
    if(e.includes("checkcoffee")){
        if(!isNaN(e.split("=")[1])){
            getCoffee=parseInt(e.split("=")[1]);
        }
      
    }
});




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
    },8000);
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
    
   
}


function animateSub(user_mess,indexFrameSub,xPosSub,yPosSub,reSub,avtFriends,checkCoffee,idCoffee,nameMess){

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
    if(checkCoffee){
        const cfOfFriend=new Image();
        
        cfOfFriend.src="/static/image/Drink_of_Store_1/Drink_"+idCoffee+".png";
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
    const fm=document.getElementById(nameMess+"Messenger");
    if(fm){
        if(user_mess!=""){
            console.log(user_mess)
            fm.style.left=(xPosSub-bgframex)+"px";
            fm.style.top=(yPosSub-bgframey-70)+"px";
        }
    }

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
         animateSub(statePlayer.states[name].user_mess,statePlayer.states[name].indexFrame,statePlayer.states[name].xPosFriend,statePlayer.states[name].yPosFriend,statePlayer.states[name].frameReverse,statePlayer.states[name].avtCharacters,statePlayer.states[name].checkCoffee,statePlayer.states[name].idCoffee,name);
    });
    requestAnimationFrame(frame);
}
const walk=20;
var checkKey=0;
canvas.style.marginTop="0px";
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
        
        if(eventOrder.style.display=='block'){
            console.log("display1");
            Menu.style.display="block";
        }
    }
    if(e.key=='s'||e.key=='a'||e.key=="d"||e.key=="w"){
        if(checkKey){
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
                'checkCoffee':getCoffee,
                'idCoffee':idCoffee
            }));
        
            document.cookie="x="+xPos;
            document.cookie="y="+yPos;
            document.cookie="idcoffee="+idCoffee;
            document.cookie="checkcoffee="+getCoffee;
            CheckArea();
        }
        checkKey=0;
    }
   
}) 

function CheckArea(){
   
   CheckOrder();
  
}
function CheckOrder(){
   
    if(xPos+bgframex>=470 &&xPos+bgframex<=830&&yPos+bgframey<=220&&yPos+bgframey>=60){
        eventOrder.style.display="block";
    }
    else{
        eventOrder.style.display="none";
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
    +'/ws/common/'
)
commonSocket.onopen=function(e){  

}
commonSocket.onmessage=function(e){
    
    const data = JSON.parse(e.data);
    if(data.username!=userName){

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
                  `+'Kết bạn khum'+` <button type="button" onclick="addFriendNow('`+data.username+`')" class="btn btn-danger float-end" style="margin-top: -10px;" id="JangNam" >Add</button>
                </div>
                </div>`
                document.querySelector(".notification  .toast-container").innerHTML+=toast;
            }else if(data.message.split(":")[0]=="InviteRoom"){
                const indexRoom=data.indexRoom
                const toast=` <div class="toast show alertInvite" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <img src="/static/image/avtUser/p4.jpg" style="width: 15%;" class="rounded me-2" alt="...">
                  <strong class="me-auto">`+data.username+`</strong>
                  <small class="text-muted">just now</small>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  `+'Moi ban vao JangNam'+` <button type="button" onclick="gonow(`+indexRoom+`)" class="btn btn-danger float-end" style="margin-top: -10px;" id="JangNam" >Go now</button>
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
    }else
    if(index==1){
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

        if(data.message.includes("__loop")){
            
        }else
        if(data.message.includes("emoji")){
            if(friend!=userName){
                document.getElementById(friend+"Messenger").style.display="block";
                document.getElementById(friend+"-icon").style.display="block";
                document.getElementById(friend+"-icon").src="/static/image/emoji/"+data.message+".gif";
                document.getElementById(friend+"-text").style.display="none";
                setTimeout(() => {
                    document.getElementById(friend+"Messenger").style.display="none";
                }, 10000);
            }
            console.log(data.message);
            document.querySelector('.box-chat').innerHTML +=  ('<div><img src="/static/image/avtUser/p2.png" alt=""><b>'+ data.username + '</b>: <p> <img src="/static/image/emoji/' + data.message+ '.gif" alt="emoji"></p> </div>');

        }else if (data.message.includes("shareMoney")){
            arrdata=data.message.split("-")
            o=arrdata[0]
            n=arrdata[2]
            m=arrdata[3]
            if(n==userName){
                v=document.getElementById("mn");
                v.innerHTML=parseInt(v.innerHTML)+parseInt(m)
            }
            if(o==userName){
                v=document.getElementById("mn");
                v.innerHTML=parseInt(v.innerHTML)-parseInt(m)
            }

        }
        else{
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

var lobby=document.querySelector(".lobby");
const fieldInput=document.querySelector("#input-messenger");
const btnMessSubmit=document.querySelector("#chat-messenger-submit");
const valueMoney=document.querySelector("#myMoney p");

var listEmoji=document.querySelectorAll(".emoji ul li");

const btnShareMoney=document.getElementById("shareMoney");

const listMyFriend=document.querySelectorAll(".box-myfriends .invite");

listMyFriend.forEach(e=>{
    e.addEventListener("click",()=>{
        console.log("Moi ban vao phong nay :"+e.id);
        commonSocket.send(JSON.stringify({
            'message':"Moi ban vao  :"+e.id,
            'username':userName,
            'indexRoom':1,
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
            my_mess=e.id+"__loop";
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
                'checkCoffee':getCoffee,
                'idCoffee':idCoffee
            }));
        })
    });
    Menu.style.display="none";
    eventOrder.style.display="none";
    btnExitMenu.addEventListener("click",()=>{
        Menu.style.display="none";
    })
    btnOrderMenu.addEventListener("click",()=>{
        Menu.style.display="none";
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
        if(mess!=""){
            console.log("Oke vaof"+mess);
            boxMessengerOwner.style.display="block";
            my_mess=mess+"__loop";
            textMessengerOwner.style.display="block";
            iconMessengerOwner.style.display="none";
            textMessengerOwner.innerHTML=mess;
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
   btnShareMoney.addEventListener("click",()=>{
        u=document.getElementById("namefriend").value;
        vMoney=document.getElementById("valueMoney").value;
        if(!vMoney) return;
        chatSocket.send(JSON.stringify({
            'message': userName+"-shareMoney-"+u+"-"+vMoney,
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
   });
}

initMenu();
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



