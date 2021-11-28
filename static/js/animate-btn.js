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

subPanel.hidden=true;
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
    subPanel.hidden=!subPanel.hidden;
    boxEmoji.hidden=false;
    boxFriends.hidden=true;
    boxChat.hidden=false;
    boxSend.style.display = "";
    scrollToBottom();
    console.log("Click Messenger");
});

btnFriends.addEventListener("click",()=>{
    boxGroup.style.display=""
    subPanel.hidden=!subPanel.hidden;   
    boxEmoji.hidden=true;
    boxFriends.hidden=false;
    boxChat.hidden=true;
    boxSend.style.display = "none";
    scrollToBottom();
    console.log("Click Friends");
});

hdnavChat.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
});
function scrollToBottom() {  
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
