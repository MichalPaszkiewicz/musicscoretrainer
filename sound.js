var audio_context, oscillator, gainNode;

var initialVol = 0.8;
var finalVol = 0;

  function stopSound() {
    oscillator.noteOff(0);
    gainNode.disconnect(audio_context.destination);
  }

  function playSound(freq) {
    
          oscillator = audio_context.createOscillator();
          gainNode = audio_context.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audio_context.destination);
          
          oscillator.type = "triangle";
          oscillator.frequency.value = freq;
          oscillator.start();
          gainNode.gain.value = initialVol;

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
