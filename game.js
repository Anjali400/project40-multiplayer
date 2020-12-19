class Game{
    constructor(){
  this.score=createElement("h2")
  this.score2=createElement("h2")
    this.reset = createButton('Reset');
    this.over=createElement("h2")
    this.over2=createElement("h2")
    this.over3=createElement("h2")

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {

            if (gameState === 0) {
                       
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();


 this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
             form=new Form()
     form.display()
      this. score.hide()
    this.score2.hide()
    this.over.hide()
    this.over2.hide()
    this.over3.hide()
        });
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
         this.score.html("Player1:"+score);
        this.score.position(350, 100);
        this.score.style('color', 'purple');

        this.score2.html("Player1:"+score2);
        this.score2.position(800, 100);
        this.score2.style('color', 'red');

 this.reset.position(900, 660);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', 'lightpink');

 
                form.hide();
 
                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                     
                 
                 }
              
                if(score>5){
                    gameState=2
                  this.over2.html("Playe1 Won");
         
        this.over2.style('color','yellow')
        this.over2.position(600,400)
        
                }

                 if(score2>5){
                     gameState=2
                     this.over3.html("Player2 Won")
                      this.over3.style('color','yellow')
                     this.over3.position(600,400)
                    //  image(victory,0,200,500,100)
                 }

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
                
        
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                      if (player.index !== null) {
                      for (var i = 0; i < fruitGroup.length; i++) {
                          if (fruitGroup.get(i).isTouching(player1)) {
                              fruitGroup.get(i).destroy();
                             score=score+1
                             sound.play()
                            
                          }
                          if (fruitGroup.get(i).isTouching(player2)) {
                              fruitGroup.get(i).destroy();
                             score2=score2+1
                              player.update();
                              sound.play()
                          }
                          
                      }
                  }
               
         

    }

    end(){
       console.log("Game Ended");
        this.over.html("GAME OVER");
         
        this.over.style('color','yellow')
       this.over.position(600,300)
    image(victory,200,100,100,100)
    image(h,300,100,1000,1000)
    }
}