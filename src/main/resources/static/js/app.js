$(function() {


    $.ajax({
        url: "/api/v1/game",
        method: "GET",
        success: (data) => {
            console.log(data);
            game = data;
            viewCards(currentPlayer);
            $('#menu').css("display", "block");
        }
    })
})
var canvas = document.getElementById('myowncanvas').getContext('2d');

var x = -70;
var y = 330;
var size = 120;
var weight = 90;
var cardMargin = 50;
var game = {};
var currentPlayer = 1;
var currentTeam = "A";
var opponentPlayer;


function viewCards(uid) {
    redraw();
    var players = game.players;

    players.forEach((value, key, arr) => {
        // console.log(value.id+"  "+uid+" ");
        // console.log(String(value.id)==uid);
        if (String(value.id) == uid) {

            value.cards.forEach((value, key, arr) => {
                canvas.drawPokerCard(x += weight, y, size, value.suit, value.point);
            })
        }
    })

}

function addCard() {
    if (x == 1190) {
        y += 90;
        x = -70;
    }
    canvas.drawPokerCard(x += weight, y, size, "c", "6");
    console.log(x);
}

document.getElementById('myowncanvas').addEventListener('click', function(e) {
    var x = e.layerX / cardMargin;
    console.log(e)

});


function redraw() {
    canvas.clearRect(0, 0, 1400, 600);
    x = -70;
    redrawTitle();
}

function redrawTitle() {
    canvas.font = '30px serif';
    canvas.fillStyle = 'Black';
    canvas.fillText('Current Player: Player ' + currentPlayer, 10, 50);
    if (currentPlayer / 3 <= 1) {
        currentTeam="A";
        canvas.fillText('Current Team: Team ' + currentTeam, 510, 50);
        canvas.fillText('Team Point: ' + getPoint(currentTeam), 1010, 50);
        $("#players").empty();
        $("#players").append("<option value='4'>Player 4</option>");
        $("#players").append("<option value='5'>Player 5</option>");
        $("#players").append("<option value='6'>Player 6</option>");
    } else {
        currentTeam="B";
        canvas.fillText('Current Team: Team ' + currentTeam, 510, 50);
        canvas.fillText('Team Point: ' + getPoint(currentTeam), 1010, 50);
        $("#players").empty();
        $("#players").append("<option value='1'>Player 1</option>");
        $("#players").append("<option value='2'>Player 2</option>");
        $("#players").append("<option value='3'>Player 3</option>");

    }
}

function getPoint(tid) {
    var teams = game.teams;
    var point = 0;
    teams.forEach((value, key, arr) => {

        if (value.id == String(tid)) {
            // console.log(value.id==String(tid))
            // console.log(value.point)
            point = value.point;
        }
    })
    return point;
}

function start() {
    // redraw();
    viewCards(currentPlayer);
}

function requestCard() {
    $("#success").css("display","none");
    $("#error").css("display","none");
    var opponent=$('#players').val();
    var point=$('#points').val();
    var suit=$('#suits').val();
    opponentPlayer=opponent;
    console.log(opponent+" ");
    $.ajax({
        url:"/api/v1/game",
        method:"POST",
        data:{"cplayer":currentPlayer,"oplayer":opponent,"point":point,"suit":suit},
        success:(data)=>{
            game=data;
            $("#success").css("display","block");
            console.log(data);
            viewCards(currentPlayer);
        },
        error:(err)=>{
            $("#error").css("display","block");
            t=4;
            showTime();
        }
    })


}
var t=4;
function showTime(){
    t -= 1;
    document.getElementById('error').innerHTML= "The User does not have that card ! Ready to change next User : "+t;
    if(t==0){
        $("#error").css("display","none");
        currentPlayer=opponentPlayer;
        viewCards(currentPlayer);

        return;
    }
    //每秒执行一次,showTime()
    setTimeout("showTime()",1000);
}


function addPoint() {

}