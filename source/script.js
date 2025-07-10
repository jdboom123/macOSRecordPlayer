// Consts for the buttons to press on the application 
const backwardsButton = document.querySelector("#backwardsButton");
let buttonState = "play";

// Display information about the song
let songTitleText = document.querySelector("#songTitleText");
let artistNameText = document.querySelector("#songArtistText");
let coverArtPic = document.querySelector("#coverArt");
let currentSongTime = document.querySelector("#currentSongTime")
let songDuration = document.querySelector("#songDuration")

// Determines the current song to play and if we can go back/forward to another song
let currSongIdx = 0;
var songArrayLength;

// Progress bar
let progressBar = document.querySelector("#progress");
let activeProgressBar = false;
var currInterval;
let mouseOnProgressBar = false;

// Code for playing an audio
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement)
track.connect(audioContext.destination);

fetchJSONData(currSongIdx);

// Fetching JSON data
async function fetchJSONData(currSongIdx){
    console.log(currSongIdx)
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
        // console.log(data)
        // console.log(data.length)
        songArrayLength = data.length

        changeDisplayInfo(data[currSongIdx].songName, data[currSongIdx].artistName, data[currSongIdx].coverArt)
        audioElement.src = data[currSongIdx].filePath
        buttonState = "play"

        if (activeProgressBar == true){
            clearProgressBarInterval()
            activeProgressBar = false
        }

        setProgressBarInterval() 
        activeProgressBar = true
    })
    .catch(error => console.error('Failed to fetch data:', error)); 
}

function changeDisplayInfo(songName, artistName, coverArt){
    songTitleText.innerText = songName
    artistNameText.innerText = artistName
    coverArtPic.src = coverArt
}

function backwardsAction(){
    console.log(audioElement.currentTime)
    if (audioElement.currentTime > 3 ){ // The number 3 is based on Spotify back button logic
        audioElement.currentTime = 0
        console.log("Backwards: Replay the current song")
    }
    else if (audioElement.currentTime < 3 && currSongIdx  > 0){
        currSongIdx -= 1
        fetchJSONData(currSongIdx)
        console.log("Backwards: Play a new song")
    }
    else if (audioElement.currentTime < 3 && currSongIdx  == 0){
        currSongIdx = songArrayLength - 1
        fetchJSONData(currSongIdx)
        console.log("Backwards: AT FIRST ELEMENT. Go to last song")
    }
}

function pauseAction(){
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

    if (currSongIdx + 1 < songArrayLength){
        currSongIdx += 1
        fetchJSONData(currSongIdx)
        console.log(songArrayLength)
        console.log("Forwards: Playing new song")
    }
    else{
        console.log("Forwards: AT THE END OF THE PLAYLIST. Back to beginning")
        currSongIdx = 0
        fetchJSONData(currSongIdx)
    }


}

// Listens if the song has ended
audioElement.addEventListener("ended", function(){
    if (currSongIdx + 1 < songArrayLength){
        currSongIdx += 1
        fetchJSONData(currSongIdx)
        console.log(songArrayLength)
        console.log("Song Ended: Playing new song")
    }
    else{
        console.log("Song Ended: AT THE END OF THE PLAYLIST. Back to beginning")
        currSongIdx = 0
        fetchJSONData(currSongIdx)
    }
})

// Functionality for tracking time with the current song
audioElement.onloadedmetadata = function(){
    let currSongLength = audioElement.duration;
    let minutes = Math.floor(currSongLength/60)
    let seconds = Math.floor(currSongLength%60)

    if (seconds < 10){
            secondsTime = "0" + seconds
    }
    else{
        secondsTime = seconds
    }

    progressBar.max = currSongLength;
    progressBar.value = audioElement.currentTime;

    songDuration.innerText = minutes + ":" + secondsTime;
}

function setProgressBarInterval(){

    if (mouseOnProgressBar == false){
        currInterval = setInterval(() =>{
            var currentTime = audioElement.currentTime
            progress.value = currentTime;

            var minutes = Math.floor(currentTime/60)
            var seconds = Math.floor(currentTime%60)
            
            if (seconds < 10){
                secondsTime = "0" + seconds
            }
            else{
                secondsTime = seconds
            }

            currentSongTime.innerText = minutes + ":" + secondsTime;
            // console.log(mouseOnProgressBar)
        }, 500)
    }
}

function clearProgressBarInterval(){
    clearInterval(currInterval)
}

progressBar.addEventListener("mousedown", function(){
    console.log("Holding down on progress bar")
    mouseOnProgressBar = true

    clearProgressBarInterval()
})

progressBar.addEventListener("mouseup", function(){
    console.log("Released progress bar")
    mouseOnProgressBar = false
    audioElement.currentTime = progressBar.value
    setProgressBarInterval()    
})

progressBar.addEventListener("input", function(){ 
    var currentTime = progressBar.value

    var minutes = Math.floor(currentTime/60)
    var seconds = Math.floor(currentTime%60)
        
    if (seconds < 10){
        secondsTime = "0" + seconds
    }
    else{
        secondsTime = seconds
    }

    currentSongTime.innerText = minutes + ":" + secondsTime;

    console.log("Progress Bar: Changing the currentTime value with the progress bar")
    
})