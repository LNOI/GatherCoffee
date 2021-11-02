const btnMessenger=document.querySelector(".btn-messenger");
const btnFriends=document.querySelector(".btn-friends");
const subPanel=document.querySelector(".sub-panel");
const hdnavChat=document.querySelector(".hidden-nav-chat");
const boxFriends=document.querySelector(".box-friends");
const boxChat=document.querySelector(".box-chat");
const boxSend=document.querySelector(".box-send");

subPanel.hidden=true;

btnMessenger.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
    boxFriends.hidden=true;
    boxChat.hidden=false;
    boxSend.hidden=false;
    scrollToBottom();
});

btnFriends.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;   
    boxFriends.hidden=false;
    boxChat.hidden=true;
    boxSend.hidden=true;
    console.log(boxSend);
    scrollToBottom();
});

hdnavChat.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
});
function scrollToBottom() {  
    boxChat.scrollTop = boxChat.scrollHeight;
    boxFriends.scrollTop = boxFriends.scrollHeight;
}
