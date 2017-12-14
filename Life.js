function init() {
    console.info("initialized example 1");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    var gridStep = 20;
    var planet = [];

    var creaturesLimit = 5;
    var stepsToWin = 100;
    var creaturesToWin = 5;

    var creatures = 0;
    var winningSteps = 0;
    var steps = 0;

    var state = "Start";

    function start() {
        planet.splice(0, planet.length);
        for (var i = 0; i < (canvas.height - 140) / gridStep; i++) {
            var ground = [];
            for (var j = 0; j < canvas.width / gridStep; j++)
                ground.push(false);
            planet.push(ground);
        }
        creatures = 0;
        steps = 0;
        winningSteps = 0;
        classicPicture();
        startPicture();
    }

    function game() {
        if (creatures === 0) {
            state = "Start";
            start();
        }
        if (stepsToWin === winningSteps) {
            state = "Victory";
            victory();
        }
        if (state === "Game") {
            classicPicture();
            gamePicture();
            step();
            window.requestAnimationFrame(game);
        }
    }

    function classicPicture() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        for (var i = 0; i <= canvas.height - 140; i += gridStep) {
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
        }
        for (i = 0; i <= canvas.width; i += gridStep) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height - 140);
        }
        ctx.moveTo(0, canvas.height - 100);
        ctx.lineTo(canvas.width, canvas.height - 100);
        ctx.stroke();
        ctx.font = "30px serif";
        ctx.fillText("Задача: сохранить " + creaturesToWin + " существ, в течение " + stepsToWin + " ходов!",
            20, canvas.height - 110);
        ctx.fill();
        for (i = 0; i < planet.length; i++)
            for (var j = 0; j < planet[i].length; j++)
                if (planet[i][j] === true) ctx.fillRect(j * gridStep, i * gridStep, gridStep, gridStep);
    }

    function startPicture() {
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(100, canvas.height - 100);
        ctx.lineTo(100, canvas.height);
        ctx.moveTo(800, canvas.height - 100);
        ctx.lineTo(800, canvas.height);
        ctx.stroke();
        ctx.font = "40px serif";
        ctx.fillText("Максимальное количество существ:", 120, canvas.height - 40);
        ctx.font = "60px serif";
        ctx.fillText(creaturesLimit - creatures, 820, canvas.height - 30);

        ctx.fillStyle = "#00aa00";
        ctx.beginPath();
        ctx.moveTo(30, canvas.height - 80);
        ctx.lineTo(30, canvas.height - 20);
        ctx.lineTo(80, canvas.height - 50);
        ctx.closePath();
        ctx.fill();
    }

    function gamePicture() {
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(100, canvas.height - 100);
        ctx.lineTo(100, canvas.height);
        ctx.moveTo(200, canvas.height - 100);
        ctx.lineTo(200, canvas.height);
        ctx.moveTo(200, canvas.height - 50);
        ctx.lineTo(canvas.width, canvas.height - 50);
        ctx.moveTo(400, canvas.height - 100);
        ctx.lineTo(400, canvas.height);
        ctx.moveTo(700, canvas.height - 100);
        ctx.lineTo(700, canvas.height);
        ctx.stroke();
        ctx.fillStyle = "#ee0000";
        ctx.fillRect(120, canvas.height - 80, 60, 60);
        ctx.fillStyle = "#ff8800";
        ctx.fillRect(20, canvas.height - 80, 20, 60);
        ctx.fillRect(60, canvas.height - 80, 20, 60);
        ctx.fillStyle = "#000000";
        ctx.font = "22px serif";
        ctx.fillText("Живых существ:", 220, canvas.height - 70);
        ctx.fillText("Осталось ходов до победы:", 420, canvas.height - 70);
        ctx.fillText("Всего прошло ходов:", 720, canvas.height - 70);
        ctx.font = "30px serif";
        ctx.fillText(creatures, 220, canvas.height - 17);
        ctx.fillText(stepsToWin - winningSteps, 420, canvas.height - 17);
        ctx.fillText(steps, 720, canvas.height - 17);
    }

    canvas.addEventListener('click', function (e) {
        if (state === "Victory") {
            state = "Start";
            window.setTimeout(start,500);
        }

        if (event.layerY < canvas.height - 100 && creatures < creaturesLimit && state === "Start" &&
            planet[Math.floor(event.layerY / gridStep)][Math.floor(event.layerX / gridStep)] === false) {
            planet[Math.floor(event.layerY / gridStep)][Math.floor(event.layerX / gridStep)] = true;
            creatures++;
            classicPicture();
            startPicture();
        }

        if (event.layerX < 100 && event.layerY > (canvas.height - 100)) {
            if (state === "Game") {
                state = "Paused";
                ctx.clearRect(1, canvas.height - 99, 98, 99);
                ctx.fillStyle = "#00aa00";
                ctx.beginPath();
                ctx.moveTo(30, canvas.height - 80);
                ctx.lineTo(30, canvas.height - 20);
                ctx.lineTo(80, canvas.height - 50);
                ctx.closePath();
                ctx.fill();
            } else {
                state = "Game";
                game();
            }
        }

        if (event.layerX > 100 && event.layerX < 200 && event.layerY > (canvas.height - 100) &&
            (state === "Game" || state === "Paused")) {
            state = "Start";
            start();
        }
    });

    function step() {
        var newPlanet = [];
        for (var i = 0; i < planet.length; i++) {
            var ground = [];
            for (var j = 0; j < planet[0].length; j++) {
                ground.push(destiny(i, j));
            }
            newPlanet.push(ground);
        }
        if (creatures >= creaturesToWin) winningSteps++;
        steps++;
        planet = newPlanet;
    }

    function destiny(i, j) {
        var neighbours = neighboursCheck(i, j);
        if (neighbours === 3 && !planet[i][j]) {
            creatures++;
            return true;
        }
        if (planet[i][j] && (neighbours < 2 || neighbours > 3)) {
            creatures--;
            return false;
        }
        return planet[i][j];
    }

    function neighboursCheck(i, j) {
        var neighbours = 0;
        if (planet[lookY(i - 1)][lookX(j - 1)])
            neighbours += 1;
        if (planet[lookY(i - 1)][j])
            neighbours += 1;
        if (planet[lookY(i - 1)][lookX(j + 1)])
            neighbours += 1;
        if (planet[i][lookX(j - 1)])
            neighbours += 1;
        if (planet[i][lookX(j + 1)])
            neighbours += 1;
        if (planet[lookY(i + 1)][lookX(j - 1)])
            neighbours += 1;
        if (planet[lookY(i + 1)][j])
            neighbours += 1;
        if (planet[lookY(i + 1)][lookX(j + 1)])
            neighbours += 1;
        return neighbours;
    }

    function lookX(v) {
        if (v < 0) return planet[0].length - 1;
        if (v >= planet[0].length) return 0;
        return v;
    }

    function lookY(v) {
        if (v < 0) return planet.length - 1;
        if (v >= planet.length) return 0;
        return v;
    }

    function victory() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.font = "200px serif";
        ctx.fillText("Победа!", 100, canvas.height / 2);
    }

    start();
}