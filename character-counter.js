const messageInput = document.querySelector('#message-input');
const counter = document.querySelector('#counter');
const submitBtn = document.querySelector('#submit-btn');
const MAX_CHARS = 100;
const WARN_THRESHOLD = 90;

messageInput.addEventListener('input', () => {
    const currentLength = messageInput.value.length;
    counter.textContent = `Characters: ${currentLength}/${MAX_CHARS}`;
    if (currentLength > WARN_THRESHOLD) {
        counter.classList.add('warning');
    } else {
        counter.classList.remove('warning');
    }
    if (currentLength > MAX_CHARS) {
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
});
