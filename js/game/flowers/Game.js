Game = function() {

};

Game.prototype = {
	
	
	
	preload: function() {
        this.game.load.image('backdrop', 'assets/flowers/greenmap180_120.png');
        this.game.load.spritesheet('flowers', 'assets/flowers/flowers.png', 64, 64, 16);
        this.game.load.spritesheet('worms', 'assets/flowers/wormsprite.png', 64, 64, 16);
		this.game.load.spritesheet('squish', 'assets/flowers/squish.png',64,64,4);
    	this.game.flowers = [];
    	this.game.worms = [];
		this.game.squish = [];
		this.zooming = false;
		this.panup = false;
		this.pandown = false;
		this.panleft = false;
		this.panright = false;
		this.zoomAmount = 0;
		this.size = new Phaser.Rectangle();
		this.game.level = 1;
	},

    create: function() {
    	this.game.date = new Date();
    	this.game.rnd.sow([this.game.date.getTime()]);

    
    	// Input controls
	    // setup action on object "w" key
	    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
	    //this.upKey.onDown.add(this.upcamera, this);
	    this.upKey.onDown.add(this.panUpcamera, this);
   	    this.upKey.onUp.add(this.stopUpPanCamera, this);    
            
        // setup action on object "a" key
	    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
	    //this.leftKey.onDown.add(this.leftcamera, this);
	    this.leftKey.onDown.add(this.panLeftcamera, this);
   	    this.leftKey.onUp.add(this.stopLeftPanCamera, this);   
   	    
	    // setup action on object "s" key
	    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
	    //this.downKey.onDown.add(this.downcamera, this);
	    this.downKey.onDown.add(this.panDowncamera, this);
   	    this.downKey.onUp.add(this.stopDownPanCamera, this);   
   	    
	    // setup action on object "d" key
	    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	    //this.rightKey.onDown.add(this.rightcamera, this);
        this.rightKey.onDown.add(this.panRightcamera, this);
   	    this.rightKey.onUp.add(this.stopRightPanCamera, this);   
   	    
   	    
	    this.game.world.setBounds(0, 0, 2880, 1920);
	
	    this.size.setTo(0, 0, this.game.world.width, this.game.world.height);
	
	    this.game.add.sprite(0, 0, 'backdrop');
	
	    this.cursors = this.game.input.keyboard.createCursorKeys();
	
	
	    //  world center, top-left is  0x0
	    //console.log(this.game.world);
	    this.game.camera.focusOnXY(this.game.world.width/2, this.game.world.height/2);
	
	    this.game.input.onDown.add(this.startZoom, this);
	    this.game.input.onUp.add(this.stopZoom, this);

    	
    	// create grid
    	this.grid = new Grid(this.game);
            
     },       
 
 	
	update: function() {
		this.grid.update(this.game);
		
		if (this.zooming)
    	{
	        this.game.camera.scale.x += this.zoomAmount;
	        this.game.camera.scale.y += this.zoomAmount;
	
	        this.game.camera.bounds.x = this.size.x * this.game.camera.scale.x;
	        this.game.camera.bounds.y = this.size.y * this.game.camera.scale.y;
	        this.game.camera.bounds.width = this.size.width * this.game.camera.scale.x;
	        this.game.camera.bounds.height = this.size.height * this.game.camera.scale.y;

    	
    	}
    	
    	if (this.panup) {
    		this.game.camera.y -= 4;
    	}

    	if (this.pandown) {
    		this.game.camera.y += 4;
    	}

    	if (this.panleft) {
    		this.game.camera.x -= 4;
    	}

    	if (this.panright) {
    		this.game.camera.x += 4;
    	}
		
		
	},
	

    panUpcamera: function() {
		this.panup = true;    	
    },
    
    panDowncamera: function() {
		this.pandown = true;      	
    },
    
    panLeftcamera: function() {
		this.panleft = true;     	
    },
    
    panRightcamera: function() {
		this.panright = true;     	
    },
        
    stopUpPanCamera: function() {
		this.panup = false;  	
    },
    
    stopDownPanCamera: function() {
		this.pandown = false;
    },
    
    stopLeftPanCamera: function() {
		this.panleft = false;
    },
    
    stopRightPanCamera: function() {
		this.panright = false; 	   	
    },
    
    startZoom: function(pointer) {
	    if (pointer.button === Phaser.Mouse.LEFT_BUTTON)
	    {
	    	this.zooming = true;
	        this.zoomAmount = 0.005;
	    }
	    else if (pointer.button === Phaser.Mouse.RIGHT_BUTTON)
	    {
	    	this.zooming = true;
	        this.zoomAmount = -0.005;
	    } else {
	    	Worms.killWorm(this.game);
	    }

	},

	stopZoom: function(pointer) {

    	this.zooming = false;

	}
}    