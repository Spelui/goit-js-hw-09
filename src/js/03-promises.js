import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const deleyRef = formRef.querySelector('input[name="delay"]');
const stepsRef = formRef.querySelector('input[name="step"]');
const amountRef = formRef.querySelector('input[name="amount"]');

function makePromise(e) {
  e.preventDefault();

  for (let i = 0; i < amountRef.value; i += 1) {
    const deleyValue = +deleyRef.value + +stepsRef.value * i;
    const position = i + 1;
    createPromise(position, deleyValue)
      .then(({ position, delay }) => {
        const text = `✅ Fulfilled promise ${position} in ${delay}ms`;
        console.log(text);
        Notiflix.Notify.success(text);
      })
      .catch(({ position, delay }) => {
        const text = `❌ Rejected promise ${position} in ${delay}ms`;
        console.log(text);
        Notiflix.Notify.failure(text);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formRef.addEventListener('submit', makePromise);
