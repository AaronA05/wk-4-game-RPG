//User picks one of 4 attackers to become ATTACKER
//ATTACKER moves to selected area
//User picks one of 3 remaining fighters to become DEFENDER
//DEFENDER moves to selected area
//User clicks button to have ATTACKER fight DEFENDER
//Game increases ATTACKER strength on each attack click
//If ATTACKER health gets to 0 - game over, must hit reset to start again
//If ATTACKER defeats DEFENDER user can select new DEFENDER to attack
//Repeat game action



var attackerHealth = 0;
var defenderHealth = 0;
var attackerImpact = 0;
var defenderImpact = 0;
var attackerChosen = false;
var defenderChosen = false;
var bothChosen = false;
var numberDefeated = 0;
var attackerImpactStart = 0;

function attackSequence(){
	attackerImpact += attackerImpactStart;
	attackerHealth -= defenderImpact;
	defenderHealth -= attackerImpact;
}


$(".clearGame").on("click", function(){
	location.reload();
});

$(document).ready(function(){
	//Gets Link for Theme Song
      var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/mortalkombat.mp3");
      audioElement.play();
     

	//Whatever image is selected first goes to user selection ATTACKER area
	$('[data-status="unselected"]').on("click", function(){
		if (!attackerChosen){
			//take the user selection and place it into the attacker area
			var myPlayer = this;
			$(".attacker").append(myPlayer);
			//take the user selection and change its status
			$(myPlayer).attr("data-status", "selected");
			//set attacker fight options
			attackerHealth = parseInt($(myPlayer).attr("data-health"));
			attackerImpactStart = parseInt($(myPlayer).attr("data-damage"));
			$(".myPlayer-health").html("<p>Health: " + attackerHealth + "</p>");
			//change attackerChosen to true
			attackerChosen = true;
			//push the rest of options to pick into opposition area and change status
			$('[data-status="unselected"]').attr("data-status", "oppo");
			$(".oppo-remain").append($('[data-status="oppo"]'));
			//change border of all opposition choices
			$('[data-status="oppo"]').removeClass("img-start").addClass("img-oppo");

		} //if attacker not chosen function
	
	
	//now in the opposition choices area if clicked moved to defender area
		$("[data-status='oppo']").on("click", function(){
			//only move the first one clicked to defender area
			if(!defenderChosen){
				//take user choice and push to defender area
				var pcPlayer = this;
				$(".defenders").append(pcPlayer);
				$(pcPlayer).attr("data-status", "pcPlayer1")
				//change fighter border to red 
				$('[data-status="pcPlayer1"]').removeClass("img-oppo").addClass("img-fighter");
				//set the opposition main information
				defenderHealth = parseInt($(pcPlayer).attr("data-health"));
				defenderImpact = parseInt($(pcPlayer).attr("data-damage"));
				$(".pcPlayer-health").html("<p>Health: " + defenderHealth + "</p>");
				//change remaining players status to keep them separate
				$('[data-status="oppo"]').attr("data-status", "on-hold");
				defenderChosen = true;
				bothChosen = true;
				if(bothChosen){
					$(".attack-button").html("<button>FIGHT!</button>"); 
				}//if both have been chosen show the attack button

			} //if defender not chosen

		}); //unselected opposition on click function
		
	}); //unselected on click function
 
	$(".attack-button").on("click", function(){
		attackSequence();
		$(".myPlayer-health").html("<p>Health: " + attackerHealth + "</p>");
		$(".pcPlayer-health").html("<p>Health: " + defenderHealth + "</p>");
		$(".my-action").html("<p>You caused " + attackerImpact + " damage</p>");
		$(".oppo-action").html("<p>Your opponent caused  " + defenderImpact + " damage</p>");


		if(defenderHealth <= 0 && numberDefeated < 3){
			$(".defenders").empty();
			//this causes next image selection to go to defender div
			defenderChosen = false;
			bothChosen = false;
			numberDefeated++;
			alert("Pick a new fighter");
			if (numberDefeated === 3){
				$(".col-md-4").empty();
				$(".attack-button").empty();
				$(".my-action").empty();
				$(".oppo-action").empty();
				$(".next-game").html("<h2> YOU WIN, HIT RESET FOR NEW GAME</h2>");
			}//if all defeated display winning message
			
		}//if defender health goes below 0 pick another defender
		else if(attackerHealth <= 0){
			alert("You lost!");
			$(".attack-button").empty();
			$(".next-game").html("<h2>Try again! Hit the reset button</h2>");

		}//if attacker health goes below 0
		

		
	});//attack button on click event
	


});
	
