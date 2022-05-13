var leftOne = document.getElementById('one');
var leftTwo = document.getElementById('two');
var rightThree = document.getElementById('three');
var rightFour = document.getElementById('four');
var reverse = document.getElementById('reverse');

function myRegister(){
    leftOne.style.transform = "translateY(-100%)";
    leftTwo.style.transform = "translateY(0%)";
    rightThree.style.transform = "translateY(100%)";
    rightFour.style.transform = "translateY(0%)";
}
function myLogin(){
    leftOne.style.transform = "translateY(0%)";
    leftTwo.style.transform = "translateY(100%)";
    rightThree.style.transform = "translateY(0%)";
    rightFour.style.transform = "translateY(-100%)";
}
function myRegistermob(){
    reverse.style.flexDirection = "column";
}
function myLoginmob(){
    reverse.style.flexDirection = "column-reverse";
}