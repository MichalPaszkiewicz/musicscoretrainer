 $("#keyboard .key").click(function(){ playKey(this.id); })

function playKey(key)
{
	console.log(key);
}

var startPos = 300;

var notes = function(value){
	return this[value];
};

notes.g = {y : "13"};
notes.f = {y : "20"};
notes.e = {y : "27"};
notes.d = {y : "34"};
notes.c = {y : "41"};
notes.b = {y : "48"};
notes.a = {y : "55"};
notes.octave = {y : "49"};


$(".game-container").html("<canvas id='canvas' height=100 width=" + $(this).innerWidth() + "></canvas>");
var ctx = document.getElementById('canvas').getContext('2d');
ctx.globalAlpha = 0.9;

function note(ctx, x, y)
{
	ctx.beginPath();
	ctx.fillStyle="black";
	ctx.arc(x, y, 6, 0, 2 * Math.PI, false);
	ctx.fill();
}

note(ctx, startPos, notes.a.y);
note(ctx, startPos - 100, notes.g.y);
note(ctx, startPos - 200, notes.d.y);
