const override = false;

function timeLeft() {
    let now = new Date();
    let newYear = new Date(now.getFullYear() + 1, 0, 1);
    let secondsLeft = (newYear - now) / 1000;
    return [Math.floor(secondsLeft / (60 * 60 * 24)), Math.floor((secondsLeft / (60 * 60)) % 24), Math.floor(secondsLeft / 60) % 60, Math.floor(secondsLeft % 60)];
}

function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

function activatePart(part) {
    document.querySelectorAll('.countdown').forEach(element => {
        if (!element.id.includes('part' + part.toString())) {
            addClass(element, '!hidden');
        }
    });
    removeClass(document.querySelector('#part' + part.toString()), 'hidden')
}

function setupScreen() {
    const [days, hours, minutes, seconds] = timeLeft();
    if (days > 358) {
        activatePart(6);
        startFireworks();
    }
    else if (days !== 0) {
        activatePart(1);
        
    } else if (hours !== 0) {
        activatePart(2);
    } else if (minutes !== 0) {
        if (minutes > 10) {
            activatePart(3);
        } else {
            activatePart(4);
        }
    } else if (seconds !== 0) {
        activatePart(5);
    }
}

function updateTimes() {
    document.querySelectorAll('.days').forEach(element => {
        element.textContent = timeLeft()[0];
    });
    document.querySelectorAll('.hours').forEach(element => {
        element.textContent = timeLeft()[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    });
    document.querySelectorAll('.minutes').forEach(element => {
        element.textContent = timeLeft()[2].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    });
    document.querySelectorAll('.seconds').forEach(element => {
        element.textContent = timeLeft()[3].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    });
}

function refresh() {
    setupScreen();
    updateTimes();
}

setInterval(refresh, 1000/60);
document.addEventListener("keypress")