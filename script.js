const startBtn = document.getElementById('start-btn');

const stopBtn = document.getElementById('stop-btn')

const block1 = document.getElementsByClassName('block-1')[0];

const allIconAuto = [
    'img/mini.png',
    'img/audi.png',
    'img/bmw.png',
    'img/ford.png',
    'img/hummer.png',
    'img/kombi.png',
    'img/lamborghini.png',
];

startBtn.addEventListener('click', func);

function func() {
    const imgs = block1.getElementsByTagName('img');
    let a = -756
    const timerId = setInterval(() => {
        a += 2;
        if (a === 0) {
            a = -756
        }
        block1.style.top = a + 'px';
    }, 1000/200)
}

function stopGame() {

}
