function init() {
    console.info("initialized example 1");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    function currentTime() {
        return new Date().getTime();
    }

    var zeroTime = currentTime();
    var passed = 0;
    var whenLastFrame = currentTime();

    var bigTurn = 0;

    function picture() {
        var now = currentTime();
        passed = now - whenLastFrame;
        whenLastFrame = now;

        ctx.fillStyle = "#000000";
        ctx.fillRect(-20, 0, 40, canvas.height / 2);


        bigTurn = bigTurn + Math.PI * passed / 6000;
        if (bigTurn > Math.PI / 6) bigTurn = bigTurn - Math.PI / 6;

        window.requestAnimationFrame(picture());
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    window.requestAnimationFrame(picture());
}