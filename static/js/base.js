var btnInformation=document.querySelector(".box-information");
var btnLogout=document.querySelector("#btn-logout")
var btnGetUser=document.querySelector("#btn-getuser")
var panelInfo=document.querySelector(".panel-info");

const btnGocoffee=document.querySelector("#btn-gocoffee");
const btnlogin=document.querySelector("#btn-login");
const btnRegister=document.querySelector("#btn-register");


const uname=document.getElementById("uname");
if(uname&&uname.innerHTML!=""){
    const username=uname.innerHTML;
    commonSocket=new WebSocket(
        'ws://'
        + window.location.host
        +'/ws/common/'
    )
    commonSocket.onopen=function(e){
       
    }
    commonSocket.onmessage=function(e){
        const data = JSON.parse(e.data);
        if(data.username!=uname.innerHTML){
            noti=`<div class="toast show float-end" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <img src="/static/image/avtUser/p1.png" style="width: 15%;" class="rounded me-2" alt="...">
            <strong class="me-auto">`+data.username+`</strong>
            <small>11 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
            `+data.message+` <button type="button "  class="btn btn-warning float-end ">Warning</button>
            </div>
            </div>`
            document.getElementById("notification").innerHTML+=noti;
        }
      
    }
    commonSocket.onclose = function(e) {
        console.log('The socket close unexpectadly');
    }
}



function InitBase(){
    if(panelInfo){
        panelInfo.hidden=true;
    }
    if(btnInformation){
        btnInformation.addEventListener("click",()=>{
            panelInfo.hidden=!panelInfo.hidden;
        })
    }
    if(btnLogout){
        btnLogout.addEventListener("click",()=>{
            console.log("pl");
            window.location.href = "/logout";
        })
    }
    if(btnGetUser){
        btnGetUser.addEventListener("click",()=>{
            var name=document.querySelector(".box-information #info-users p").innerHTML;
            window.location.href = "/info/?username="+name;
        })
    }

    if(btnlogin){
        btnlogin.addEventListener("click", () => {
            window.location.href = "/login";
        });
    }
    
    if(btnRegister){
        btnRegister.addEventListener("click", () => {
            window.location.href = "/create";
        });
    }
    
    if(btnGocoffee){
        btnGocoffee.addEventListener("click",()=>{
            window.location.href = "/room";
        })
    }
}
InitBase();

