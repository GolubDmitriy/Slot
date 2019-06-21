const startBtn = document.getElementById('start-btn');

const stopBtn = document.getElementById('stop-btn');

const gameField = document.getElementsByClassName('game-field')[0];

const allIconAuto = [
    'img/mini.png',
    'img/audi.png',
    'img/bmw.png',
    'img/ford.png',
    'img/hummer.png',
    'img/kombi.png',
    'img/lamborghini.png',
];

class Game {
    constructor(columns, imgs) {
        this.columns = columns
        this.imgs = imgs
        this.cols = []
        this.arrImgForCol = []
        this.timersId = []
        this.stop = false
        this.counterForStop = 0
    }

    drawGameField() {
        for (let i = 0; i < this.columns; i++) {
            const col = document.createElement('div');
            col.classList.add('block-1');
            col.style.top = this.imgs.length * -108 + 'px';
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
        this.stop = false;
        this.counterForStop = 0;
        let timerIdSetInterval = setTimeout(this.stopRoulete.bind(this), 5000)
        for (let i = 0; i < this.cols.length; ++i ) {
            // let a = -756;
            let a = parseInt(this.cols[i].style.top)
            this.timersId[i] = setInterval(() => {
                a += 2;
                if (a === 0) {
                    a = -756
                }
                if (this.stop && a % 108 === 0 && this.counterForStop === i) {
                    clearInterval(this.timersId[i]);
                    clearInterval(timerIdSetInterval);
                    ++this.counterForStop;
                }
                this.cols[i].style.top = a + 'px';
            }, speed[i])
        }
    }

    stopRoulete() {
        this.stop = true;
    }
}

const gameTest = new Game(3, allIconAuto);

gameTest.drawGameField();

startBtn.addEventListener('click', gameTest.startRoulette.bind(gameTest));

stopBtn.addEventListener('click', gameTest.stopRoulete.bind(gameTest))
