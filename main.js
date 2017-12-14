function init() {
    console.info("initialized example 1");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = '329609-Sepik_1366x768.jpg';
    var clickState;

    function currentTime() {
        return new Date().getTime();
    }

    var zeroTime = currentTime();
    var passed = 0;
    var whenLastFrame = currentTime();

    var anim = [];
    anim.push("Ball 1.png");
    anim.push("Ball 2.png");
    anim.push("Ball 3.png");
    anim.push("Ball 4.png");

    var bang = [];
    bang.push("1.png");
    bang.push("2.png");
    bang.push("3.png");
    bang.push("4.png");
    bang.push("5.png");
    bang.push("6.png");
    bang.push("7.png");
    bang.push("8.png");
    bang.push("9.png");
    bang.push("10.png");
    bang.push("11.png");
    bang.push("12.png");

    var stack = [];
    var dying = [];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        var now = currentTime();
        passed = now - whenLastFrame;
        whenLastFrame = now;
        for (var i = 0; i < stack.length; i++) picture(stack[i]);
        for (i = 0; i < dying.length; i++) {
            var frame = Math.floor(((currentTime() - dying[i].deathTime) / 200) % 12);
            console.log(frame);
            var an = new Image();
            an.src = dying[i].pul[frame];
            ctx.drawImage(an, dying[i].coordinateX, dying[i].coordinateY, dying[i].width, dying[i].height);
            if (frame === 11) {
                dying.splice(i, 1);
                i = i - 1;
            }
        }
        window.requestAnimationFrame(draw);
    }

    function picture(ball) {
        var frame = Math.floor(((currentTime() - zeroTime) / 200) % 4);
        var an = new Image();
        an.src = ball.pul[frame];
        ball.coordinateX = ball.coordinateX + passed * ball.speedX / 1000;
        ball.coordinateY = ball.coordinateY + passed * ball.speedY / 1000;
        choise(ball);
        /*ctx.save();
        var cos = ball.speedX / Math.sqrt(ball.speedX * ball.speedX + ball.speedY + ball.speedY);
        var sin = ball.speedY / Math.sqrt(ball.speedX * ball.speedX + ball.speedY + ball.speedY);
        var r = Math.acos(cos);
        if (cos < 0) r = Math.asin(sin);
        if (sin < 0 && cos < 0) r = r + Math.PI;
        ctx.rotate(r);
        console.log(ball.speedY);
        console.log(Math.sqrt(ball.speedX * ball.speedX + ball.speedY + ball.speedY));
        console.log(sin);*/
        ctx.drawImage(an, ball.coordinateX, ball.coordinateY, ball.width, ball.height);
        //ctx.restore();
    }

    function choise(ball) {
        if (ball.coordinateX + ball.width >= canvas.width || ball.coordinateX <= 0) ball.speedX = ball.speedX * -1;
        if (ball.coordinateY + ball.height >= canvas.height || ball.coordinateY <= 0) ball.speedY = ball.speedY * -1;
        if (ball.coordinateX + ball.width >= canvas.width) ball.coordinateX = canvas.width - ball.width;
        if (ball.coordinateY + ball.height >= canvas.height) ball.coordinateY = canvas.height - ball.height;
        if (ball.coordinateX <= 0) ball.coordinateX = 0;
        if (ball.coordinateY <= 0) ball.coordinateY = 0;
    }

    canvas.addEventListener('click', function (e) {
        clickState = "miss";
        for (var i = 0; i < stack.length; i++) {
            if (event.layerX > stack[i].coordinateX && event.layerX < stack[i].coordinateX + stack[i].width &&
                event.layerY > stack[i].coordinateY && event.layerY < stack[i].coordinateY + stack[i].height) {
                dying.push(death = {
                    pul: bang,
                    coordinateX: stack[i].coordinateX,
                    coordinateY: stack[i].coordinateY,
                    deathTime: currentTime(),
                    width: stack[i].width,
                    height: stack[i].height
                });
                stack.splice(i, 1);
                i = i - 1;
                clickState = "hit";
            }
        }
        if (clickState === "miss") {
            stack.push(ball = {
                pul: anim,
                coordinateX: event.layerX,
                coordinateY: event.layerY,
                speedX: Math.random() * 1000,
                speedY: Math.random() * 1000,
                deathTime: 0,
                width: 144,
                height: 114
            });
        }
    });

    window.requestAnimationFrame(draw)

}