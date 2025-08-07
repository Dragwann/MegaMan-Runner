import k from "../ctx";

export function makeEnnemi(pos){
    return k.add([
        k.sprite("ennemi", {anim: "run"}),
        k.scale(4),
        k.area({ shape: new k.Rect(k.vec2(-5,0), 20, 20) }),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "ennemi",
    ]);
}