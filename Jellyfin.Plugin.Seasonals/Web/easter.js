const config = window.SeasonalsPluginConfig?.Easter || {};

const easter = config.EnableEaster !== undefined ? config.EnableEaster : true; // enable/disable easter
const randomEaster = config.EnableRandomEaster !== undefined ? config.EnableRandomEaster : true; // enable random easter
const randomEasterMobile = config.EnableRandomEasterMobile !== undefined ? config.EnableRandomEasterMobile : false; // enable random easter on mobile devices (Warning: High values may affect performance)
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different duration for the random easter
const easterEggCount = config.EggCount || 20; // count of random extra easter

const bunny = config.EnableBunny !== undefined ? config.EnableBunny : true; // enable/disable hopping bunny
const bunnyDuration = config.BunnyDuration || 12000; // duration of the bunny animation in ms
const hopHeight = config.HopHeight || 12; // height of the bunny hops in px
const minBunnyRestTime = config.MinBunnyRestTime || 2000; // minimum time the bunny rests in ms
const maxBunnyRestTime = config.MaxBunnyRestTime || 5000; // maximum time the bunny rests in ms


let msgPrinted = false; // flag to prevent multiple console messages
let animationFrameId;

// function to check and control the easter
function toggleEaster() {
    const easterContainer = document.querySelector('.easter-container');
    if (!easterContainer) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    // hide easter if video/trailer player is active or dashboard is visible
    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        easterContainer.style.display = 'none'; // hide easter
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        if (!msgPrinted) {
            console.log('Easter hidden');
            msgPrinted = true;
        }
    } else {
        easterContainer.style.display = 'block'; // show easter
        if (!animationFrameId) {
            animateRabbit(); // start animation
        }
        if (msgPrinted) {
            console.log('Easter visible');
            msgPrinted = false;
        }
    }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleEaster);

// start observation
observer.observe(document.body, {
    childList: true,    // observe adding/removing of child elements
    subtree: true,      // observe all levels of the DOM tree
    attributes: true    // observe changes to attributes (e.g. class changes)
});


const images = [
    "../Seasonals/Resources/easter_images/egg_1.png",
    "../Seasonals/Resources/easter_images/egg_2.png",
    "../Seasonals/Resources/easter_images/egg_3.png",
    "../Seasonals/Resources/easter_images/egg_4.png",
    "../Seasonals/Resources/easter_images/egg_5.png",
    "../Seasonals/Resources/easter_images/egg_6.png",
    "../Seasonals/Resources/easter_images/egg_7.png",
    "../Seasonals/Resources/easter_images/egg_8.png",
    "../Seasonals/Resources/easter_images/egg_9.png",
    "../Seasonals/Resources/easter_images/egg_10.png",
    "../Seasonals/Resources/easter_images/egg_11.png",
    "../Seasonals/Resources/easter_images/egg_12.png",
];
const  rabbit = "../Seasonals/Resources/easter_images/easter-bunny.png";

function addRandomEaster(count) {
    const easterContainer = document.querySelector('.easter-container'); // get the leave container
    if (!easterContainer) return; // exit if leave container is not found

    console.log('Adding random easter eggs');

    // Array of leave characters
    for (let i = 0; i < count; i++) {
        // create a new leave element
        const eggDiv = document.createElement('div');
        eggDiv.className = "easter";

        // pick a random easter symbol
        const imageSrc = images[Math.floor(Math.random() * images.length)];
        const img = document.createElement("img");
        img.src = imageSrc;

        eggDiv.appendChild(img);

        // set random horizontal position, animation delay and size(uncomment lines to enable) 
        const randomLeft = Math.random() * 100; // position (0% to 100%)
        const randomAnimationDelay = Math.random() * 12; // delay (0s to 12s)
        const randomAnimationDelay2 = Math.random() * 5; // delay (0s to 5s)

        // apply styles
        eggDiv.style.left = `${randomLeft}%`;
        eggDiv.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

        // set random animation duration
        if (enableDiffrentDuration) {
            const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
            const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
            eggDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
        }


        // add the leave to the container
        easterContainer.appendChild(eggDiv);
    }
    console.log('Random easter added');
}

function addHoppingRabbit() {
    if (!bunny) return; // Nur ausführen, wenn Easter aktiviert ist

    const easterContainer = document.querySelector('.easter-container');
    if (!easterContainer) return;

    // Hase erstellen
    const rabbitImg = document.createElement("img");
    rabbitImg.id = "rabbit";
    rabbitImg.src = rabbit; // Bildpfad aus der bestehenden Definition
    rabbitImg.alt = "Hoppelnder Osterhase";

    // CSS-Klassen hinzufügen
    rabbitImg.classList.add("hopping-rabbit");

    easterContainer.appendChild(rabbitImg);

    rabbitImg.style.bottom = (hopHeight / 2 + 6) + "px";

    animateRabbit(rabbitImg);
}

function animateRabbit(rabbitElement) {
    const rabbit = rabbitElement || document.querySelector('#rabbit');
    if (!rabbit) return;

    let startTime = null;

    function animationStep(timestamp) {
        if (!startTime) {
            startTime = timestamp;

            // random start position and direction
            const startFromLeft = Math.random() >= 0.5;
            rabbit.startX = startFromLeft ? -10 : 110;
            rabbit.endX = startFromLeft ? 110 : -10;
            rabbit.direction = startFromLeft ? 1 : -1;

            // mirror the rabbit image if it starts from the right
            rabbit.style.transform = startFromLeft ? '' : 'scaleX(-1)';
        }
        const progress = timestamp - startTime;

        // calculate the horizontal position (linear interpolation)
        const x = rabbit.startX + (progress / bunnyDuration) * (rabbit.endX - rabbit.startX);

        // calculate the vertical position (sinus curve)
        const y = Math.sin((progress / 500) * Math.PI) * hopHeight; // 500ms for one hop

        // set the new position
        rabbit.style.transform = `translate(${x}vw, ${y}px) scaleX(${rabbit.direction})`;

        if (progress < bunnyDuration) {
            animationFrameId = requestAnimationFrame(animationStep);
        } else {
            // let the bunny rest for a while before hiding easter eggs again
            const pauseDuration = Math.random() * (maxBunnyRestTime - minBunnyRestTime) + minBunnyRestTime;
            setTimeout(() => {
                startTime = null;
                animationFrameId = requestAnimationFrame(animationStep);
            }, pauseDuration);
        }
    }

    animationFrameId = requestAnimationFrame(animationStep);
}


// initialize standard easter
function initEaster() {
    const container = document.querySelector('.easter-container') || document.createElement("div");

    if (!document.querySelector('.easter-container')) {
        container.className = "easter-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    // shuffle the easter images
    let currentIndex = images.length;
    let randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [images[currentIndex], images[randomIndex]] = [images[randomIndex], images[currentIndex]];
    }

    for (let i = 0; i < 12; i++) {
        const eggDiv = document.createElement("div");
        eggDiv.className = "easter";

        const img = document.createElement("img");
        img.src = images[i];

        // set random animation duration
        if (enableDiffrentDuration) {
            const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
            const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
            eggDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
        }

        eggDiv.appendChild(img);
        container.appendChild(eggDiv);
    }

    addHoppingRabbit();
}


// initialize easter and add random easter after the DOM is loaded
function initializeEaster() {
    if (!easter) return; // exit if easter are disabled
    initEaster();
    toggleEaster();

    const screenWidth = window.innerWidth;
    if (randomEaster && (screenWidth > 768 || randomEasterMobile)) { // add random easter only on larger screens, unless enabled for mobile devices
        addRandomEaster(easterEggCount);
    }
}


initializeEaster();