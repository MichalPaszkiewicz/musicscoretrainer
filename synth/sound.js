var audio_context, oscillator, gainNode, volController;

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
          gainNode.gain.value = $("#oscillator-gain").val();
          
            $("#oscillator-gain").change(function(){
            gainNode.gain.value = $("#oscillator-gain").val();
          });
          
          $("input[type='radio'][name='oscillator-gain']") // select the radio by its id
            .change(function(){ // bind a function to the change event
                if( $(this).is(":checked") ){ // check if the radio is checked
                    var oscillator.type = $(this).val(); // retrieve the value
                }
            });
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
