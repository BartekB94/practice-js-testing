document.addEventListener('DOMContentLoaded', init);
const alertDisplayEl = document.querySelector('.alert')

function init() {
    const clickEl = document.querySelector('.error--click');
    const enterEl = document.querySelector('.error--enter');
    alertDisplayEl.classList.add('alert--hidden')

    setRandomPosition(clickEl);
    setRandomPosition(enterEl);

    initEventWithError(clickEl, 'click', new RangeError('Błąd zakresu!'));
    initEventWithError(enterEl, 'mouseenter', new TypeError('Błąd typu!'));

    alertDisplayEl.addEventListener('click', (e) => {
        if(!e.target.classList.contains('alert__container') && !e.target.classList.contains('alert__message')) {
            alertDisplayEl.classList.add('alert--hidden')
        }
    })
}

function setRandomPosition(element, error = null) {
    element.style.top = Math.random() * 600 + 'px';
    element.style.left = Math.random() * 800 + 'px';

    if (error) {
        throw error;
    }
}

function initEventWithError(element, eventName, error) {    
    element.addEventListener(eventName, function () {
        try {
            setRandomPosition(this, error);
        } catch (e) {
            displayError(e.message)
        }
    })
}

function displayError(error) {
    const alertMsgEl = document.querySelector('.alert__message')

    alertMsgEl.textContent = error
    alertDisplayEl.classList.remove('alert--hidden')
}