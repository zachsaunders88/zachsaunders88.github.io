const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height);

function getRandomColour() {
    const r = Math.floor(Math.random() * 256); // Random red value
    const g = Math.floor(Math.random() * 256); // Random green value
    const b = Math.floor(Math.random() * 256); // Random blue value
    return `rgb(${r}, ${g}, ${b})`; // Return color string
}

function changeGradient(colour) {
    if (colour == "RAINBOW") {
        gradient.addColorStop(0, getRandomColour());
        gradient.addColorStop(0.2, getRandomColour());
        gradient.addColorStop(0.4, getRandomColour());
        gradient.addColorStop(0.6, getRandomColour());
        gradient.addColorStop(0.8, getRandomColour());
        gradient.addColorStop(1.0, getRandomColour());
    }
    else if (colour == "BLUE") {
        gradient.addColorStop(0, 'cyan');
        gradient.addColorStop(0.5, 'blue');
    }
    else {
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, 'white');
        gradient.addColorStop(1, 'black');
    }
}

class Symbol {

    constructor(x, y, fontSize, canvasHeight, gradient=true) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = 25;
        this.canvasHeight = canvasHeight;
        this.gradientBool = gradient;
    }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));

        if (this.gradientBool) {
            context.fillStyle = gradient;
        } else {
            context.fillStyle = getRandomColour(); // INDIVIDUAL RAINBOW TEXT 
        }
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 12;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }

    #initialize(){
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight, true);
        }
    }

    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function activateCodeFall(colour) {
    console.log("HERE");
    canvasDiv = document.getElementById('codeFallDiv');
    canvasDiv.style.display = "block";
    changeGradient(colour);
    animate(0);
}

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})

window.onload = function() {
    activateCodeFall("WHITE");
    console.log("WINDOW IS LOADED");
}