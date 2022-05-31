var btnInformation=document.querySelector(".box-information");
var btnLogout=document.querySelector("#btn-logout")
var btnGetUser=document.querySelector("#btn-getuser")
var panelInfo=document.querySelector(".panel-info");
const logoMain=document.getElementById('logoMain');
const aligCenter=document.getElementById("alignCenter");
const navMobile=document.getElementById('nav-mobile');
const btnGocoffee=document.querySelector("#btn-gocoffee");
const btnlogin=document.querySelector("#btn-login");
const btnRegister=document.querySelector("#btn-register");

const uname=document.getElementById("uname");

function InitBase(){
    
    if(logoMain){
        logoMain.addEventListener('click',(e)=>{
            window.location.href = "/";
            
        })
    }
    if(aligCenter){
        aligCenter.addEventListener("click",()=>{
            if(navMobile.style.display=="block"){
                navMobile.style.display="none";
            }else{
                navMobile.style.display="block";
            }
        })
    }
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
            window.location.href = "/logout";
        })
    }
    if(btnGetUser){
        btnGetUser.addEventListener("click",()=>{ 
            $.post("info/", {'username': uname.innerHTML}, function(result){
                $("span").html(result);
            });
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

