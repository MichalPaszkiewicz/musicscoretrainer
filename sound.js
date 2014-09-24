var audio_context, oscillator, gainNode;

var maxVol = 0.02;
var initialVol = 0.01;
var soundPlaying = false;

  function stopSound() {
    oscillator.noteOff(0);
    gainNode.disconnect(audio_context.destination);
  }

  function playSound(freq) {
    
    if(soundPlaying){
      gainNode.connect(audio_context.destination);
      
      oscillator.frequency.value = freq;
      gainNode.gain.value = 0.8;
    }
    
    else{
          oscillator = audio_context.createOscillator();
          gainNode = audio_context.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audio_context.destination);
          
          oscillator.type = "triangle";
          oscillator.frequency.value = freq;
          oscillator.start();
          gainNode.gain.value = initialVol;
          
          soundPlaying = true;
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
