const lightBulb = document.querySelector('#light-bulb');
const toggleBtn = document.querySelector('#toggle-btn');
const body = document.body;

const lightOnSrc = './light-bulb.png';
const lightOffSrc = './bulb.png';
let isLightOn = false;
body.classList.add('dark');
toggleBtn.addEventListener('click', () => {
    isLightOn = !isLightOn;
    body.classList.toggle('dark');

    if (isLightOn) {
        lightBulb.setAttribute('src', lightOnSrc);
        lightBulb.setAttribute('alt', 'A light bulb that is turned on');
        toggleBtn.textContent = 'Turn Off';
    } else {
        lightBulb.setAttribute('src', lightOffSrc);
        lightBulb.setAttribute('alt', 'A light bulb that is turned off');
        toggleBtn.textContent = 'Turn On';
    }
});

