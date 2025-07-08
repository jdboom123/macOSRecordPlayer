// Consts for the buttons to press on the application 
const backwardsButton = document.querySelector("#backwardsButton");
let buttonState = "paused";

// Text that changes based on the song
let songTitleText = document.querySelector("#songTitleText");
let artistNameText = document.querySelector("#songArtistText");

// Code for playing an audio
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement)
track.connect(audioContext.destination);

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

    if (audioContext.state === "suspended" ){
        audioContext.resume();
    }

    console.log(audioContext.state)
    if (buttonState == "paused"){
        buttonState = "play";
        audioElement.play().catch(err => console.error('Playback error:', err));
        console.log("Song play")
    }
    else if (buttonState == "play"){
        buttonState = "paused";
        audioElement.pause();
        console.log("Song paused")
    }
}

function forwardsAction(){
    songTitleText.innerText = "Go forward";
    songArtistText.innerText = "Go forward";
}