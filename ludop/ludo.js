var currPos = 0;
var step = 70;
var currcolor = "";
var NumOfPaw = "";
var num = 0;
var clicked = false;
var currpawn = "";
var allcolor = ["red", "blue"];
var pawnOut = {red:0,blue:0}
function HaveHover() {
    var count = 0;
    var toKill = "";
    for (var i = 0; i < allcolor.length; i++) {
        for (var n = 1; n <= 2; n++) {
            var firstPawn = document.getElementById(allcolor[i] + "pawn" + n);
            var secondPawn=document.getElementById(currpawn);
            if (firstPawn.style.top==secondPawn.style.top&&firstPawn.style.left==secondPawn.style.left&&currcolor!=allcolor[i]&&currPos+num<27) {
                count++;
                toKill = allcolor[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
}
function Stuck() {
    var text = document.getElementById('player');
    if (onboard[currpawn] == 0||currPos+num>27) {
        if (DontHaveOtherFree()||currPos+num>27) {
            var badtext = document.getElementById('badtext');
            badtext.innerText = "Unfortunatlly you stuck";
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(Images/dice.gif)";
            window.setTimeout(changePlayer, 1000);
        }
    }
}
function changePlayer() {
    if (num != 6){
    var text = document.getElementById('player');
    switch (text.innerText) {
        case "red": text.innerText = text.style.color = "blue"; break;
        case "blue": text.innerText = text.style.color = "red"; break;
    }
    }
    var badtext = document.getElementById('badtext');
    badtext.innerText = "";
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(Images/dice.gif)";
}
var positions = {
    redpawn1: 0, redpawn2: 0,
    bluepawn1: 0, bluepawn2: 0, 
};
var onboard = {
    redpawn1: 0, redpawn2: 0,
    bluepawn1: 0, bluepawn2: 0
};
function DontHaveOtherFree() {
    var text = document.getElementById('player');
    for (var i = 1; i <=2; i++) {
        if (onboard[text.innerText + "pawn" + i] == 1 || positions[text.innerText + "pawn" + i]+num>=27) return false;
    }
    return true;
}
function CheckForWinner() {
    if (pawnOut[currcolor] == 2) {
        var dice = document.getElementById("dice");
        var player = document.getElementById("player");
        var uselesstext1 = document.getElementById("uselesstext1");
        var uselesstext2 = document.getElementById("uselesstext2");
        dice.innerText = "";
        dice.style.visibility = "hidden";
        uselesstext1.innerText = "";
        uselesstext2.innerText = "";
        player.innerText = "The Winner is the "+currcolor+" player";
    }
}
function stepDown() {
    var doc = document.getElementById(currcolor + "pawn"+NumOfPaw);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr+step)+'px';
    currPos++;
}
function stepUp() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr - step) + 'px';
    currPos++;
}
function stepLeft() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr - step) + 'px';
    currPos++;
}
function stepRight() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr + step) + 'px';
    currPos++;
}
var stepsRed = [];
var stepsBlue =[];
function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}
//Red pawns path
pushSteps(stepRight, stepsRed,7);
pushSteps(stepDown, stepsRed,7);
pushSteps(stepLeft, stepsRed,7);
pushSteps(stepUp, stepsRed,6);

//Blue pawns path
pushSteps(stepLeft, stepsBlue,7);
pushSteps(stepUp, stepsBlue,7);
pushSteps(stepRight, stepsBlue,7);
pushSteps(stepDown, stepsBlue,6);

function ResetPawn(victim) {
    onboard[victim] = 0;
    positions[victim] = 0;
    var pawnToMove = document.getElementById(victim);
    switch (victim) {
        case "redpawn1": pawnToMove.style.top = 113 + "px"; pawnToMove.style.left = 8 + "px"; break;
        case "redpawn2": pawnToMove.style.top = 113 + "px"; pawnToMove.style.left = 78 + "px"; break;
        
        case "bluepawn1": pawnToMove.style.top = 750 + "px"; pawnToMove.style.left = 8 + "px"; break;
        case "bluepawn2": pawnToMove.style.top = 750 + "px"; pawnToMove.style.left = 78 + "px"; break;
    }
}
function randomNum() {
    if (!clicked) {
        num = Math.floor((Math.random() * 6) + 1);;
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(Images/" + num + ".jpg)";
        clicked = true;
    }
    if (num != 6&&DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "Unfortunately you stuck";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
}
function randomMove(Color, paw) {
    var text = document.getElementById('player');
    NumOfPaw = paw;
    currcolor = Color;
    currpawn = currcolor + "pawn" + NumOfPaw;
    currPos = positions[currpawn];
    if (num + currPos > 27) {
        Stuck();
    }
    else {
        if (clicked) {
            var position = currPos;
            if (text.innerText == currcolor) {
                if (onboard[currpawn] === 1 || num === 6) {
                    if (onboard[currpawn] === 0) {
                        var doc = document.getElementById(currpawn);
                        var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
                        switch (Color) {
                            case "red":
                                doc.style.left = 405 + 'px';
                                doc.style.top = 185 + "px";
                                break;

                            case "blue":
                                doc.style.left = 895 + 'px';
                                doc.style.top = 675 + "px";
                                break;
						}
                        onboard[currpawn] = 1;
					}
                    else {
                        switch (Color) {
                            case "red":
                                for (i = currPos; i < position + num; i++) {
                                    stepsRed[i]();
                                }
                                break;

                            case "blue":
                                for (i = currPos; i < position + num; i++) {
                                    stepsBlue[i]();
                                }
                                break;
                        }
                        positions[currpawn] = currPos;
                        var victim = HaveHover();
                        if (victim != false) {
                            ResetPawn(victim);
                        }
                        if (currPos == 27) { pawnOut[currcolor]++; onboard[currpawn] = 0; positions[currpawn] = 0; 
							var pawnToMove = document.getElementById(currpawn);
							switch (currpawn) {
							case "redpawn1": pawnToMove.style.left = 616 + "px"; pawnToMove.style.top = 396 + "px"; break;
							case "redpawn2": pawnToMove.style.left = 616 + "px"; pawnToMove.style.top = 464 + "px"; break;
        
							case "bluepawn1": pawnToMove.style.left = 686 + "px"; pawnToMove.style.top = 396 + "px"; break;
							case "bluepawn2": pawnToMove.style.left = 686 + "px"; pawnToMove.style.top = 464 + "px"; break;
							}
							}
                        CheckForWinner();
                        changePlayer();
                    }
                    num = 0;
                    clicked = false;
                    var dice = document.getElementById('dice');
                    dice.style.backgroundImage = "url(Images/dice.gif)";
                }
                else Stuck();
            }
        }
    }
}
