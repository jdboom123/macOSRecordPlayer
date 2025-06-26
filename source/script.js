// Consts for the buttons to press on the application 
const backwardsButton = document.querySelector("#backwardsButton");

// Text that changes based on the song
let songTitleText = document.querySelector("#songTitleText");
let artistNameText = document.querySelector("#songArtistText")

function changeSongTitleText(text){
    songTitleText.innerText = text;
}

function backwardsAction(){
    songTitleText.innerText = "Go back";
    songArtistText.innerText = "Go back";
}

function pauseAction(){
    songTitleText.innerText = "Pause";
    songArtistText.innerText = "Pause";
}

function forwardsAction(){
    songTitleText.innerText = "Go forward";
    songArtistText.innerText = "Go forward";
}