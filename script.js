var noteCountDownInit = 200;
var noteCountDown = noteCountDownInit;
var canvasSpeed = 800;

var score = 0;
var missedNotes = 0;

 
 $("#keyboard .key").click(function(){ playKey(this.id); })

$(".game-container").html("<canvas id='canvas' height=100 width=" + $(this).innerWidth() + "></canvas>");
var ctx = document.getElementById('canvas').getContext('2d');
ctx.globalAlpha = 0.9;

function showKeyNames()
{
	var uiNotes = $(".key");
	for(var i = 0; i < uiNotes.length; i++)
	{
		console.log(uiNotes[i].id);
		$(uiNotes[i]).html(uiNotes[i].id.toUpperCase());
	}
}

function toggleMenu()
{
	$(".settings-container").toggleClass("hidden");
}

function resetScore()
{
	score = 0;
	missedNotes = 0;
}

function hideKeyNames()
{
	$(".key").text("");
}

function updateScore()
{
	var totalNotes = score + missedNotes;
	$(".scoreBoard").text("Score: " + score + "/" + totalNotes);
	
	if(totalNotes == 20)
	{
		stopGame();
		toggleMenu();
	}
}

function playKey(key)
{
	if(key == liveNotes[0].note)
	{
		liveNotes.shift();
		score++;
		updateScore();
	}
	//console.log(key);
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

function addNote(note)
{
	liveNotes.push({x : startPos, note : note});
}

function addRandomNote()
{
	var number = Math.floor( 7 * Math.random() );
	var letter = String.fromCharCode(number + 97);
	addNote(letter);
}

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
		liveNotes[i].x -= canvas.width / canvasSpeed;
	}
	
	if(liveNotes.length > 0 && liveNotes[0].x <= 10)
	{
		missedNotes++;
		liveNotes.shift();
	}
	
	noteCountDown--;
	
	if(noteCountDown == 0)
	{
		addRandomNote();
		
		noteCountDown = noteCountDownInit;
		
		noteCountDownInit--;
		
		updateScore();
	}
}

var timer = function(){};

function runGame()
{
	timer = setInterval(function(){
		updateLiveNotes();
		clearCanvas();
		drawLiveNotes();
	}, 10)
}

function stopGame()
{
	clearInterval(timer);
	clearCanvas();
	resetScore();
}
