import k from "../ctx";

export function makeBonus(pos){
    return k.add([
        k.sprite("bonus", {anim: "spin"}),
        k.scale(0.5),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "bonus",
    ]);
}