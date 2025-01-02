document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("chalisaAudio");
    const playButton = document.getElementById("playButton");
    const seekSlider = document.getElementById('seekSlider');
    const volumeSlider = document.getElementById('volumeSlider');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const progress = document.querySelector('.progress');
    const verses = document.querySelectorAll(".prayer-text p");

    const timestamps = [0, 12, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 102, 107, 112, 117, 122, 127, 132, 137, 142, 147, 152, 157, 162, 167, 172, 177, 182, 187, 192, 197, 202, 207, 212, 217, 222, 227];

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';
        seekSlider.value = percent;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    }

    function highlightVerse(index) {
        verses.forEach((verse) => verse.classList.remove("verse-active"));
        if (verses[index]) {
            verses[index].classList.add("verse-active");
            // verses[index].scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = '<i class="material-icons">pause</i>';
        } else {
            audio.pause();
            playButton.innerHTML = '<i class="material-icons">play_arrow</i>';
        }
    }

    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
        seekSlider.value = 0;
    });

    audio.addEventListener('timeupdate', function () {
        updateProgress();
        const currentTime = audio.currentTime;
        const currentVerseIndex = timestamps.findIndex((timestamp, index) => {
            const nextTimestamp = timestamps[index + 1] || Number.MAX_VALUE;
            return currentTime >= timestamp && currentTime < nextTimestamp;
        });
        if (currentVerseIndex !== -1) {
            highlightVerse(currentVerseIndex);
        }
    });

    playButton.addEventListener("click", togglePlay);
    
    seekSlider.addEventListener('input', () => {
        const time = (seekSlider.value / 100) * audio.duration;
        audio.currentTime = time;
    });

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    audio.addEventListener("ended", () => {
        playButton.innerHTML = '<i class="material-icons">play_arrow</i>';
        verses.forEach((verse) => verse.classList.remove("verse-active"));
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//   const audio = document.getElementById("chalisaAudio");
//   const playButton = document.getElementById("playButton");
//   const verses = document.querySelectorAll(".prayer-text p");

//   // Add timestamps for each verse (in seconds)
//   const timestamps = [
//     0, // First verse starts at 0 seconds
//     12, // Second verse starts at 10 seconds
//     22, // Adjust these timestamps based on your audio
//     27,
//     32,
//     37,
//     42,
//     47,
//     52,
//     57,
//     62,
//     67,
//     72,
//     77,
//     82,
//     87,
//     92,
//     97,
//     102,
//     107,
//     112,
//     117,
//     122,
//     127,
//     132,
//     137,
//     142,
//     147,
//     152,
//     157,
//     162,
//     167,
//     172,
//     177,
//     182,
//     187,
//     192,
//     197,
//     202,
//     207,
//     212,
//     217,
//     222,
//     227,
//   ];

//   function togglePlay() {
//     if (audio.paused) {
//       audio.play();
//       playButton.innerHTML = '<i class="material-icons">pause</i>';
//     } else {
//       audio.pause();
//       playButton.innerHTML = '<i class="material-icons">play_arrow</i>';
//     }
//   }

//   function highlightVerse(index) {
//     verses.forEach((verse) => verse.classList.remove("verse-active"));
//     if (verses[index]) {
//       verses[index].classList.add("verse-active");
//       verses[index].scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }

//   playButton.addEventListener("click", togglePlay);

//   audio.addEventListener("timeupdate", function () {
//     const currentTime = audio.currentTime;
//     const currentVerseIndex = timestamps.findIndex((timestamp, index) => {
//       const nextTimestamp = timestamps[index + 1] || Number.MAX_VALUE;
//       return currentTime >= timestamp && currentTime < nextTimestamp;
//     });

//     if (currentVerseIndex !== -1) {
//       highlightVerse(currentVerseIndex);
//     }
//   });

//   audio.addEventListener("ended", () => {
//     playButton.innerHTML = '<i class="material-icons">play_arrow</i>';
//     verses.forEach((verse) => verse.classList.remove("verse-active"));
//   });
// });
