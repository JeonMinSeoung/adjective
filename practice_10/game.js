// 2010036422 전민승

"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;

document.observe('dom:loaded', function(){
	$("start").observe("click", function(){
		$("state").innerHTML = "Ready!";
		$("score").innerHTML = "0";
		clearInterval(targetTimer);
		clearInterval(trapTimer);
		clearInterval(instantTimer);
		setTimeout(startGame, 3000);
	});
	$("stop").observe("click", stopGame);
});

function startGame(){
	targetBlocks = [];
	trapBlock = null;
	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);

	var allBlock = $$(".block");
	for(var i=0; i<allBlock.length; i++) {
		allBlock[i].removeClassName("target");
		allBlock[i].removeClassName("trap");
	}
	setTimeout(startToCatch(), null);
}

function stopGame(){
	$("state").innerHTML = "Stop";
	targetBlocks = [];
	trapBlock = null;
	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);

	var allBlock = $$(".block");
	for(var i=0; i<allBlock.length; i++) {	//detach the event handler
		allBlock[i].stopObserving();
	}
}

function startToCatch(){
	var targetRandom = -1;
	var	trapRandom = -1;
	var allBlock = $$(".block");
	var getScore = 0;
	var thisBlock;
	$("state").innerHTML = "Catch!";
	
	// Show target block that is picked randomly every sec (Ex 3).
	targetTimer = setInterval(function(){
		if(targetBlocks.length === 0){
			targetRandom = Math.floor(Math.random()*numberOfBlocks);
			targetBlocks.push(targetRandom);
		}
		else{
			while( targetBlocks.indexOf(targetRandom) !== -1 ){
				targetRandom = Math.floor(Math.random()*numberOfBlocks);
				if( targetBlocks.indexOf(targetRandom) === -1 ){
					targetBlocks.push(targetRandom);
					break;
				}
			}
		}
		allBlock[targetRandom].addClassName("target");
		if( targetBlocks.length >= 5 ){
			alert("you lose");
			//detach the event handler to prohibit selecting more answers by user.
			instantTimer = setTimeout(stopGame, null);
		}
	}, 1000);

	// Show trap block that is picked randomly every 3 sec (Ex 4).
	trapTimer = setInterval(function(){
		trapRandom = Math.floor(Math.random()*numberOfBlocks);
		while( targetBlocks.indexOf(trapRandom) !== -1 ) trapRandom = Math.floor(Math.random()*numberOfBlocks);
		trapBlock = trapRandom;
		allBlock[trapRandom].addClassName("trap");
		instantTimer = setTimeout(function(){ allBlock[trapRandom].removeClassName("trap"); }, 2000);
	},3000);

	// Attach event handler for blocks (Ex 5).
	for(var i=0; i<numberOfBlocks; i++){
		allBlock[i].observe("click", function(){
			/* Click the non target and non trap */
			if( !(this.hasClassName("target") || this.hasClassName("trap")) ){
				if (getScore >= 10) getScore -= 10;
				this.addClassName("wrong");
				thisBlock = this;
				instantTimer = setTimeout(function(){ thisBlock.removeClassName("wrong"); }, 100);
			}
			/* Click the target */
			else if( this.hasClassName("target") ){
				getScore += 20;
				this.removeClassName("target");
				for(var j=0; j<targetBlocks.length; j++) if( allBlock[targetBlocks[j]] === this ) targetBlocks.splice(j, 1);
			}
			/* Click the trap */
			else if( this.hasClassName("trap") ){
				if (getScore >= 30) getScore -= 30;
				else if ( getScore < 30 ) getScore = 0;
				this.removeClassName("trap");
			}
			$('score').innerHTML = getScore+"";
		});	
	}
}