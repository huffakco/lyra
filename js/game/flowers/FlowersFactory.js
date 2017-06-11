class Flowers {

};

Flowers.factory = function(game, sprite, idx, angle, radius) {
        sprite.customParams = [];
        sprite.customParams.idx = idx;
        sprite.customParams.phase = 0;
        sprite.customParams.name = 'flower';
        sprite.customParams.angle = angle;
        sprite.customParams.radius = radius;
        sprite.customParams.replicated = 0;
        sprite.customParams.mature = false;
        sprite.frame = 0;
        sprite.anchor.set(0.5);
        sprite.scale.setTo(0.5);

        game.physics.arcade.enable(sprite);
        
        sprite.body.angle = game.rnd.integer()%360;
        sprite.animations.add('p0',[0,1], 10, true);
        sprite.animations.add('p1',[2,3], 10, true);
        sprite.animations.add('p2',[4,5], 10, true);
        sprite.animations.add('p3',[6,7], 10, true);
        sprite.animations.add('p4',[8,9], 10, true);
        sprite.animations.add('p5',[10,11], 10, true);
        sprite.animations.add('p6',[12,13], 10, true);
        sprite.animations.add('p7',[14,15], 10, true);
        sprite.animations.play('p0');
};

Flowers.update = function(game, sprite) {
    
    if (sprite.customParams.phase < 7) {
        sprite.customParams.phase += 1;
        sprite.animations.play('p'+ sprite.customParams.phase);
    } else {
        if (!sprite.customParams.mature) {
            sprite.animations.stop();
            sprite.customParams.mature = true;
            sprite.loadTexture('flowers', getRandomInt(14,15), true);
            return true;
        }
    }
    return false;
};

Flowers.getNextPosition = function(sprite, gameWidth, gameHeight) {
        var x0 = sprite.body.center.x;
        var y0 = sprite.body.center.y;
        var angle = getRandomInt(0,360);
        var radius = getRandomInt(20,52);
        var nextY = y0 + radius*Math.sin(angle*Math.PI/180);
        if (nextY < 0) { nextY = 0};
        if (nextY >= gameHeight) { nextY = gameHeight-1;}        
        var nextX = x0 + radius*Math.cos(angle*Math.PI/180);
        if (nextX < 0) { nextX = 0};
        if (nextX >= gameWidth) { nextX = gameWidth-1;}
        return ([nextX, nextY, angle, radius]);
}
