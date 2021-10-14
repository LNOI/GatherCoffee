
const listCoffee=document.querySelectorAll(".menu ul li");
listCoffee.forEach((x)=>{
    x.addEventListener("click",()=>{
        console.log(x.id);
        x.style.backgroundColor="red";
    });
})