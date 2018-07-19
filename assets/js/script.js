document.addEventListener('DOMContentLoaded', init);

let questions = ['American car', 'England', 'Armenia', 'Input'];
let answers = ['ford', 'london', 'yerevan', 'output'];
let letters = genCharArray('a', 'z');
let rightKeys = 0;
let falsKeys = 0;
let hintCount = 0;
let customValue = getRandInteger(0, answers.length-1);
let word = answers[customValue];

/*
| function genCharArray
| returns array of letters in lowercase
*/
function genCharArray(charA, charZ) 
{
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}


/*
| function getRandInteger
| param int min
| param int max
| returns a value in range of max - min
*/
function getRandInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/*
| function init
| is printing letter buttons, question and answer letters 
*/
function init()
{
	for (let i = 0; i <= letters.length -1; i++) {
		if (i == Math.floor(letters.length/2.7) || i == Math.ceil(letters.length/1.6)) {
			document.getElementById('keyboard').innerHTML += "<br/>"; 
		}
		document.getElementById('keyboard').innerHTML += "<button id='letter_"+letters[i]+"' onclick="+'clickFunc("'+letters[i]+'")>'+letters[i]+"</button>";
	}
	document.getElementById('question').innerHTML = questions[customValue]+" ?";
	for(let i = 0; i < word.length; i++) {
		document.getElementById('answer').innerHTML += "<span class='char_"+MD5(word[i])+"' style='border: 1px solid; padding: 2px;'>?</span>";
	}
}

/*
| function clickFunc
| param string arg
| is checking a letter in answer's letters
*/
function clickFunc(arg) 
{
	if (word.indexOf(arg) != -1)
		rightKey(arg);
	else
		wrongKey(arg);
}

/*
| function rightKey
| param string arg
| is counting number of right letters in answer and ending game
*/
function rightKey(arg)
{
	if (document.getElementById('letter_'+arg).style.background == "green")
		return 0;

	document.getElementById("letter_"+arg).style.background = "green";
	let right = document.getElementsByClassName('char_'+MD5(arg));
	rightKeys += right.length;
	for(let i = 0; i <= right.length; i++) {
		try {
			right[i].innerHTML = arg;
		} catch(e) {
			//
		}
	}
	
	if (rightKeys == word.length)
		finish('you win')
}

/*
| function wrongKey
| param string arg
| is counting number of wrong letters in answer and ending game
*/
function wrongKey(arg)
{
	if (document.getElementById('letter_'+arg).style.background == "red") {
		return 0;
	}
	document.getElementById("letter_"+arg).style.background = "red";
	falsKeys++;
	if (falsKeys == 3)
		finish('you loose')
}

/*
| function finish
| is called when user wins or loses
*/
function finish(message)
{
	setTimeout(function(){
		alert(message);
		location.reload();
	}, 500);
}

// keypress event listener
document.body.addEventListener('keypress', function(event){
	// let letter = event.key;
	let letter = String.fromCharCode(event.keyCode);
	letter = letter.toLowerCase();
	clickFunc(letter);
});

// event listener on hint
document.getElementById('hint').addEventListener('click', hint);

/*
| function hint
| is opening random letter from answer
*/
function hint()
{
	let index = getRandInteger(0, word.length-1);
	if (document.getElementById('letter_'+word[index]).style.background == "green") {
		hint();
	}
	++hintCount;
	if (hintCount >= 3) {
		return 0;
	}
	clickFunc(word[index]);
}