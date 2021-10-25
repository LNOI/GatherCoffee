const btnMessenger=document.querySelector(".btn-messenger");
const btnFriends=document.querySelector(".btn-friends");
const subPanel=document.querySelector(".sub-panel");
const hdnavChat=document.querySelector(".hidden-nav-chat");
const boxFriends=document.querySelector(".box-friends");
const boxChat=document.querySelector(".box-chat");
const Input=document.querySelector("#input-messenger");
const MessSubmit=document.querySelector("#chat-messenger-submit");
subPanel.hidden=true;

btnMessenger.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
    boxFriends.hidden=true;
    boxChat.hidden=false;
    boxSend.hidden=false;

    Input.hidden=false;

    MessSubmit.hidden=false;
    scrollToBottom();
});

btnFriends.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;   
    boxFriends.hidden=false;
    boxChat.hidden=true;
    boxSend.hidden=true;
    Input.hidden=true;

    MessSubmit.hidden=true;
    scrollToBottom();
});

hdnavChat.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
});
function scrollToBottom() {  
    boxChat.scrollTop = boxChat.scrollHeight;
    boxFriends.scrollTop = boxFriends.scrollHeight;
}
