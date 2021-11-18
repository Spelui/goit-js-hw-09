const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

const changeBodyColor = () =>
  (document.querySelector('body').style.backgroundColor = `${getRandomHexColor()}`);

const startChangeColor = () => {
  refs.startBtn.setAttribute('disabled', 'true');
  intervalId = setInterval(changeBodyColor, 1000);
};

const stopChangeColor = () => {
  refs.startBtn.removeAttribute('disabled');
  clearInterval(intervalId);
  intervalId = null;
};

refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);
