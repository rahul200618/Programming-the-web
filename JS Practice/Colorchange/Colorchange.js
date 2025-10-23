const colorBoxes = document.querySelectorAll('.color-box');
    const body = document.body;
    const colorDisplay = document.getElementById('color-display');
    const resetButton = document.getElementById('reset-button');

    colorBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const color = box.id;
            body.style.backgroundColor = color;
            colorDisplay.textContent = `Selected Color: ${color.charAt(0).toUpperCase() + color.slice(1)}`;
        });
    });

    resetButton.addEventListener('click', () => {
        body.style.backgroundColor = '#f0f0f0';
        colorDisplay.textContent = 'Selected Color: None';
    });
