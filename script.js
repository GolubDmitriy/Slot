const startBtn = document.getElementById('start-btn');

const stopBtn = document.getElementById('stop-btn');

const gameField = document.getElementsByClassName('game-field')[0];

const iconsAuto = [
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
        this.stopGame = false
        this.counterForStop = 0
        this.speed = speed
        this.timerIdStartBtnActive
        this.startRoulette = this.startRoulette.bind(this)
        this.stopRoulete = this.stopRoulete.bind(this)
        this.visibleCellsInCol = 3
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
        for (let i = 0; i < this.visibleCellsInCol; ++i) {
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
        this.startBtnDeactivate()
        this.stopGame = false;
        this.counterForStop = 0;
        let timerIdSetTimeout = setTimeout(this.stopRoulete.bind(this), 5000)
        for (let i = 0; i < this.cols.length; ++i ) {
            let a = parseInt(this.cols[i].style.top)
            this.timersId[i] = setInterval(() => {
                a += 2;
                if (a === 0) {
                    a = -756
                }
                if (this.stopGame && a % 108 === 0 && this.counterForStop === i) {
                    clearInterval(this.timersId[i]);
                    clearInterval(timerIdSetTimeout);
                    ++this.counterForStop;
                    if (this.counterForStop === this.columns) {
                        this.startBtnActive();
                    }
                }
                this.cols[i].style.top = a + 'px';
            }, this.speed[i])
        }
    }

    stopRoulete() {
        this.stopGame = true;
        this.stopBtnDeactivate();
    }

    startBtnActive() {
        startBtn.addEventListener('click', this.startRoulette);
        this.stopBtnDeactivate();
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
        this.stopBtnActivate();
    }

    stopBtnActivate() {
        stopBtn.addEventListener('click', this.stopRoulete);
        stopBtn.style.background = 'white';
    } 

    stopBtnDeactivate() {
        stopBtn.removeEventListener('click', this.stopRoulete);
        stopBtn.style.background = 'grey';
    }
}

const gameTest = new Game(5, iconsAuto, [4, 20, 10, 2, 15]);

gameTest.drawGameField();
