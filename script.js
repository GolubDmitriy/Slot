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
    constructor(columns, imgs, speed) {
        this.columns = columns
        this.imgs = imgs
        this.cols = []
        this.arrImgForCol = []
        this.timersId = []
        this.stop = false
        this.counterForStop = 0
        this.speed = speed
        this.timerIdStartBtnActive
        this.startRoulette = this.startRoulette.bind(this)
    }

    drawGameField() {
        this.startBtnActive()
        for (let i = 0; i < this.columns; i++) {
            const col = document.createElement('div');
            col.classList.add('block-1');
            col.style.top = this.imgs.length * -108 + 'px';
            let randomImgs = this.randomImgInArr(this.imgs)
            randomImgs = this.addImgInArrayIcon(randomImgs)
            for (let icon of randomImgs) {
                const iconImg = document.createElement('img');
                iconImg.src = icon;
                col.appendChild(iconImg)
            }
            this.cols.push(col)
            gameField.appendChild(col)
        }
    }

    addImgInArrayIcon(arr) {
        let newArr = [...arr];
        for (let i = 0; i < 3; ++i) {
            newArr.push(arr[i])
        }
        return newArr;
    }

    startGame() {
        this.drawGameField();
    }

    randomImgInArr(arr) {
        arr.sort(() => {
            return Math.random() - 0.5;
        })
        return arr;
    }

    startRoulette() {
        console.log(666)
        this.startBtnDeactivate()
        this.stop = false;
        this.counterForStop = 0;
        let timerIdSetTimeout = setTimeout(this.stopRoulete.bind(this), 5000)
        for (let i = 0; i < this.cols.length; ++i ) {
            let a = parseInt(this.cols[i].style.top)
            this.timersId[i] = setInterval(() => {
                a += 2;
                if (a === 0) {
                    a = -756
                }
                if (this.stop && a % 108 === 0 && this.counterForStop === i) {
                    clearInterval(this.timersId[i]);
                    clearInterval(timerIdSetTimeout);
                    ++this.counterForStop;
                }
                this.cols[i].style.top = a + 'px';
            }, this.speed[i])
        }
    }

    stopRoulete() {
        this.stop = true;
    }

    startBtnActive() {
        let colors = ['red', 'green', 'yellow', 'purple', 'greenyellow', 'orange'];
        colors = this.randomImgInArr(colors);
        let numberColors = 0;
        this.timerIdStartBtnActive = setInterval(() => {
            startBtn.style.background = colors[numberColors++ % colors.length];
        }, 300)
    }

    startBtnDeactivate() {
        clearInterval(this.timerIdStartBtnActive);
        startBtn.removeEventListener('click', this.startRoulette);
        startBtn.style.background = 'grey';
    }
}

const gameTest = new Game(3, allIconAuto, [4, 20, 15]);

gameTest.drawGameField();

startBtn.addEventListener('click', gameTest.startRoulette);

stopBtn.addEventListener('click', gameTest.stopRoulete.bind(gameTest))
