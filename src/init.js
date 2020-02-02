var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 450 },
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
var corText;
var corText2;
var corText3;
var convText;
var convText2;
var convText3;
var countPersonas=0;
var personas;
var checkpoint_final;
var platforms;
var player;
var cursors;
var scoreText;
var score = 0; //porque el chico comienza con un fragmento
var gameOver = false;
var game = new Phaser.Game(config);
var moveCam = false;
var baseURL = 'http://localhost/gamejam2020';
var montañas;
var arboles;
function preload ()
{   
    var timer = 0;
    var loadingJump = false;
    //this.load.image('persona', 'assets/gamejam-personaje.png');
    this.load.audio("music",["assets/music/Goodbye.ogg", "assets/music/Goodbye.mp3"]);
    this.load.audio("ending",["assets/music/Credits_Diomedes.ogg", "assets/music/Credits_Diomedes.mp3"]);

    this.load.image('arbol1', 'assets/Bosque/Arboles/Arbol 1.png');
    this.load.image('arbol2', 'assets/Bosque/Arboles/Arbol 2.png');
    this.load.image('arbol3', 'assets/Bosque/Arboles/Arbol 3.png');
    this.load.image('cactus1', 'assets/Desierto/Cactus/Cactus 1.png');
    this.load.image('cactus2', 'assets/Desierto/Cactus/Cactus 2.png');
    this.load.image('cactus3', 'assets/Desierto/Cactus/Cactus 3.png');
    this.load.image('arbusto1', 'assets/Bosque/Arbustos/Arbusto 1.png');
    this.load.image('arbusto2', 'assets/Bosque/Arbustos/Arbusto 4.png');
    this.load.image('persona', 'assets/gamejam-personaje.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('fondo', 'assets/fondooriginal.jpg');
    this.load.image('platform_desierto_1', 'assets/Desierto/Plataformas/Plataforma1_1.png');
    this.load.image('platform_desierto_2', 'assets/Desierto/Plataformas/Plataforma1.png');
    this.load.image('platform_suelo', 'assets/Desierto/Suelo.png');
    this.load.image('montaña', 'assets/Bosque/Montaña.png');
    this.load.image('corazon', 'assets/fragmento.png');
    this.load.image('platform_suelo_2', 'assets/Bosque/Pisobosque.png');
    this.load.image('platformbosque_1', 'assets/Bosque/plataformabosque_1.png');
    this.load.image('platformbosque_2', 'assets/Bosque/plataformabosque_2.png');

    this.load.spritesheet('dude', 'assets/prota.png', { frameWidth: 28, frameHeight: 48 });
    
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
    this.cameras.main.setBounds(0, 0, 720 * 12, 176);
    for (x = 0; x < 2; x++)
    {
        this.add.image(1300*x, 0, 'fondo').setOrigin(0);
    }
    for (x = 2; x < 4; x++)
    {       
        this.add.image(1300*x, 0, 'fondo').setOrigin(0);
    }
    for (x = 4; x < 7; x++)
    {
        this.add.image(1300*x, 0, 'fondo').setOrigin(0);
    }
    
    platforms = this.physics.add.staticGroup();
    checkpoint_final = this.physics.add.staticGroup(); 
    personas = this.physics.add.staticGroup();
    corazon = this.physics.add.staticGroup();
    arboles = this.physics.add.staticGroup();
    montañas = this.physics.add.staticGroup();
    personas.create(3000,457, 'persona').setScale(0.3,0.3);
    personas.create(6850,88, 'persona').setScale(0.3,0.3);  
    corazon.create(250,450,'corazon');
    corazon.create(3040,454,'corazon');
    corazon.create(6900,454,'corazon');
    montañas.create(4900, 700, 'montaña');  
    platforms.create(500, 568, 'platform_suelo');
    platforms.create(1600, 568, 'platform_suelo');  
    platforms.create(2800, 568, 'platform_suelo');
    platforms.create(4000, 568, 'platform_suelo_2');
    arboles.create(680,411,'cactus3').setScale(1.3);
    arboles.create(985,416,'cactus1').setScale(1.2);
    arboles.create(2850,398,'cactus3').setScale(1.5);
    arboles.create(910,210,'cactus2').setScale(0.7);
    arboles.create(1380,300,'cactus2').setScale(0.7);
    arboles.create(2960,100,'cactus1').setScale(0.6);
    platforms.create(4700, 568, 'platform_suelo_2');
    platforms.create(5700, 568, 'platform_suelo_2');
    platforms.create(6600, 568, 'platform_suelo_2');
    platforms.create(7500, 568, 'platform_suelo_2');
    platforms.create(8500, 568, 'platform_suelo_2');
    platforms.create(9500, 568, 'platform_suelo_2');
    platforms.create(10500, 568, 'platform_suelo');
    platforms.create(11500, 568, 'platform_suelo');
    platforms.create(12600, 568, 'platform_suelo');
    platforms.create(13700, 568, 'platform_suelo');
    platforms.create(515, 415, 'platform_desierto_2');
    platforms.create(780, 370, 'platform_desierto_1');
    platforms.create(950, 280, 'platform_desierto_2');
    platforms.create(1150, 225, 'platform_desierto_1');
    platforms.create(1400, 355, 'platform_desierto_2');
    platforms.create(2580, 240, 'platform_desierto_2');
    platforms.create(3000, 160, 'platform_desierto_1');
    arboles.create(3820,363,'arbol1').setScale(1.7);
    arboles.create(3930,455,'arbusto1').setScale(1.7);
    arboles.create(4090,385,'arbol2').setScale(1.4);
    arboles.create(4390,340,'arbol3').setScale(2);
    arboles.create(4550,378,'arbol3').setScale(1.5);
    //checkpoint_final.create(4800, 454, 'star');
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
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    arboles.create(200,423,'cactus1').setScale(1.1);
    arboles.create(2185,383,'cactus2').setScale(1.8);
    arboles.create(3500,464,'arbusto1').setScale(1.3);
    arboles.create(3595,455,'arbusto2').setScale(1.7);
    arboles.create(3900,406,'arbol3').setScale(1.1);
    arboles.create(4155, 354,'arbol2').setScale(1.8);
    arboles.create(4250,378,'arbol2').setScale(1.5);
    arboles.create(4480,378,'arbol1').setScale(1.5);
    arboles.create(4600,454,'arbusto2').setScale(1.8);
    platforms.create(5100, 430, 'platformbosque_1');
    platforms.create(5500, 350, 'platformbosque_1');
    platforms.create(6000, 300, 'platformbosque_2');
    platforms.create(6400, 230, 'platformbosque_1');
    platforms.create(6800, 150, 'platformbosque_2');
    text = this.add.text(220, 240).setScrollFactor(0).setFontSize(16).setColor('#ffffff');
    corText = this.add.text(250, 45, '', { fontSize: '20px', fill: '#000' });//se ubica en el x del primer corazon
    corText2 = this.add.text(3080, 45, '', { fontSize: '20px', fill: '#000' });//se ubica en el x del segundo corazon
    corText3 = this.add.text(6940, 45, '', { fontSize: '20px', fill: '#000' });//se ubica en el x del tercer corazon
    convText = this.add.text(250, 16, '', { fontSize: '20px', fill: '#000' });//se ubica en el x de la primera persona
    convText2 = this.add.text(3080, 16, '', { fontSize: '20px', fill: '#000' });//se ubica en el x de la segunda persona
    convText3 = this.add.text(6940, 16, '', { fontSize: '20px', fill: '#000' });//se ubica en el x del checkpoint final
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
    this.physics.add.overlap(player, personas, PersonaEvent, null, this);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(personas, platforms);
    this.physics.add.collider(checkpoint_final, platforms);
    this.physics.add.overlap(player, corazon, FragmentoEvent, null, this);
    this.physics.add.overlap(player, checkpoint_final, FinalEvent, null, this);
    //this.physics.add.overlap(player, personaje2, evento, null, this); con esto se da lugar a un evento dado el personaje colisione con el personaje 2
}

function update ()
{   
   
    if (gameOver)//si se acaba el juego
    {   
        player.setVelocityX(0);
        //return;
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
 ///   player.setVelocity(0);
    if (cursors.left.isDown)
    {
        player.setVelocityX(-550);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(550);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-350);

    }

}

    function PersonaEvent (player, persona)
    {   
        persona.body.enable = false;
        countPersonas+=1;
        if(countPersonas==1){ //esto hace que si se encuentra con la primera persona le de un consejo 1
            convText2.setText("No trates de repararte a través de una relación");
        }
        if(countPersonas==2){//esto hace que si se encuentra con la primera persona le de un consejo 2
            convText3.setText("Recuerda que para compartirte debes conocerte primero");
        }
    }
    function  FragmentoEvent(player, corazon){
        corazon.disableBody(true, true); 
        score += 1;   
        if(score==1){
            corText.setText("Haz recogido tu primer fragmento, sigue descubriendote "+score+ "/3 fragmentos"); 
        }
        if(score==2){
            corText2.setText(score+ "/3 fragmentos"); 
        }
        if(score==3){
            corText3.setText(score+ "/3 fragmentos"); 
        }
        
        
    }

    function FinalEvent (player, checkpoint_final)
    {   
        checkpoint_final.body.enable = false;
        if(score==3){
            gameOver=true;
            convText3.setText("Y así podrás arreglar lo que creías perdido");
            window.location.href = baseURL+'/creditos.html';

        }
        
        if(score!=3){ //si no ha recogido cuatro fragmentos y llega al final gameover
            convText3.setText("Te falta un fragmento");
        }
    }
