var audio_context, oscillator, gainNode;

var maxVol = 0.02;
var initialVol = 0.01;

  function stopSound() {
    oscillator.noteOff(0);
  }

  function playSound(freq) {
    oscillator = audio_context.createOscillator();
    oscillator.frequency.value = freq;
    oscillator.connect(audio_context.destination);
    
    gainNode = audio_context.createGain();
    oscillator.connect(gainNode);
    
    gainNode.gain.value = initialVol;
    
    gainNode.connect(audio_context.destination);
    oscillator.noteOn(0);
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
