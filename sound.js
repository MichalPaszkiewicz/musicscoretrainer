var audio_context, oscillator;

  function stopSound() {
    oscillator.noteOff(0);
  }

  function playSound(freq) {
    oscillator = audio_context.createOscillator();
    oscillator.frequency.value = freq;
    oscillator.connect(audio_context.destination);
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
