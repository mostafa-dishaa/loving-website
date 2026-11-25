/* ==============================
   1. Start Date
============================== */
// October 8, 2019
const startDate = new Date(2019, 9, 8, 0, 0, 0);

/* ==============================
   2. Get HTML Elements
============================== */
const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const weeksElement = document.getElementById("weeks");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

/* ==============================
   3. Update Counter
============================== */
function updateCounter() {

    const now = new Date();

    // Total difference in milliseconds
    let difference = now - startDate;

    // Prevent negative values
    if (difference < 0) {
        difference = 0;
    }

    // Calculate total seconds
    const totalSeconds = Math.floor(difference / 1000);
    // Calculate total minutes
    const totalMinutes = Math.floor(totalSeconds / 60);
    // Calculate total hours
    const totalHours = Math.floor(totalMinutes / 60);
    // Calculate total days
    const totalDays = Math.floor(totalHours / 24);
    // Calculate years and months using calendar dates
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (now.getDate() < startDate.getDate()) {
        months--;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Remaining months after full years
    const remainingMonths = months;

    // Calculate remaining days
    const calendarDate = new Date(startDate);

    calendarDate.setFullYear(startDate.getFullYear() + years);
    calendarDate.setMonth(startDate.getMonth() + months);

    let remainingDays = Math.floor(
        (now - calendarDate) / (1000 * 60 * 60 * 24)
    );

    // Calculate weeks from total days
    const weeks = Math.floor(totalDays / 7);

    // Calculate remaining hours
    const hours = Math.floor((totalSeconds % 86400) / 3600);

    // Calculate remaining minutes
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // Calculate remaining seconds
    const seconds = totalSeconds % 60;


    /* ==============================
       4. Display Counter
    ============================== */
    yearsElement.textContent = years;
    monthsElement.textContent = remainingMonths;
    weeksElement.textContent = weeks;
    daysElement.textContent = remainingDays;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}


/* ==============================
   5. Start Counter
============================== */
// Run immediately
updateCounter();

// Update every second
setInterval(updateCounter, 1000);

/* ==============================
   6. Memory Music Player
============================== */
// Get HTML Elements
const memoryAudio = document.getElementById("memoryAudio");
const playMusicBtn = document.getElementById("playMusicBtn");
const musicProgress = document.getElementById("musicProgress");
const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");


// Format Time (Minutes : Seconds)
function formatTime(time) {

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


// Play and Pause Music
playMusicBtn.addEventListener("click", function () {

    if (memoryAudio.paused) {

        memoryAudio.play();

    } else {

        memoryAudio.pause();
    }
});


// Update Play Button Icon
memoryAudio.addEventListener("play", function () {
    playMusicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

memoryAudio.addEventListener("pause", function () {
    playMusicBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
});


// Display Music Duration
memoryAudio.addEventListener("loadedmetadata", function () {
    durationElement.textContent = formatTime(memoryAudio.duration);
});


// Update Progress Bar
memoryAudio.addEventListener("timeupdate", function () {

    if (!memoryAudio.duration) return;

    const progress =
        (memoryAudio.currentTime / memoryAudio.duration) * 100;

    musicProgress.value = progress;

    currentTimeElement.textContent =
        formatTime(memoryAudio.currentTime);
});


// Move Through Music
musicProgress.addEventListener("input", function () {

    if (!memoryAudio.duration) return;

    memoryAudio.currentTime =
        (musicProgress.value / 100) * memoryAudio.duration;
});


// Reset Player When Music Ends
memoryAudio.addEventListener("ended", function () {

    playMusicBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    musicProgress.value = 0;
    currentTimeElement.textContent = "0:00";
});


/* ==============================
   7. Music Mute Button
============================== */
const muteMusicBtn = document.getElementById("muteMusicBtn");

muteMusicBtn.addEventListener("click", function () {

    memoryAudio.muted = !memoryAudio.muted;

    if (memoryAudio.muted) {

        muteMusicBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    } else {

        muteMusicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    }
});


/* ==============================
   8. Flip Message Cards
============================== */
// Get All Message Cards
const messageCards = document.querySelectorAll(".message-card");

// Add Click Event To Each Card
messageCards.forEach(function (card) {

    card.addEventListener("click", function () {

        // Toggle Flip Class
        card.classList.toggle("is-flipped");

        // Update Accessibility State
        const isFlipped = card.classList.contains("is-flipped");

        card.setAttribute("aria-pressed", isFlipped);
    });
});


/* ==============================
   9. Photo Gallery - Load More
============================== */

const galleryGrid = document.querySelector(".gallery-grid");
const loadMoreImagesBtn = document.getElementById("loadMoreImages");

if (galleryGrid && loadMoreImagesBtn) {

    const totalImages = 624;
    const imagesPerLoad = 15;

    let currentImage = 1;

    function loadImages() {

        const endImage = Math.min(
            currentImage + imagesPerLoad - 1,
            totalImages
        );

        for (let i = currentImage; i <= endImage; i++) {

            const galleryCard = document.createElement("div");
            galleryCard.classList.add("gallery-card");

            const galleryImage = document.createElement("img");

            galleryImage.src = `../Photo/photo (${i}).jpeg`;
            galleryImage.alt = `صورة من الحكاية رقم ${i}`;
            galleryImage.loading = "lazy";

            galleryCard.appendChild(galleryImage);
            galleryGrid.appendChild(galleryCard);
        }

        currentImage = endImage + 1;

        if (currentImage > totalImages) {
            loadMoreImagesBtn.style.display = "none";
        }
    }

    // Load First 15 Images
    loadImages();

    // Load 15 More Images On Click
    loadMoreImagesBtn.addEventListener("click", loadImages);
}


/* ==============================
   10. Video Gallery - Load More
============================== */
const videoGalleryGrid = document.querySelector(".video-gallery-grid");
const loadMoreVideosBtn = document.getElementById("loadMoreVideos");

if (videoGalleryGrid && loadMoreVideosBtn) {

    const totalVideos = 483;
    const videosPerLoad = 5;

    let currentVideo = 1;

    function loadVideos() {

        const endVideo = Math.min(
            currentVideo + videosPerLoad - 1,
            totalVideos
        );

        for (let i = currentVideo; i <= endVideo; i++) {

            const videoCard = document.createElement("div");
            videoCard.classList.add("video-card");

            const video = document.createElement("video");

            video.src = `../Video/video(${i}).mp4`;
            video.poster = `../Video/posters/video(${i}).jpg`;

            video.controls = true;
            video.preload = "none";

            videoCard.appendChild(video);
            videoGalleryGrid.appendChild(videoCard);
        }

        currentVideo = endVideo + 1;

        if (currentVideo > totalVideos) {
            loadMoreVideosBtn.style.display = "none";
        }
    }

    // Load First 5 Videos
    loadVideos();
    // Load 5 More Videos On Click
    loadMoreVideosBtn.addEventListener("click", loadVideos);
}



/* ==============================
   12. Back To Top
============================== */
const backToTopBtn = document.getElementById("backToTop");

// Scroll To Top
backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ==============================
   13. Final Letter Reveal
============================== */
const finalLetter = document.querySelector(".final-letter-content");
const finalLetterSection = document.querySelector(".final-letter-section");

if (finalLetter && finalLetterSection) {

    const letterObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                finalLetter.classList.add("show-letter");

                console.log("Letter Animation Started");

                letterObserver.disconnect();

            }

        });

    }, {
        threshold: 0
    });
    letterObserver.observe(finalLetterSection);
}