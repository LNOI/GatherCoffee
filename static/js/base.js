var btnInformation=document.querySelector(".box-information");
var btnLogout=document.querySelector("#btn-logout")
var btnGetUser=document.querySelector("#btn-getuser")
var panelInfo=document.querySelector(".panel-info");

const btnGocoffee=document.querySelector("#btn-gocoffee");
const btnlogin=document.querySelector("#btn-login");
const btnRegister=document.querySelector("#btn-register");

console.log(btnlogin);

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
            window.location.href = "/info/?username=thanhloi";
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
            console.log("pk");
            window.location.href = "/room";
        })
        
    }
 
}
InitBase();

