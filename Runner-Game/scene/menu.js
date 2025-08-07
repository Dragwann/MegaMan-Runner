import k from "../ctx";
import { makeMegaMan } from "../game_object/player";

export default function menu() {
	// Highscore settings
	if (!k.getData("highscore")) k.setData("highscore", 0);

	// Menu scene switch with game scene on action
	k.onButtonPress("jump", () => k.go("game"));

	// Dimensions
	const bgWidth = 1920;
	const floorWidth = 1280;

	const bgSpeed = 100;
	const floorSpeed = 1000;

	// Infinite scroll
	const bgInfinite = [
		k.add([k.sprite("city-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
		k.add([k.sprite("city-bg"), k.pos(bgWidth * 2, 0), k.scale(2), k.opacity(0.8)]),
	];

	const floorY = 450;
	const floor = [
		k.add([k.sprite("platforms"), k.pos(0, floorY), k.scale(4)]),
		k.add([k.sprite("platforms"), k.pos(floorWidth * 4, floorY), k.scale(4)]),
	];

    k.add([
        k.text("MEGAMAN RUNNER", {font: "pixel", size: 90}), 
        k.pos(k.center().x, 200),
        k.anchor("center")
    ]);

    k.add([
        k.text("Press spacebar or click to Start", {font: "pixel", size: 45}), 
        k.pos(k.center().x, 300),
        k.anchor("center")
    ]);

    makeMegaMan(k.vec2(200,755)); //load megaman player object in the scene

	k.onUpdate(() => {
		// Background
		bgInfinite.forEach(b => b.move(-bgSpeed, 0));
		if (bgInfinite[1].pos.x < 0) {
			bgInfinite[0].moveTo(bgInfinite[1].pos.x + bgWidth * 2, 0);
			bgInfinite.push(bgInfinite.shift());
		}
		bgInfinite[1].moveTo(bgInfinite[0].pos.x + bgWidth * 2, 0);

		// Floor
		floor.forEach(f => f.move(-floorSpeed, 0));
		if (floor[1].pos.x < 0) {
			floor[0].moveTo(floor[1].pos.x + floorWidth * 4, floorY);
			floor.push(floor.shift());
		}
		floor[1].moveTo(floor[0].pos.x + floorWidth * 4, floorY);
	});
}
