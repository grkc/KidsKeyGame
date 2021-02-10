var width = window.innerWidth * 90 / 100;
var height = window.innerHeight * 90 / 100;
var app;
var colors = [0xBF1515, 0x1520BF, 0x2fbf15, 0xbf5915, 0x9d15bf];
var maximusRadius = height * 12 / 100;
var minimumRadius = height * 4 / 100;
var maximusSideSquare = height * 24 / 100;
var minimumSideSquare = height * 8 / 100;
var maximumSideTriangle = height * 14 / 100;
var minimumSideTriangle = height * 6 / 100;
var deg = 360;
var circleXConst = width * 35 / 100;
var circleYConst = height * 85 / 100;
var squareXConst = width * 50 / 100;
var squareYConst = height * 85 / 100;
var triangleXConst = width * 65 / 100;
var triangleYConst = height * 85 / 100;
const persent = 70 / 100;
var countFigureS = 0,
    countFigureT = 0,
    countFigureC = 0;
var flagForS = 0,
    flagForC = 0,
    flagForT = 0;

var model = {
    createCanvas: function() {
        app = new PIXI.Application({ width: width, height: height, backgroundColor: 0xFFFFFF, });
        app.view.style.border = "8px dashed black";
        document.body.appendChild(app.view);
    },

    drawCircleConst: function() {
        var radius = maximusRadius;
        var circleX = width * 35 / 100;
        var circleY = height * 85 / 100;
        var circle = new PIXI.Graphics();
        circle.position.x = circleX;
        circle.position.y = circleY;
        circle.pivot.set(circleX, circleY);
        circle.lineStyle(3, 0x000000);
        circle.beginFill(0x000000, 0);
        circle.drawCircle(circleX, circleY, radius);
        circle.endFill();
        circle.interactive = true;
        circle.buttonMode = true;
        app.stage.addChild(circle);
    },

    drawSquareConst: function() {
        var side = maximusSideSquare;
        var squareX = width * 50 / 100;
        var squareY = height * 85 / 100;
        var square = new PIXI.Graphics();
        square.position.x = squareX;
        square.position.y = squareY;
        square.pivot.set(squareX, squareY);
        square.lineStyle(3, 0x000000);
        square.beginFill(0x000000, 0);
        square.drawRect(squareX - side / 2, squareY - side / 2, side, side);
        square.endFill();
        square.interactive = true;
        square.buttonMode = true;
        app.stage.addChild(square);
    },

    drawTriangleConst: function() {
        var side = maximumSideTriangle;
        var triangleX = width * 65 / 100;
        var triangleY = height * 85 / 100;
        var x2 = side * Math.cos(0) + triangleX;
        var y2 = side * Math.sin(0) + triangleY;
        var x1 = side * Math.cos((1 / 3) * (2 * Math.PI)) + triangleX;
        var y1 = side * Math.sin((1 / 3) * (2 * Math.PI)) + triangleY;
        var x3 = side * Math.cos((2 / 3) * (2 * Math.PI)) + triangleX;
        var y3 = side * Math.sin((2 / 3) * (2 * Math.PI)) + triangleY;
        var triangle = new PIXI.Graphics();
        triangle.position.x = triangleX;
        triangle.position.y = triangleY;
        triangle.pivot.set(triangleX, triangleY);
        triangle.lineStyle(3, 0x000000);
        triangle.beginFill(0x000000, 0);
        triangle.moveTo(x1, y1);
        triangle.lineTo(x2, y2);
        triangle.lineTo(x3, y3);
        triangle.lineTo(x1, y1);
        triangle.endFill();
        triangle.interactive = true;
        triangle.buttonMode = true;
        app.stage.addChild(triangle);
    },

    drawCircle: function() {
        rand = randomFunction.randomOneNum(colors.length);
        var radius = randomFunction.randomTwoNum(minimumRadius, maximusRadius);
        var circleX = searchArea()[0];
        var circleY = searchArea()[1];
        var circle = new PIXI.Graphics();
        circle.position.x = circleX;
        circle.position.y = circleY;
        circle.pivot.set(circleX, circleY);
        circle.lineStyle(3, colors[rand]);
        circle.beginFill(colors[rand], 0.5);
        circle.drawCircle(circleX, circleY, radius);
        circle.endFill();
        circle.interactive = true;
        circle.buttonMode = true;
        circle
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMoveCircle)
            .on('touchmove', onDragMoveCircle);
        app.stage.addChild(circle);
    },

    drawSquare: function() {
        rand = randomFunction.randomOneNum(colors.length);
        var side = randomFunction.randomTwoNum(minimumSideSquare, maximusSideSquare);
        var squareX = searchArea()[0];
        var squareY = searchArea()[1];
        var square = new PIXI.Graphics();
        var rotateSquare = randomFunction.randomOneNum(deg);
        square.position.x = squareX;
        square.position.y = squareY;
        square.pivot.set(squareX, squareY);
        square.rotation = rotateSquare;
        square.lineStyle(3, colors[rand]);
        square.beginFill(colors[rand], 0.5);
        square.drawRect(squareX - side / 2, squareY - side / 2, side, side);
        square.endFill();
        square.interactive = true;
        square.buttonMode = true;
        square
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMoveSquare)
            .on('touchmove', onDragMoveSquare);
        app.stage.addChild(square);
    },

    drawTriangle: function() {
        rand = randomFunction.randomOneNum(colors.length)
        var side = randomFunction.randomTwoNum(minimumSideTriangle, maximumSideTriangle);
        var triangleX = searchArea()[0];
        var triangleY = searchArea()[1];
        var x1 = side * Math.cos(0) + triangleX;
        var y1 = side * Math.sin(0) + triangleY;
        var x2 = side * Math.cos((1 / 3) * (2 * Math.PI)) + triangleX;
        var y2 = side * Math.sin((1 / 3) * (2 * Math.PI)) + triangleY;
        var x3 = side * Math.cos((2 / 3) * (2 * Math.PI)) + triangleX;
        var y3 = side * Math.sin((2 / 3) * (2 * Math.PI)) + triangleY;
        var triangle = new PIXI.Graphics();
        var rotateTriangle = randomFunction.randomOneNum(deg);
        triangle.position.x = triangleX;
        triangle.position.y = triangleY;
        triangle.pivot.set(triangleX, triangleY);
        triangle.rotation = rotateTriangle;
        triangle.lineStyle(3, colors[rand]);
        triangle.beginFill(colors[rand], 0.5);
        triangle.moveTo(x1, y1);
        triangle.lineTo(x2, y2);
        triangle.lineTo(x3, y3);
        triangle.lineTo(x1, y1);
        triangle.endFill();
        triangle.interactive = true;
        triangle.buttonMode = true;
        triangle
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMoveTriangle)
            .on('touchmove', onDragMoveTriangle);

        app.stage.addChild(triangle);
    },

    drawLine: function() {
        var lineX = 0;
        var lineY = height * persent;
        var line = new PIXI.Graphics();
        line.lineStyle(3, 0x000000);
        line.moveTo(lineX, lineY);
        line.lineTo(width, lineY);
        line.endFill();
        line.interactive = true;
        line.buttonMode = true;
        app.stage.addChild(line);
    }

}

function searchArea() {
    var areaWidthEnd = width * 85 / 100;
    var areaWidthStart = width * 15 / 100;
    var areaHeightEnd = height * 55 / 100;
    var areaHeightStart = height * 10 / 100;
    var X = randomFunction.randomTwoNum(areaWidthStart, areaWidthEnd);
    var Y = randomFunction.randomTwoNum(areaHeightStart, areaHeightEnd);
    return [X, Y];
}

function onDragStart(event) {

    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    if (this.y >= height * 63 / 100) {
        this.x = searchArea()[0];
        this.y = searchArea()[1];
    }
    if (flagForC === 1) {
        countFigureC--;
        output(countFigureS, countFigureC, countFigureT);
        flagForC = 0;
    }
    if (flagForS === 1) {
        countFigureS--;
        output(countFigureS, countFigureC, countFigureT);
        flagForS = 0;
    }
    if (flagForT === 1) {
        countFigureT--;
        output(countFigureS, countFigureC, countFigureT);
        flagForT = 0;
    }

}

function onDragMoveCircle() {
    if (this.dragging) {
        prPlacex = this.x;
        prPlacey = this.y;
        let newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
        if (this.x >= circleXConst - maximusRadius * persent && this.x <= circleXConst + maximusRadius * persent)
            if (this.y >= circleYConst - maximusRadius * persent && this.y <= circleYConst + maximusRadius * persent) {
                this.clear();
                flagForC = 1;
            }
    }
}

function onDragMoveSquare() {
    if (this.dragging) {
        let newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
        if (this.x >= squareXConst - maximusSideSquare * persent && this.x <= squareXConst + maximusSideSquare * persent)
            if (this.y >= squareYConst - maximusSideSquare * persent && this.y <= squareYConst + maximusSideSquare * persent) {
                this.clear();
                flagForS = 1;
            }

    }
}

function onDragMoveTriangle() {
    if (this.dragging) {
        let newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
        if (this.x >= triangleXConst - maximumSideTriangle * persent && this.x <= triangleXConst + maximumSideTriangle * persent)
            if (this.y >= triangleYConst - maximumSideTriangle * persent && this.y <= triangleYConst + maximumSideTriangle * persent) {
                this.clear();
                flagForT = 1;
            }
    }
}
var randomFunction = {
    randomOneNum: function(Numb) { return Math.floor(Math.random() * Numb); },
    randomTwoNum: function(firstNumb, secondNumb) { return Math.floor(Math.random() * (secondNumb - firstNumb) + firstNumb); }
}

function output(S, C, T) {
    var left = document.getElementById('leftovers');
    if ((S + C + T) === 0)
        left.innerHTML = "ВЫ ПОБЕДИЛИ!!!";
    else
        left.innerHTML = "Осталось<br><hr>Квадраты: " + S + "<br>Круги: " + C + "<br>Треугольники: " + T;
}

var view = {
    loadGame: function() {
        model.createCanvas();
        countFunc = randomFunction.randomTwoNum(5, 10);
        var inf = document.getElementById('info');
        inf.innerHTML = "Всего фигур: " + countFunc + "<br>";
        for (var i = 0; i < countFunc; i++) {
            var numverOfFunc = randomFunction.randomTwoNum(0, 3);
            if (numverOfFunc === 0) {
                model.drawCircle();
                countFigureC++;
            }
            if (numverOfFunc === 1) {
                model.drawTriangle();
                countFigureT++;
            }
            if (numverOfFunc === 2) {
                model.drawSquare();
                countFigureS++;
            }
        }
        inf.innerHTML += "Квадраты: " + countFigureS + "<br>Круги: " + countFigureC + "<br>Треугольники: " + countFigureT;
        model.drawCircleConst();
        model.drawSquareConst();
        model.drawTriangleConst();
        model.drawLine();
    }
}
view.loadGame();