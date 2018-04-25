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
var game = {};
var currentPlayer = 1;
var currentTeam = "A";
var opponentPlayer;
var click=[];
var position;
var check=0;

function viewCards(uid) {
    redraw();
    click=[];
    var cards=findCardsByID(uid);
    console.log(cards)
    cards.forEach((value, key, arr) => {
        if (x == 1190) {
            y += 120;
            x = -70;
        }
        // console.log(x);
                canvas.drawPokerCard(x += weight, y, size, value.suit, value.point);
            })
}

function findCardsByID(uid) {
    var players = game.players;
    var cards={};
    players.forEach((value, key, arr) => {
        if (String(value.id) == uid) {

          cards=value.cards;
    }
    })
    return cards;
}

function addCard() {
    if (x == 1190) {
        y += 120;
        x = -70;
    }
    canvas.drawPokerCard(x += weight, y, size, "c", "6");
    console.log(x);
}

document.getElementById('myowncanvas').addEventListener('click', function(e) {
    var cx = Math.ceil((e.layerX-40)/weight)-1;
    var cy = Math.ceil((e.layerY-340)/size)-1;
    // console.log(e)
    var cards=findCardsByID(currentPlayer);
    // console.log(cards[cx+cy*14]);

    for(var i=0; i<click.length; i++){
       // console.log(click[i]+"  "+(cx+cy*14))
        if(click[i]==(cx+cy*14)){
           position=i;
           check=1;     //remain
            console.log("check");
        }
    }

    if(check==1){
      check=0;
      click.splice(position,1);
    }else {
        if((cx+cy*14)>=0&&(cx+cy*14)<cards.length){
            click.push(cx+cy*14);
        }
    }

  console.log(click);
    redraw();
    cards.forEach((value, key, arr) => {
        if (x == 1190) {
            y += 120;
            x = -70;
        }
     if(findKey(key)){
         canvas.drawPokerCard(x += weight, y-30, size, value.suit, value.point);
     }else{
         canvas.drawPokerCard(x += weight, y, size, value.suit, value.point);

     }

    })

});

function findKey(key) {
    for(var i=0; i<click.length; i++){
        if(key==click[i]){
           return true;
        }
    }
}
function redraw() {
    canvas.clearRect(0, 0, 1400, 600);
    x = -70;
    y=330;
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
    $("#wrong").css("display","none");
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

    setTimeout("showTime()",1000);
}


function addPoint() {
   // document.getElementById("success").style.display="none";
    $("#success").css("display","none");
    $("#error").css("display","none");
    $("#wrong").css("display","none");
var cards=findCardsByID(currentPlayer);
var clickCards=[];
   for(var x=0;x<click.length;x++){
       clickCards.push(cards[click[x]]);
    }
    console.log(clickCards);
var temp={"cards":clickCards};
    $.ajax({
        url:"/api/v1/addpoint",
        method:"POST",
        dataType:"json",
        data:{ cards:JSON.stringify(temp),
            cplayer:currentPlayer,
            cteam:currentTeam},
        success: (data)=>{
            console.log(data);
            game=data;
            viewCards(currentPlayer);
        },
        error:(error)=>{
            $('#wrong').css("display","block");
        }
    })

}


function sortNumber(a,b)
{
    // if(a=="a"){
    //     return true;
    // }
    // if(b=="false"){
    //     return false;
    // }
    // return (a-b);
    if(a=="10"){
        a="99";
    }
    if(b=="10"){
        b="99";
    }
    if (a < b)
    {
        return -1;
    }
    else if (a > b)
    {
        return 1;
    } else {
        return 0;
    }
}