
var answer = null;
var guessCount=5;
var guess=null;
var guessStore=[];

function randomNumber(){
	answer = Math.floor(100*Math.random()+1);
}
//Check if guessing number is hot/cold
function checkGuess(){
	var sub=Math.abs(guess-answer);
	var res=null;
	if(sub===0){
		res ="You are correct!!!";
		$('#guess-count').after('<img src="http://www.sippycupmom.com/wp-content/uploads/2011/06/Winner.jpeg">');
	} else if(sub<=5){
		res =  "Super hot,"+suggestGuess();
	} else if(sub<=10){
		res =  "Hot,"+suggestGuess();
	} else if(sub<=15){
		res =  "Warm,"+suggestGuess();
	} else if(sub<=25){
		res =  "Cold,"+suggestGuess();
	} else{
		res =  "Super Cold,"+suggestGuess();
	}

	if(guessStore.length>1){
		if(sub>Math.abs(guessStore[guessStore.length-2]-answer)) {
			res+=" You guess is colder than previous guess!!";
		} else if(sub<Math.abs(guessStore[guessStore.length-2]-answer)){
			res+=" You guess is hotter than previous guess!!";
		}
	}
		return res;
}

//Suggest player guess higher or lower
function suggestGuess(){
	if(guess<answer){
		return " guess higher.";
	} else{
		return " guess lower.";
	}
}
// validate input from player
function validateInput(){
	if(isNaN(guess)||(guess==="")){
		return "Please input a number";
	} else if(( guess>100)||(guess<0)) {
		return "Not in range 0-100";
	} else if(guessStore.indexOf(guess)>=0) {
		return "You've already guess this number";
	} else {
		return " ";
	}

}

function hintAnswer(){
	if(guessStore.length===0){
		alert("You must submit a test first");
	} else {
		alert("The answer is "+answer);
	}
}

function restart(){
	randomNumber();
	guessCount=5;
	guess=null;
	guessStore=[];
	document.getElementById("status").innerHTML="Your game has been restarted, submit a guess!";
	document.getElementById("guess-count").innerHTML="You have 5 guesses remaining";
}
$(document).ready(function(){
	randomNumber();
	$('#guessBtn').click(function(){
		guess = $('input[name=inputGuess]').val();
		var val = validateInput();
		if(val===" "){
			guessStore.push(guess);
			if(guessCount>0) {
				document.getElementsByClassName('circle')[5-guessCount].innerHTML=guess;
				guessCount--;
				document.getElementById("status").innerHTML=checkGuess();
				document.getElementById("guess-count").innerHTML="You have "+guessCount+(guessCount>1?" guesses ":" guess ")+"remaining";	
			} else {
				alert("You are out of luck, answer is "+answer);
			}	

		} else {
			document.getElementById("status").innerHTML=val;
		}
	});
		
});


