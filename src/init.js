var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 9800 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var text;
var convText=' Dialogos';
var countPersonas=0;
var personas;
var checkpoint_final;
var platforms;
var player;
var cursors;
var scoreText= '1/4 fragmentos';
var score = 1; //porque el chico comienza con un fragmento
var gameOver = false;
var game = new Phaser.Game(config);
var moveCam = false;

function preload ()
{   

    //this.load.image('persona', 'assets/gamejam-personaje.png');
    this.load.audio("music",["assets/music/Goodbye.ogg", "assets/music/Goodbye.mp3"]);
    this.load.audio("ending",["assets/music/Credits_Diomedes.ogg", "assets/music/Credits_Diomedes.mp3"]);


    this.load.image('persona', 'assets/gamejam-personaje.png');
    this.load.image('platform', 'assets/platform.png');

    this.load.image('fondo', 'assets/fondooriginal.jpg');
    this.load.image('platform_desierto_1', 'assets/Desierto/Plataformas/Plataforma1_1.png');
    this.load.image('platform_desierto_2', 'assets/Desierto/Plataformas/Plataforma1.png');
    this.load.image('platform_suelo', 'assets/Desierto/Suelo.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    
}

function create ()
{  
    this.music = this.sound.add("music");
    var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    this.music.play(musicConfig);
    fondo = this.add.image(1300, 1400, 'fondo').setScale(1.5, 1.2);
    this.cameras.main.setBounds(0, 0, 720 * 7, 176);
    for (x = 0; x < 10; x++)
    {
        this.add.image(1300*x, 0, 'fondo').setOrigin(0);
        this.add.text(1300*x, 16, scoreText, { fontSize: '25px', fill: '#000' });
        this.add.text(1300*x, 45, convText , { fontSize: '25px', fill: '#000' });
    }
    player = this.physics.add.sprite(100, 300, 'dude');
    player.setScale(2);
    this.cameras.main.startFollow(player, true);
    if (this.cameras.main.deadzone)
    {
        graphics = this.add.graphics().setScrollFactor(0);
        graphics.lineStyle(3, 0x00ff00, 1);
        graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
    }
    text = this.add.text(220, 240).setScrollFactor(0).setFontSize(16).setColor('#ffffff');
    platforms = this.physics.add.staticGroup();
    checkpoint_final = this.physics.add.staticGroup(); 
    personas = this.physics.add.staticGroup();
    personas.create(500,432, 'persona').setScale(0.5,0.5);
    personas.create(1500,432, 'persona').setScale(0.5,0.5);
    platforms.create(500, 568, 'platform_suelo');
    platforms.create(1000, 568, 'platform_suelo');
    platforms.create(1500, 568, 'platform_suelo');
    platforms.create(2000, 568, 'platform_suelo');
    platforms.create(2500, 568, 'platform_suelo');
    platforms.create(3000, 568, 'platform_suelo');
    platforms.create(3500, 568, 'platform_suelo');
    platforms.create(4000, 568, 'platform_suelo');
    platforms.create(4600, 568, 'platform_suelo');
    //platforms.create(600, 400, 'platform_desierto_2');
    platforms.create(50, 250, 'platform_desierto_1');
    platforms.create(750, 220, 'platform_desierto_1');
    checkpoint_final.create(4200, 430, 'star');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    //scoreText = this.add.text(16, 16, ' 1/4 fragmentos', { fontSize: '32px', fill: '#000' });
    //convText = this.add.text(800, 16, ' Dialogos', { fontSize: '20px', fill: '#000' });
    text = this.add.text(220, 240).setScrollFactor(0).setFontSize(16).setColor('#ffffff');
    cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(personas, platforms);
    this.physics.add.collider(checkpoint_final, platforms);
    this.physics.add.overlap(player, checkpoint_final, FinalEvent, null, this);
    this.physics.add.overlap(player, personas, PersonaEvent, null, this);
    //this.physics.add.overlap(player, personaje2, evento, null, this); con esto se da lugar a un evento dado el personaje colisione con el personaje 2
}

function update ()
{   if (gameOver)//si se acaba el juego
    {   
        player.setVelocityX(0);
        return; //TODO: HAY QUE AGREGAR AQUI QUE SI PIERDE SE PONGA EL MAPA ROJO O ALGO ASI, O REGRESE AL MENU
    }
 
    var cam = this.cameras.main;
    if (cam.deadzone)
    {
        text.setText([
            'Cam Control: ' + moveCam,
            'ScrollX: ' + cam.scrollX,
            'ScrollY: ' + cam.scrollY,
            'MidX: ' + cam.midPoint.x,
            'MidY: ' + cam.midPoint.y,
            'deadzone left: ' + cam.deadzone.left,
            'deadzone right: ' + cam.deadzone.right,
            'deadzone top: ' + cam.deadzone.top,
            'deadzone bottom: ' + cam.deadzone.bottom
        ]);
    }
    else if (cam._tb)
    {
        text.setText([
            'Cam Control: ' + moveCam,
            'ScrollX: ' + cam.scrollX,
            'ScrollY: ' + cam.scrollY,
            'MidX: ' + cam.midPoint.x,
            'MidY: ' + cam.midPoint.y,
            'tb x: ' + cam._tb.x,
            'tb y: ' + cam._tb.y,
            'tb w: ' + cam._tb.width,
            'tb h: ' + cam._tb.height,
            'tb b: ' + cam._tb.bottom
        ]);
    }
    player.setVelocity(0);
    if (cursors.left.isDown)
    {
        player.setVelocityX(-150);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(150);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-3300);
    }

}

    function PersonaEvent (player, persona)
    {   
        countPersonas+=1;
        if(countPersonas==1){ //esto hace que si se encuentra con la primera persona le de un consejo 1
            convText="Consejo 1";
        }
        if(countPersonas==2){//esto hace que si se encuentra con la primera persona le de un consejo 2
            convText="Consejo 2";
        }
        //personas.disableBody(true, true); //aqui lo que tiene que ir es que se muestren las conversaciones 
        score += 1;   
        scoreText=score+ "/4 fragmentos";
    }

    function FinalEvent (player, checkpoint_final)
    {   
        if(score!=4){ //si no ha recogido cuatro fragmentos y llega al final gameover
            console.log("entra en el evento final")
            gameOver=true
        }
    }
