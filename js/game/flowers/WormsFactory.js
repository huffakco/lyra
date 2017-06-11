class Worms {

};

Worms.factory = function(game, sprite, idx) {
        sprite.exists = true;
        sprite.customParams = [];
        sprite.customParams.idx = idx;
        sprite.customParams.name = 'worm';
        sprite.customParams.segments = [];
        for (var i=0; i<4; i++) {
            sprite[i].customParams = [];
            sprite[i].customParams.phase = 0;
            sprite[i].frame = 0;
            sprite[i].anchor.set(0.5)
            sprite[i].scale.setTo(0.05);
            game.physics.arcade.enable(sprite[i]);
            sprite[i].animations.add('p0',[8,9], 5, true);
            sprite[i].animations.add('p1',[10,11], 5, true);
            sprite[i].animations.add('p2',[12,13], 5, true);
            sprite[i].animations.add('p3',[14,15], 3, true);
            sprite[i].animations.play('p0');
        }
        sprite[4].customParams = [];
        sprite[4].customParams.phase = 0;
        sprite[4].frame = 0;
        sprite[4].anchor.set(0.5)
        sprite[4].scale.setTo(0.05);
        game.physics.arcade.enable(sprite[4]);
        sprite[4].animations.add('p0',[0,1], 5, true);
        sprite[4].animations.add('p1',[0,1,2,3,2,1,0], 5, true);
        sprite[4].animations.add('p2',[0,1,2,3,4,5,4,3,2,1,0], 5, true);
        sprite[4].animations.add('p3',[0,1,2,3,4,5,6,7,6,5,4,3,2,1,0], 3, true);
        sprite[4].animations.play('p0');
        
        
        sprite.customParams.originX = sprite[4].body.center.x;
        sprite.customParams.originY = sprite[4].body.center.y;
        sprite.customParams.segments.push(4);
 };

Worms.update = function(game, sprite) {
    var idx = sprite.customParams.segments.length;
    if (sprite[sprite.customParams.segments[idx-1]].scale.x < 1) {
        sprite[sprite.customParams.segments[idx-1]].scale.setTo(sprite[sprite.customParams.segments[idx-1]].scale.x + 0.05);    
        sprite[sprite.customParams.segments[idx-1]].animations.play('p'+ sprite[sprite.customParams.segments[idx-1]].customParams.phase);
    }
    else if (sprite[sprite.customParams.segments[idx-1]].customParams.phase < 3) {
        sprite[sprite.customParams.segments[idx-1]].customParams.phase += 1;
        sprite[sprite.customParams.segments[idx-1]].animations.play('p'+ sprite[sprite.customParams.segments[idx-1]].customParams.phase);
    } else if (sprite.customParams.segments.length < 5) {
        var nextPos = getNextXY(game.world.width, sprite[4].body.center.x, sprite[4].body.center.y);
        var curPos = [sprite[4].body.center.x, sprite[4].body.center.y];
        sprite[4].position.x = nextPos[0];
        sprite[4].position.y = nextPos[1];
        for (var j=1; j<sprite.customParams.segments.length-1;  j++ ) {
            nextPos = [sprite[sprite.customParams.segments[j]].body.center.x, sprite[sprite.customParams.segments[j]].body.center.y];
            sprite[sprite.customParams.segments[j]].position.x = curPos[0];
            sprite[sprite.customParams.segments[j]].position.y = curPos[1];
            curPos = nextPos;
        }
        
        //console.log(sprite);
        // index of next lower segment
        sprite.customParams.segments.push(sprite.customParams.segments[idx-1] - 1);
    } else {
        
    }
}

Worms.killWorm = function(game ) {
    var idx = game.squish.length;
    game.squish[idx] = new Squish();
    game.squish[idx].addSquish(game);
}

Worms.destroyWorm = function(game, worm){
    worm.destroy();
    // for (var j=0; j< worm.length; j++) {
    //     worm[j].destroy;
    // }
}

function getNextXY(gameWidth, x, y) {
        var nextY = y - 20;
        if (nextY < 0) { nextY = 0};
        var offsetX = getRandomInt(-32, 32);
        var nextX = x + offsetX;
        if (nextX < 0) { nextX = 0; offsetX = x;};
        if (nextX >= gameWidth) { nextX = gameWidth-1; offsetX = nextX-x;}
        return ([nextX, nextY, offsetX, 20]);
}
 

