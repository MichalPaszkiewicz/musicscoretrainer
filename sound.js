var audio_context, oscillator, gainNode, volController;
var soundIssues = false;
var initialVol = 0.8;
var currentVol = initialVol;
var finalVol = 0;

  function stopSound() {
    clearInterval(volController);
    currentVol = initialVol;
    
    //oscillator.noteOff(0);
    gainNode.disconnect(audio_context.destination);
  }

  function playSound(freq) {
          if(gainNode != undefined){ stopSound(); }
          oscillator = audio_context.createOscillator();
          gainNode = audio_context.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audio_context.destination);
          
          oscillator.type = "triangle";
          oscillator.frequency.value = freq;
          oscillator.start();
          gainNode.gain.value = initialVol;
          
          volController = setInterval(function(){ 
            
            gainNode.gain.value = currentVol; 
            
            if(currentVol <= 0)
            {
              currentVol = initialVol;
              stopSound();
            }
            currentVol -= 0.05;
          }, 10);
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
