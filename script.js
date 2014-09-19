var noteCountDownInit = 200;
var noteCountDown = noteCountDownInit;
var canvasSpeed = 800;

var score = 0;
var missedNotes = 0;
var updateRate = 10;
 
 $("#keyboard .key").click(function(){ playKey(this.id); })

$(".game-container").html("<canvas id='canvas' height=100 width=" + $(this).innerWidth() + "></canvas>");
var ctx = document.getElementById('canvas').getContext('2d');
ctx.globalAlpha = 0.9;

function displayLevel()
{
	var level = getLevel();
	$(".level").text(level);
}

displayLevel();

function factoryReset(){
	if(confirm("Are you sure you want to reset this game and go back to level 1?"))
	{
		localStorage.setItem("musicscoretrainer-level", 1);
		setLevel();
	}
}

function getLevel()
{
	var level = localStorage.getItem("musicscoretrainer-level");

	if(level == null)
	{
		localStorage.setItem("musicscoretrainer-level",1);
		return 1;
	}
	else{
		return level;
	}
}

function setLevel()
{
	var level = getLevel();

	if(score == 30)
	{
		localStorage.setItem("musicscoretrainer-level", parseInt(level) + 1)
	}
	
	displayLevel();
}

function showKeyNames()
{
	var uiNotes = $(".key");
	for(var i = 0; i < uiNotes.length; i++)
	{
		console.log(uiNotes[i].id);
		$(uiNotes[i]).html(uiNotes[i].id.toUpperCase());
	}
}

function showBlackKeyNames()
{
	var uiNotes = $(".blackkey");
	for(var i = 0; i < uiNotes.length; i++)
	{
		console.log(uiNotes[i].id);
		$(uiNotes[i]).html(uiNotes[i].id.toUpperCase());
	}
}

function hideKeyNames()
{
	$(".key").text("");
}

function toggleMenu()
{
	$(".settings-container").toggleClass("hidden");
}

function resetScore()
{
	score = 0;
	missedNotes = 0;
	liveNotes = [];
	addRandomNote();
}

function updateScore()
{
	var totalNotes = score + missedNotes;
	$(".scoreBoard").text("Score: " + score + "/" + totalNotes);
	
	if(totalNotes == 30)
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
addRandomNote();

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
		
		if(noteCountDownInit > 20)
		{
			noteCountDownInit--;
		}
		
		updateScore();
	}
}

var timer = function(){};

function runGame()
{
	var level = getLevel();
	
	if(level <= 5)
	{
		showKeyNames();
	}
	else if(level <= 10)
	{
		showBlackKeyNames();
	}
	else
	{
		hideKeyNames();
	}
	
	noteCountDownInit = Math.max(50, noteCountDownInit - (level - 1) * 5 );

	if(level >= 40)
	{
		updateRate = 5;
		canvasSpeed = Math.max(400, (2 * canvasSpeed) - (800 + (level - 41)));
	}
	else
	{
		canvasSpeed = Math.max(200, canvasSpeed - (level - 1) * 10);
	}
	
	timer = setInterval(function(){
		updateLiveNotes();
		clearCanvas();
		drawLiveNotes();
	}, updateRate)
}

function stopGame()
{
	setLevel();
	clearInterval(timer);
	clearCanvas();
	resetScore();
	updateScore();
}
