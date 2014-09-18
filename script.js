 $("#keyboard .key").click(function(){ console.log(this.id); })


$(".game-container").html("<canvas id='canvas' height=100 width=" + $(this).innerWidth() + "></canvas>");
var ctx = document.getElementById('canvas').getContext('2d');
ctx.fillStyle="red";
ctx.strokeStyle = "black";
ctx.arc(1000, 55, 6, 0, 2 * Math.PI, false);
ctx.fill();
ctx.stroke();
