const songUploader = document.getElementById("songUploader");
const playlist = document.getElementById("playlist");
const audio = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const cover = document.getElementById("cover");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const repeatBtn = document.getElementById("repeatBtn");

let songs = [];
let currentIndex = 0;
let repeat = false;

// Upload files and generate playlist
songUploader.addEventListener("change", () => {
    const files = Array.from(songUploader.files);
    playlist.innerHTML = "";
    songs = [];

    files.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const coverUrl = `https://picsum.photos/350/200?random=${index}`;
        songs.push({ name: file.name, url, cover: coverUrl });

        const item = document.createElement("div");
        item.className = "song";
        item.innerText = file.name;
        item.onclick = () => playSong(index);
        playlist.appendChild(item);
    });

    if (songs.length > 0) playSong(0);
});

// Play a song by index
function playSong(index) {
    if (songs.length === 0) return;
    currentIndex = index;
    audio.src = songs[index].url;
    audio.play();
    nowPlaying.innerText = songs[index].name;
    cover.src = songs[index].cover;

    [...document.getElementsByClassName("song")].forEach((el, i) => {
        el.classList.toggle("active", i === index);
    });
}

// Next / Previous buttons
nextBtn.addEventListener("click", () => {
    if (songs.length === 0) return;
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
    if (songs.length === 0) return;
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
});

// Repeat button toggle
repeatBtn.addEventListener("click", () => {
    repeat = !repeat;
    repeatBtn.classList.toggle("active", repeat);
});

// Auto-play next or repeat
audio.addEventListener("ended", () => {
    if (songs.length === 0) return;
    if (repeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
        playSong(currentIndex);
    }
});
