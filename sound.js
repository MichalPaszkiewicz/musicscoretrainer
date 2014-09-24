var audio_context, oscillator, gainNode;

var maxVol = 0.02;
var initialVol = 0.01;
var playing = false;

  function stopSound() {
    oscillator.noteOff(0);
    gainNode.disconnect(audio_context.destination);
  }

  function playSound(freq) {
    
    if(playing){
      gainNode.connect(audio_context.destination);
    }
    
    else{
          oscillator = audio_context.createOscillator();
          gainNode = audio_context.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audio_context.destination);
          
          oscillator.type = "triangle";
          oscillator.frequency.value = freq;
          //oscillator.connect(audio_context.destination);
          
          oscillator.start();
          
          gainNode.gain.value = initialVol;
          
          //oscillator.noteOn(0);
    }
  }
  
 (function init(g){
 	try{
 		audio_context = new(g.AudioContext || g.webkitAudioContext);
 		oscillator = audio_context.createOscillator();
 	} catch(e){
 		alert("No web audio oscillator support in this browser. Use Chrome, fool!");
 		soundIssues = true;
 	}
 }(window));
