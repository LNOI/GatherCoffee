const btnMessenger=document.querySelector(".btn-messenger");
const btnFriends=document.querySelector(".btn-friends");
const subPanel=document.querySelector(".sub-panel");
const hdnavChat=document.querySelector(".hidden-nav-chat");
const boxFriends=document.querySelector(".box-friends");
const boxmyFriends=document.querySelector(".box-myfriends");
const boxChat=document.querySelector(".box-chat");
const boxSend=document.querySelector(".box-send");
const boxEmoji=document.querySelector(".emoji");
const boxMoney=document.querySelector("#myMoney");
const boxShareMoney=document.querySelector(".shareMoney");
const btnExitShareMoney=document.querySelector("#btnExitShare");
const subboxMoney=document.querySelector("#myMoney .sub-myMoney");
const btnDrawal=document.querySelector("#withdrawal");
const btnDeposit=document.querySelector("#deposit");
const btnExitChekout=document.querySelector("#exitCheckout");
const boxCheckout=document.querySelector(".checkoutPaypal");
const boxGroup=document.querySelector("#box-group");
const boxInfo=document.querySelector(".informationUser");
const btnExitInfo=document.getElementById("closeInfo");
if(boxInfo){
    boxInfo.style.display="none";
    btnExitInfo.addEventListener("click",(e)=>{
        boxInfo.style.display="none";
    })
}
subPanel.style.display="none";
if(boxGroup){
    boxGroup.style.display="none";
    boxmyFriends.style.display="none";
    boxGroup.addEventListener("change",()=>{
        if(boxGroup.value==1){
            boxFriends.style.display="";
            boxmyFriends.style.display="none";
        }else{
            boxFriends.style.display="none";
            boxmyFriends.style.display="";
        }
    })
}
if(btnDeposit&&btnExitChekout){
    boxCheckout.style.display="none";
    btnDeposit.addEventListener("click",()=>{
        boxCheckout.style.display="";
    });
    btnExitChekout.addEventListener("click",()=>{
        console.log("Exit");
        boxCheckout.style.display="none";
    });
}

if(boxShareMoney&&subboxMoney){
    subboxMoney.style.display="none";
    boxShareMoney.style.display="none";
    btnExitShareMoney.addEventListener("click",()=>{
        
        boxShareMoney.style.display="none";
    });
    btnDrawal.addEventListener("click",()=>{
       
        boxShareMoney.style.display="";
    })
}

btnMessenger.addEventListener("click",()=>{
    boxGroup.style.display="none";
    boxmyFriends.style.display="none";
    subPanel.style.display="block";
    boxEmoji.style.display="block";
    boxFriends.style.display="none";
    boxChat.style.display="block";
    boxSend.style.display = "block";
    scrollToBottom();
    console.log("Click Messenger");
});

btnFriends.addEventListener("click",()=>{
    boxGroup.style.display="block"
    subPanel.style.display="block";   
    boxEmoji.style.display="none";
    boxFriends.style.display="block";
    boxChat.style.display="none";
    boxSend.style.display = "none";
    scrollToBottom();
    console.log("Click Friends");
});

hdnavChat.addEventListener("click",()=>{
    subPanel.style.display="none";
});
function scrollToBottom(){  
    boxChat.scrollTop = boxChat.scrollHeight;
    boxFriends.scrollTop = boxFriends.scrollHeight;
}
if (boxMoney){
    boxMoney.addEventListener("click",()=>{
        if(subboxMoney.style.display=="block"){
            subboxMoney.style.display="none";
        }else{
            subboxMoney.style.display="block";
        }       
    });
}
