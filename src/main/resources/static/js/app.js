
var canvas = document.getElementById('myowncanvas').getContext('2d');

var x=-70;
var y=330;
var size=120;
var weight=90;
var cardMargin=50;
var game={};

function viewCards(uid){
    redraw()
    var players=game.players;
     players.forEach((value,key,arr)=>{
         // console.log(value.id+"  "+uid+" ");
         // console.log(String(value.id)==uid);
         if(String(value.id)==uid){

             value.cards.forEach((value,key,arr)=>{
                 canvas.drawPokerCard(x+=weight, y, size, value.suit, value.point);
             })
         }
     })

}

function addCard(){
if(x==1190){
    y+= 90;
    x= -70;
}
    canvas.drawPokerCard(x+=weight, y, size, "c","6");
    console.log(x);
}

document.getElementById('myowncanvas').addEventListener('click', function(e) {
    var x =e.layerX/cardMargin;
    console.log(e)

});


function redraw() {
    canvas.clearRect(0, 0, 1400, 600);
    canvas.font = '30px serif';
    canvas.fillStyle='Black';
    canvas.fillText('Current Player: Player 1', 10, 50);
    canvas.fillText('Current Team: Team A', 510, 50);
    canvas.fillText('Team Point: 0', 1010, 50);
    x=-70;
}
function start(){
    redraw();
    $.ajax({
        url:"/api/v1/game",
       method:"GET",
       success:(data)=>{
            console.log(data);
            game=data;
           viewCards('1');
           $('#menu').css("display","block");
       }
    })
}