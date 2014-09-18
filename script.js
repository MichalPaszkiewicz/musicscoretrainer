 $("#keyboard .key").click(function(){ playKey(this.id); })

$(".game-container").html("<canvas id='canvas' height=100 width=" + $(this).innerWidth() + "></canvas>");
var ctx = document.getElementById('canvas').getContext('2d');
ctx.globalAlpha = 0.9;

function playKey(key)
{
	console.log(key);
}

var startPos = canvas.width;

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

var liveNotes = [];
liveNotes.push({x : startPos, note : "a"});
liveNotes.push({x : startPos - 100, note : "g"});
liveNotes.push({x : startPos - 200, note : "d"});

function clearCanvas()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawNote(ctx, x, y)
{
	ctx.beginPath();
	ctx.fillStyle="black";
	ctx.arc(x, y, 6, 0, 2 * Math.PI, false);
	ctx.fill();
}

function drawLiveNotes()
{
	for(var i = 0; i < liveNotes.length; i++)
	{
		drawNote(ctx, liveNotes[i].x, notes[liveNotes[i].note].y);
	}
}

function updateLiveNotes()
{
	for(var i = 0; i < liveNotes.length; i++)
	{
		liveNotes[i].x -= canvas.width / 100;
	}
}

function runGame()
{
	setInterval(function(){
		updateLiveNotes();
		clearCanvas();
		drawLiveNotes();
	}, 50)
}
