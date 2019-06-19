const startBtn = document.getElementById('start-btn');

const stopBtn = document.getElementById('stop-btn')

const block1 = document.getElementsByClassName('block-1')[0];

const allIconAuto = [
    'img/audi.png',
    'img/bmw.png',
    'img/ford.png',
    'img/hummer.png',
    'img/kombi.png',
    'img/lamborgini.png',
    'img/mini.png'
];

startBtn.addEventListener('click', func);

function func() {
    const img = block1.getElementsByTagName('img');
    // block1.style.top = '0px';
    let a = -50
    const timerId = setInterval(() => {
        a += 4
        block1.style.top = a + 'px';
    }, 10)
}

function stopGame() {

}
