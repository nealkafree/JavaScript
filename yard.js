function init() {
    console.info("initialized example 1");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    function currentTime() {
        return new Date().getTime();
    }

    var passed = 0;
    var whenLastFrame = currentTime();

    var bigTurn = 0;
    var smallTurn = 0;

    function picture() {
        var now = currentTime();
        passed = now - whenLastFrame;
        whenLastFrame = now;

        ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, -20, canvas.width / 2, 40);

        for (var i = bigTurn; i <= 2 * Math.PI; i += Math.PI / 6) {
            ctx.save();
            ctx.rotate(Math.PI * 2 - i);
            ctx.fillStyle = "#333333";
            ctx.fillRect(0, -10, 200, 20);
            ctx.translate(200, 0);
            ctx.rotate(i);
            ctx.fillStyle = "#666666";
            ctx.fillRect(0, -2, 100, 4);
            ctx.translate(100, 0);
            for (var j = smallTurn; j <= 2 * Math.PI; j += Math.PI / 4) {
                ctx.save();
                ctx.rotate(Math.PI * 2 - j);
                ctx.fillStyle = "#999999";
                ctx.fillRect(0, -5, 50, 10);
                ctx.restore();
            }
            ctx.restore();
        }

        smallTurn = smallTurn + Math.PI * passed / 4000;
        if (smallTurn > Math.PI / 4) smallTurn = smallTurn - Math.PI / 4;
        bigTurn = bigTurn + Math.PI * passed / 6000;
        if (bigTurn > Math.PI / 6) bigTurn = bigTurn - Math.PI / 6;

        window.requestAnimationFrame(picture);
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 2);
    window.requestAnimationFrame(picture);
}