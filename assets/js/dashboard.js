const usernameContainer = document.getElementById("usernameContainer");
const userData = localStorage.getItem("userData");
const parsedUserData = userData ? JSON.parse(userData) : null;

window.onload = () => {
    // if(!sessionStorage.name){
    //     location.href = '/';
    // } else{
    //     greeting.innerHTML = `hello ${sessionStorage.name}`;
    // }

    if (parsedUserData && parsedUserData.username) {
        usernameContainer.textContent = `Hello, ${parsedUserData.username}!`;
    }else{
        window.location.href = '/';
    }

}

// const logOut = document.querySelector('.logout');

// logOut.onclick = () => {
//     sessionStorage.clear();
//     location.reload();
// }