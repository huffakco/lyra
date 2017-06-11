class Grid{
    
    constructor (game) {
        this.cols = Math.floor(game.world.width/16);
        this.rows = Math.floor(game.world.height/16);
    }
    
    
    
    update (game) {

        var col = game.rnd.integer()%game.world.width;
        var row = game.rnd.integer()%game.world.height;
        
        if (game.flowers.length < 10) {
                // make flower
            var idx = game.flowers.length;
            game.flowers[idx] = game.add.sprite(col,row,'flowers')
            Flowers.factory(game, game.flowers[idx], idx, 0, 0);
        }
        if (game.worms.length < 5) {
            // make worm
            var idx = game.worms.length;
            game.worms[idx] = game.add.group();
            for (var i=0; i<5; i++) {
                game.worms[idx][i] = game.worms[idx].create(col,row,'worms');
                //game.worms[idx][i] = game.add.sprite(col,row,'worms');
            }
            Worms.factory(game, game.worms[idx], idx);
        }
        var curLen = game.flowers.length;
        for (var j = 0; j < curLen; j++) {
            if (game.rnd.integer()%10 < 1) {
                if (Flowers.update(game, game.flowers[j]) && game.flowers[j].customParams.replicated<1) {
                    var idx = game.flowers.length;
                    game.flowers[j].customParams.replicated += 1;
                    var nextPos = Flowers.getNextPosition(game.flowers[j], game.world.width, game.world.height);
                    game.flowers[idx] = game.add.sprite(nextPos[0],nextPos[1],'flowers')
                    Flowers.factory(game, game.flowers[idx], idx, nextPos[2], nextPos[3]);
                }
            }
        }
        for (var j = game.worms.length-1; j >= 0 ; j--) {
            if (game.rnd.integer()%10 < 1) {
                Worms.update(game, game.worms[j]);
            }
            for (var k=0; k<5; k++) {
                var eatenFlowers = [];
                for (var i=game.flowers.length-1; i>= 0; i--) {
                    if (game.physics.arcade.overlap(game.worms[j][k], game.flowers[i])) {
                        eatenFlowers.push(i);
                    }
                }
                for (var i=0; i< eatenFlowers.length; i++) {
                    game.flowers[eatenFlowers[i]].destroy();
                    game.flowers.splice(eatenFlowers[i],1);
                }
                for (var s = 0; s<game.squish.length; s++ ) {
                    if (game.squish[s] != undefined && game.squish[s].sprite != undefined) {
                        if(game.physics.arcade.overlap(game.squish[s].sprite, game.worms[j][k])) {
                                // destroy worm
                                Worms.destroyWorm(game, game.worms[j]);
                                game.worms.splice(j,1);
                                break;
                        }                    
                    }
                }
            }



        }
    
    }
    
    
    
}
