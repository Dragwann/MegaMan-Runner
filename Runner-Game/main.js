import k from "./ctx" //import of ctx function
import game from "./scene/game";
import gameOver from "./scene/gameover";
import menu from "./scene/menu";

//assets loading
k.loadSprite("city-bg", "assets/megaman-bg.png");
k.loadSprite("platforms", "assets/platforms.png");

k.loadSprite("ennemi", "assets/ennemi-sprite-sheet.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        run: {from: 0, to: 3, loop: true, speed: 15 }
    },
});

k.loadSprite("megaman", "assets/megaman-sprite-sheet-crop.png", {
    sliceX: 5,
    sliceY: 2,
    anims: {
        run: {from: 0, to: 9, loop: true, speed: 15 },
        // jump: {from: 20, to: 24, loop: true, speed: 30 }
    },
});

k.loadSprite("bonus", "assets/coin-sprite-sheet-pixel-art.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        spin: {from: 0, to: 5, loop: true, speed: 15}
    }
})

k.loadFont("Pixel", "assets/Megaman-font.ttf");

//scene creation
k.scene("menu", menu);

k.scene("game", game);

k.scene("gameover", gameOver)

k.go("menu") //default scene

