 $("#keyboard .key").click(function(){ console.log(this.id); })

var startPos = 1000;

var notes = function(value){
	return this[value];
};

notes.a = {y : "55"};
notes.b = {y : "61"};

$(".game-container").html("<canvas id='canvas' height=100 width=" + $(this).innerWidth() + "></canvas>");
var ctx = document.getElementById('canvas').getContext('2d');

function note(ctx, x, y)
{
	ctx.fillStyle="black";
	ctx.arc(x, y, 6, 0, 2 * Math.PI, false);
	ctx.fill();
}

note(ctx, startPos, notes.a.y);
note(ctx, startPos - 100, notes.b.y);
