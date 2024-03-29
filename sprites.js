const gravity = 0.6;

const backgroundSpritePath = "./Img/placeholder.png"

class Sprite{
    constructor({ position, velocity, dimensions, source}) {
        this.position = position
        this.velocity = velocity
        this.width = dimensions?.width;
        this.height = dimensions?.height;

        if (source) {
            this.image = new Image();
            this.image.src = source;

            this.width = this.image.width;
            this.height = this.image.height;
        }
    }

    draw(){
        if (this.image) {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
        }
        else{
            ctx.fillStyle = "white";
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        if(this.isAttacking){
            ctx.fillStyle = "red";
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    update(){
        this.draw();
    }
}

class Fighter extends Sprite{
    constructor({position, velocity, dimensions}){
        super({
            position,
            velocity,
            dimensions
        })
        
        this.velocity = velocity;
        this.width = dimensions.width;
        this.height = dimensions.height;

        this.attackBox = {
            position:{
                x: {

                },
                y: {

                }
            },
            height: 50,
            width: 125
        }

        this.isAttacking;
        this.attackCoolDown = 500;
        this.onAttackCoolDown;

        this.lastKeyPressed; 
        this.onBround;
    }
    
    update(){

        if (Math.ceil(this.position.y + this.height >= canvas.height)) {
            this.onGround = true;
        }
        else{
            this.onGround = false;
        }

        if (this.position.y + this.height > canvas.height) {
            this.velocity.y = canvas.height - this.height;
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += gravity;
        }
    
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    
        this.draw();
    }

    attack(){
        if(this.attackCoolDown) return

        this.isAttacking = true;
        this.onAttackCoolDown;

        setTimeout(() => {
            this.isAttacking = false
        }, 100);

        setTimeout(() => {
            this.onAttackCoolDown = false
        }, this.attackCoolDown)
    }

    jump(){
        if (!this.onGround) return
        this.velocity.y = -16;
    }
}

const player = new Fighter({
    position: {
        y: 100,
        x: 0
    },
    velocity:{
        x: 0,
        y: 10
    },
    dimensions: {
        width : 50,
        height: 150
    }
})

// const player2 = new Fighter({
//     position: {
//         y: 500,
//         x: 20
//     },
//     velocity: {
//         x: 0,
//         y: 0
//     },
//     dimensions: {
//         width : 50,
//         height: 200
//     }
// })

const background =  new Sprite({
    position: {
        y: 0,
        x: 0
    },
    source: backgroundSpritePath
})