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

// Fetching JSON data
async function fetchJSONData(testText){
    console.log(testText)
    fetch('../assets/songs.json')
    // checking the response
    .then(response => {
        // if the response is not good
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data)

        changeDisplayInfo(data[0].songName, data[0].artistName)
        audioElement.src = data[0].filePath
    })
    .catch(error => console.error('Failed to fetch data:', error)); 
}

fetchJSONData();

function changeDisplayInfo(songName, artistName){
    songTitleText.innerText = songName
    artistNameText.innerText = artistName
}

function backwardsAction(){

}

async function pauseAction(){
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

}