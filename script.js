const video = document.getElementById("player");

const playBtn = document.getElementById("play");
const rewindBtn = document.getElementById("rewind");
const forwardBtn = document.getElementById("forward");
const seek = document.getElementById("seek");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const volumeBtn = document.getElementById("volumeBtn");
const fullscreenBtn = document.getElementById("fullscreen");
const pipBtn = document.getElementById("pip");
const speed = document.getElementById("speed");

const url = document.getElementById("url");
const load = document.getElementById("load");

function formatTime(sec){

    if(isNaN(sec)) return "00:00";

    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);

    if(h > 0){
        return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    }

    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

load.onclick = () => {

    if(url.value.trim()=="") return;

    video.src = url.value.trim();

    video.load();

    video.play();

};

playBtn.onclick = ()=>{

    if(video.paused){

        video.play();

    }else{

        video.pause();

    }

};

video.onplay=()=>{

playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

};

video.onpause=()=>{

playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

};

rewindBtn.onclick=()=>{

video.currentTime=Math.max(0,video.currentTime-10);

};

forwardBtn.onclick=()=>{

video.currentTime=Math.min(video.duration,video.currentTime+10);

};

video.ontimeupdate=()=>{

seek.max=video.duration||0;

seek.value=video.currentTime;

current.innerText=formatTime(video.currentTime);

duration.innerText=formatTime(video.duration);

};

seek.oninput=()=>{

video.currentTime=seek.value;

};

volume.oninput=()=>{

video.volume=volume.value;

};

volumeBtn.onclick=()=>{

if(video.muted){

video.muted=false;

volumeBtn.innerHTML='<i class="fa-solid fa-volume-high"></i>';

}else{

video.muted=true;

volumeBtn.innerHTML='<i class="fa-solid fa-volume-xmark"></i>';

}

};

fullscreenBtn.onclick=()=>{

if(!document.fullscreenElement){

video.requestFullscreen();

}else{

document.exitFullscreen();

}

};

pipBtn.onclick=async()=>{

if(document.pictureInPictureEnabled){

try{

await video.requestPictureInPicture();

}catch(e){}

}

};

speed.onchange=()=>{

video.playbackRate=parseFloat(speed.value);

};

document.addEventListener("keydown",(e)=>{

switch(e.code){

case "Space":

e.preventDefault();

playBtn.click();

break;

case "ArrowLeft":

rewindBtn.click();

break;

case "ArrowRight":

forwardBtn.click();

break;

case "KeyF":

fullscreenBtn.click();

break;

case "KeyM":

volumeBtn.click();

break;

}

});
