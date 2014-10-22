var noteCountDownInit = 200;
var noteCountDown = noteCountDownInit;
var canvasSpeed = 800;
var paused = false;
var sharpsOn = false;

var gameSettings = {};

var lastNote = null;
var lastNoteCorrect = true;
var lowerLastOctave = false;

var score = 0;
var missedNotes = 0;
var updateRate = 10;
 
 $("#keyboard .key").click(function(){ playKey(this.id); });
 $(".product").click(function(){ buy(this.id); });

$(".game-container").html("<canvas id='canvas' height=100 width=" + $(this).innerWidth() + "></canvas>");
var ctx = document.getElementById('canvas').getContext('2d');
ctx.globalAlpha = 0.9;

function displayLevel()
{
	var level = getLevel();
	$(".level").text(level);
	
	var coins = getCoins();
	$(".coins").text(coins);
}

displayLevel();

function factoryReset(){
	sharpsOn = false;
	if(confirm("Are you sure you want to reset this game and go back to level 1?"))
	{
		localStorage.setItem("musicscoretrainer-level", 1);
		setLevel();
	}
}

function getFromLocalStorage(item)
{
	var result = localStorage.getItem("musicscoretrainer-" + item);

	if(result == null)
	{
		localStorage.setItem("musicscoretrainer-" + item,1);
		return 1;
	}
	else{
		return result;
	}
}

function getLevel()
{
	return getFromLocalStorage("level");
}

function getCoins()
{
	return getFromLocalStorage("coins");
}

function increaseLevel()
{
	var level = getLevel();
	localStorage.setItem("musicscoretrainer-level", parseInt(level) + 1);
}

function setSettings()
{
	localStorage.setItem("musicscoretrainer-settings", JSON.stringify(gameSettings)); 
}

function getSettings()
{
	gameSettings = JSON.parse(localStorage.getItem("musicscoretrainer-settings"));
	
	if(gameSettings == null)
	{
		gameSettings = {};
		gameSettings.hasBassClef = false;
		gameSettings.hasSynth = false;
		gameSettings.currentClef = "treble";
		setSettings();
		return gameSettings;
	}
	else
	{
		return gameSettings;
	}
}

function clefButtonUpdate()
{
	if(getSettings().hasBassClef)
	{
		$(".switch-clef").removeClass("hidden");
	}
}

function synthButtonUpdate()
{
	if(getSettings().hasSynth)
	{
		$(".synth-button").removeClass("hidden");
	}
}

function startButtonDisplay()
{
	clefButtonUpdate();
	synthButtonUpdate();
}

startButtonDisplay();

function setLevel()
{
	if(score == 30)
	{
		increaseLevel();
	}
	
	displayLevel();
}

function increaseCoins()
{
	var coins = getCoins();
	
	localStorage.setItem("musicscoretrainer-coins", parseInt(coins) + 1);
}

function spendCoins(amount)
{
	var coins = getCoins();
	localStorage.setItem("musicscoretrainer-coins", parseInt(coins) - parseInt(amount));
}

function showKeyNames()
{
	var uiNotes = $(".key");
	for(var i = 0; i < uiNotes.length; i++)
	{
		//console.log(uiNotes[i].id);
		$(uiNotes[i]).html(uiNotes[i].id.toUpperCase());
	}
}

function showBlackKeyNames()
{
	var uiNotes = $(".blackkey");
	for(var i = 0; i < uiNotes.length; i++)
	{
		//console.log(uiNotes[i].id);
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

function toggleShop()
{
	$(".product").filter( function(index){ return parseInt($(this).find(".product-cost").text()) <= parseInt($(".shop .coins").text())} ).addClass("can-buy");
	$(".product").filter( function(index){ return parseInt($(this).find(".product-cost").text()) > parseInt($(".shop .coins").text())} ).removeClass("can-buy");
	
	$(".shop").toggleClass("hidden");
}

function resetScore()
{
	score = 0;
	missedNotes = 0;
	liveNotes = [];
}

function updateScore()
{
	var totalNotes = score + missedNotes;
	$(".scoreBoard").text("Score: " + score + "/" + totalNotes);
	
	if(totalNotes == 30)
	{
		stopGame();
	}
}
  
function playKey(key)
{
	if(liveNotes.length > 0)
	{
		if(liveNotes[0].octave < notes[liveNotes[0].note].octave)
		{
			lowerLastOctave = true;
		}
		else
		{
			lowerLastOctave = false;
		}
	}
	
	var notePlayed = key.replace("#", "s");
	
	if(soundIssues == false){
		var currentFreq = notes[notePlayed].freq;
		
		if(lowerLastOctave)
		{
			currentFreq = currentFreq / 2;
		}
		
		playSound(currentFreq);
	}
	
	if(liveNotes.length > 0)
	{
		if(notePlayed == liveNotes[0].note)
		{
			liveNotes.shift();
			score++;
			updateOctave();
			updateScore();
			increaseCoins();
			lastNoteCorrect = true;
		}
		else
		{
			lastNoteCorrect = false;
		}
	}
	
	lastNote = notePlayed;
	//console.log(key);
}

function buy(product)
{
	if(product == "skip-level")
	{
		if(getCoins() >= 100)
		{
			increaseLevel();
			spendCoins(100);
			displayLevel();
			toggleShop();
		}
		else
		{
			alert("Not enough cash, m8!");
		}
	}
	else if(product == "bass-clef")
	{
		if(getCoins() >= 400)
		{
			gameSettings.hasBassClef = true;
			spendCoins(400);
			setSettings();
			clefButtonUpdate();
		}
		else
		{
			alert("Not enough cash, m8!");
		}
	}
	else
	{
		alert("Not implemented!");
	}
}

var startPos = canvas.width;

var notes = function(value){
	return this[value];
};

//note: g octave 4 here is actually g5
function setTreble(){
	gameSettings.currentClef = "treble";
	setSettings();
	$(".current-clef").text("Treble");
	notes.gs = {y : "13", octave : 4, sharp : true, freq : 830.61};
	notes.g = {y : "13", octave : 4, sharp : false, freq : 783.99};
	notes.fs = {y : "20", octave : 4, sharp : true, freq : 739.99};
	notes.f = {y : "20", octave : 4, sharp : false, freq : 698.46};
	notes.e = {y : "27", octave : 4, sharp : false, freq : 659.25};
	notes.ds = {y : "34", octave : 4, sharp : true, freq : 622.25};
	notes.d = {y : "34", octave : 4, sharp : false, freq : 587.33};
	notes.cs = {y : "41", octave : 4, sharp : true, freq : 554.37};
	notes.c = {y : "41", octave : 4, sharp : false, freq : 523.25};
	notes.b = {y : "48", octave : 3, sharp : false, freq : 493.88};
	notes.as = {y : "55", octave : 3, sharp : true, freq : 466.16};
	notes.a = {y : "55", octave : 3, sharp : false, freq : 440};
	notes.octave = {y : "49"};
}

function setBass(){
	gameSettings.currentClef = "bass";
	setSettings();
	$(".current-clef").text("Bass");
	notes.b = {y : "13", octave : 2, sharp : false, freq : 246.94};
	notes.as = {y : "20", octave : 2, sharp : true, freq : 233.08};
	notes.a = {y : "20", octave : 2, sharp : false, freq : 220.00};
	notes.gs = {y : "27", octave : 2, sharp : true, freq : 207.65};
	notes.g = {y : "27", octave : 2, sharp : false, freq : 196.00};
	notes.fs = {y : "34", octave : 2, sharp : true, freq : 185.00};
	notes.f = {y : "34", octave : 2, sharp : false, freq : 174.61};
	notes.e = {y : "41", octave : 2, sharp : false, freq : 164.81};
	notes.ds = {y : "48", octave : 2, sharp : true, freq : 155.56};
	notes.d = {y : "48", octave : 2, sharp : false, freq : 146.83};
	notes.cs = {y : "55", octave : 2, sharp : true, freq : 138.59};
	notes.c = {y : "55", octave : 2, sharp : false, freq : 130.81};
	notes.octave = {y : "49"};
}

function setCurrentClef(){
	var fetchClef = getSettings().currentClef;
	
	if(fetchClef == "treble")
	{
		setTreble();
	}
	else if(fetchClef == "bass")
	{
		setBass();
	}
	else
	{
		setTreble();
	}
}

function switchClef()
{
	var fetchClef = getSettings().currentClef;
	
	if(fetchClef == "treble")
	{
		setBass();
	}
	else if(fetchClef == "bass")
	{
		setTreble();
	}
	else
	{
		setTreble();
	}
}

setCurrentClef();

var liveNotes = [];
addRandomNote();

function updateOctave()
{
	if(liveNotes.length > 0)
	{
		$(".octave").removeClass("selected");
		$("#o" + liveNotes[0].octave).addClass("selected");
	}
}

function addNote(note)
{
	var octave = null;
	if(note.indexOf("l") != -1)
	{
		note = note.replace("l","");
		octave = notes[note].octave - 1;
	}
	else
	{
		octave = notes[note].octave;
	}
	liveNotes.push({x : startPos, note : note, octave : octave});
	updateOctave();
}

function addRandomNote()
{
	
	var number = Math.floor( 7 * Math.random() );
	var letter = String.fromCharCode(number + 97);
	
	if(sharpsOn)
	{
		if((letter != "e") && (letter != "b"))
		{
			if(Math.random() > 0.5)
			{
				letter += "s";
			}
		}
	}
	
	var canBeLowered = false;
	var fetchClef = getSettings().currentClef;
	
	if(fetchClef == "treble")
	{
		canBeLowered = number > 2;
	}
	else if(fetchClef == "bass")
	{
		canBeLowered = number > 4;
	}
	else
	{
		canBeLowered = false;
	}
	
	if(Math.random() > 0.6 && canBeLowered)
	{
		addNote(letter + "l");
		return;
	}
	
	addNote(letter);
}

function clearCanvas()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawNote(ctx, x, y, isSharp, colour)
{
	x = parseInt(x);
	y = parseInt(y);
	
	if (typeof colour === 'undefined') { colour = "black"; }
	
	ctx.beginPath();
	ctx.fillStyle = colour;
	ctx.arc(x, y, 6, 0, 2 * Math.PI, false);
	ctx.fill();
	
	if(y < 48)
	{
    		ctx.fillRect(x - 5, y, 2, 30);	
	}
	else
	{
		ctx.fillRect(x + 5, y - 30, 2, 30);
	}
	
	if(isSharp)
	{
		x -= 20;
		y += 7;
		
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x + 8,y - 16);
		ctx.stroke();
		
		x += 4;
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x + 8,y - 16);
		ctx.stroke();
		
		x -= 7;
		y -= 4;
		
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x + 14,y);
		ctx.stroke();
		
		x += 3;
		y -= 6;
		
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x + 14,y);
		ctx.stroke();
	}
}

function drawLastKeyedNote()
{
	var yAxis = notes[lastNote].y;
	
	if(lowerLastOctave)
	{
		yAxis = parseInt(yAxis) + parseInt(notes.octave.y);
	}
	
	if(lastNoteCorrect){
		drawNote(ctx, 25, yAxis, notes[lastNote].sharp, "green");
	}
	else{
		drawNote(ctx, 25, yAxis, notes[lastNote].sharp, "red");
	}
}

function drawLiveNotes()
{
	for(var i = 0; i < liveNotes.length; i++)
	{
		var yAxis = notes[liveNotes[i].note].y;
		
		if(liveNotes[i].octave < notes[liveNotes[i].note].octave)
		{
			yAxis = parseInt(yAxis) + parseInt(notes.octave.y);
		}
		
		drawNote(ctx, liveNotes[i].x, yAxis, notes[liveNotes[i].note].sharp);
	}
	
	if(lastNote != null){
		drawLastKeyedNote();
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
		updateOctave();
		updateScore();
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
	}
}

var timer = function(){};

function runGame()
{
	lastNote = null;
	var level = getLevel();
	
	if(level <= 5)
	{
		showKeyNames();
	}
	else if(level <= 10)
	{
		hideKeyNames();
		showBlackKeyNames();
	}
	else
	{
		hideKeyNames();
	}
	
	if(level > 7)
	{
		sharpsOn = true;
	}
	
	noteCountDownInit = 200;
	noteCountDownInit = Math.max(50, noteCountDownInit - (level - 1) );

	if(level >= 80)
	{
		updateRate = 5;
		canvasSpeed = Math.max(400, (2 * canvasSpeed) - (800 + (level - 40)));
	}
	else
	{
		canvasSpeed = Math.max(200, canvasSpeed - (level - 1) * 5);
	}
	
	timer = setInterval(function(){
		updateLiveNotes();
		clearCanvas();
		drawLiveNotes();
	}, updateRate);
}

function stopGame()
{
	paused = false;
	$(".toggle-pause").text("Pause")
	setLevel();
	clearInterval(timer);
	clearCanvas();
	resetScore();
	updateScore();
	toggleMenu();
}

function togglePause()
{
	if(paused)
	{
		timer = setInterval(function(){
			updateLiveNotes();
			clearCanvas();
			drawLiveNotes();
		}, updateRate);	
		$(".toggle-pause").text("Pause");
	}
	else
	{
		$(".toggle-pause").text("Continue");
		clearInterval(timer);
	}
	
	paused = !paused;
}
