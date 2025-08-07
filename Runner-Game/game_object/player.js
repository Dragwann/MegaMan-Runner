import k from "../ctx";

export function makeMegaMan(pos){
    const Player = k.add([
        k.sprite("megaman", {anim: "run"}),
        k.scale(0.4),
        k.area({ shape: new k.Rect(k.vec2(-5,0), 350, 300) }),
        k.anchor("center"),
        k.pos(pos),
        k.body({jumpForce: 1500}),
        {
            setJump() {
                k.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        // this.play("jump");
                        this.jump();
                    }
                });
            },
            setEvent() {
                this.onGround(() => {
                    this.play("run");
                });
            },
        },
    ]);

    return Player
}