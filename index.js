let acc = 1;




const app = document.querySelector(".app");

function login(){
    console.log(acc);
    app.querySelector(".home").classList.remove("show");
    app.querySelector(".login").classList.add("show");
}