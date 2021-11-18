import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const addLeadingZero = value => value.toString().padStart(2, 0);

const disabledBtn = (bool = true) => (refs.btn.disabled = bool);

disabledBtn();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const parseSelectedDate = Date.parse(selectedDates[0]);
    const parseData = Date.now();

    if (parseSelectedDate <= parseData) {
      disabledBtn();
      return Notify.failure('Please choose a date in the future');
    }
    disabledBtn(false);

    refs.btn.addEventListener('click', changeTimer(parseSelectedDate));
  },
};

flatpickr('#datetime-picker', options);

function changeTimer(timeStap) {
  const intervalId = setInterval(() => {
    let result = timeStap - Date.now();
    const { days, hours, minutes, seconds } = convertMs(result);

    if (!days && !hours && !minutes && !seconds) {
      clearInterval(intervalId);
    }

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}
