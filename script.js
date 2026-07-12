const controls = document.querySelector(".controls");

let hideTimer;

function showControls() {
    controls.style.opacity = "1";
    controls.style.pointerEvents = "auto";

    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
        if (!video.paused) {
            controls.style.opacity = "0";
            controls.style.pointerEvents = "none";
        }
    }, 3000);
}

video.addEventListener("mousemove", showControls);
video.addEventListener("touchstart", showControls);

video.addEventListener("play", showControls);

video.addEventListener("pause", () => {
    controls.style.opacity = "1";
    controls.style.pointerEvents = "auto";
});

showControls();
