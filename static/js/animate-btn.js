const btnMessenger=document.querySelector(".btn-messenger");
const btnFriends=document.querySelector(".btn-friends");
const subPanel=document.querySelector(".sub-panel");
const hdnavChat=document.querySelector(".hidden-nav-chat")
subPanel.hidden=true;
btnMessenger.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
    scrollToBottom();
});

btnFriends.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
});

hdnavChat.addEventListener("click",()=>{
    subPanel.hidden=!subPanel.hidden;
});
function scrollToBottom() {
    let objDiv = document.querySelector(".box-chat");
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(objDiv);   
}
