const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const password = localStorage.getItem('password');

console.log(username)

 
//  window.addEventListener('beforeunload', ()=>{
//     event.preventDefault();
//    event.returnValue ='';
//    });

let menuPopup = document.getElementById('menuPopup');

function toggleMenu() {
    menuPopup.classList.toggle('open-popup');
}

function hideMenu() {
    menuPopup.classList.remove('open-popup');
}