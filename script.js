const startBtn = document.getElementById('start-btn');

const stopBtn = document.getElementById('stop-btn');

const gameField = document.getElementsByClassName('game-field')[0];

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

let stop = false;

// startBtn.addEventListener('click', func);

stopBtn.addEventListener('click', stopGame)

function func() {
    let a = -756
    stop = false;
    const timerId = setInterval(() => {
        a += 2;
        if (a === 0) {
            a = -756
        }
        if (stop && a % 108 === 0) {
            clearInterval(timerId)
        }
        block1.style.top = a + 'px';
    }, 7)
}

function stopGame() {
    stop = true;
}

class Game {
    constructor(columns, imgs) {
        this.columns = columns
        this.imgs = imgs
        this.cols = []
        this.arrImgForCol = []
    }

    drawGameField() {
        for (let i = 0; i < this.columns; i++) {
            const col = document.createElement('div');
            col.classList.add('block-1');
            this.randomImgInArr(); 
            for (let icon of this.addImgInArrayIcon()) {
                const iconImg = document.createElement('img');
                iconImg.src = icon;
                col.appendChild(iconImg)
            }
            this.cols.push(col)
            gameField.appendChild(col)
        }
    }

    addImgInArrayIcon() {
        return [...this.imgs, this.imgs[0], this.imgs[1], this.imgs[2]]
    }

    startGame() {
        this.drawGameField();
    }

    randomImgInArr() {
        this.imgs.sort((elem1, elem2) => {
            return Math.random() - 0.5;
        })
    }

    startRoulette() {
        const speed = [4, 20, 15];
        for (let i = 0; i < this.cols.length; ++i ) {
            let a = -756;
            setInterval(() => {
                a += 2;
                if (a === 0) {
                    a = -756
                }
                if (stop && a % 108 === 0) {
                    clearInterval(timerId)
                }
                this.cols[i].style.top = a + 'px';
            }, speed[i])
        }
    }
}

const gameTest = new Game(3, allIconAuto);

gameTest.drawGameField();

startBtn.addEventListener('click', gameTest.startRoulette.bind(gameTest));
