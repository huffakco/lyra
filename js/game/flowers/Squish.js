class Squish {
    addSquish(game) {
        this.sprite = game.add.sprite(game.input.activePointer.worldX, game.input.activePointer.worldY,'squish');
        this.sprite.exists = true;
        this.sprite.frame = 0;
        this.sprite.anchor.set(0.5)
        this.sprite.scale.setTo(1.0);
        game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('p0',[0,1,2,3], 5, false);
        this.sprite.animations.play('p0');
        this.sprite.animations._anims.p0.onComplete.add(function(a,b) { this.sprite.destroy();  }, this);
    }
    
}