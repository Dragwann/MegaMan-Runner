import k from "../ctx";
import { makeBonus } from "../game_object/bonus";
import { makeEnnemi } from "../game_object/ennemi";
import { makeMegaMan } from "../game_object/player";

export default function game() {
	k.setGravity(3100);

	// Dimensions
	const bgWidth = 1920;
	const floorWidth = 1280;
	const bgSpeed = 100;
	const floorSpeed = 1000;
	const floorY = 450;

	// Infinite scroll
	const bgInfinite = [
		k.add([k.sprite("city-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
		k.add([k.sprite("city-bg"), k.pos(bgWidth * 2, 0), k.scale(2), k.opacity(0.8)]),
	];

	const floor = [
		k.add([k.sprite("platforms"), k.pos(0, floorY), k.scale(4)]),
		k.add([k.sprite("platforms"), k.pos(floorWidth * 4, floorY), k.scale(4)]),
	];

	// Score setup
	let score = 0;
	const scoreDisplay = k.add([
		k.text("SCORE : 0", { font: "pixel", size: 74 }),
		k.pos(20, 20),
	]);

	// Update score every second
	k.loop(1, () => {
		score++;
		scoreDisplay.text = `SCORE : ${score}`;
	});

	// Player setup
	const megaMan = makeMegaMan(k.vec2(200, 755));
	megaMan.setJump();
	megaMan.setEvent();

	megaMan.onCollide("ennemi", () => {
        k.setData("current-score", score);
		k.go("gameover");
	});

	megaMan.onCollide("bonus", (bonus) => {
		k.destroy(bonus);
		score += 10;
		scoreDisplay.text = `SCORE : ${score}`;
	});

	// Game speed logic
	let gameSpeed = 300;
	k.loop(1, () => {
		gameSpeed += 40;
	});

	// Ennemi spawn
	const genEnnemi = () => {
		const ennemi = makeEnnemi(k.vec2(1950, 773));

		ennemi.onUpdate(() => {
			const speed = gameSpeed < 3000 ? gameSpeed + 300 : gameSpeed;
			ennemi.move(-speed, 0);
		});

		ennemi.onExitScreen(() => {
			if (ennemi.pos.x < 0) k.destroy(ennemi);
		});

		const delay = k.rand(0.7, 2.5);
		k.wait(delay, genEnnemi);
	};
	genEnnemi();

	// Bonus spawn
	const genBonus = () => {
		const bonus = makeBonus(k.vec2(1950, 500));

		bonus.onUpdate(() => {
			const speed = gameSpeed < 3000 ? gameSpeed + 300 : gameSpeed;
			bonus.move(-speed, 0);
		});

		bonus.onExitScreen(() => {
			if (bonus.pos.x < 0) k.destroy(bonus);
		});

		const delay = k.rand(1, 6);
		k.wait(delay, genBonus);
	};
	genBonus();

	// Invisible floor hitbox
	k.add([
		k.rect(1920, 300),
		k.opacity(0),
		k.area(),
		k.body({ isStatic: true }),
		k.pos(0, 832),
	]);

	// Infinite scroll update
	k.onUpdate(() => {
		// Background
		bgInfinite.forEach((b) => b.move(-bgSpeed, 0));
		if (bgInfinite[1].pos.x < 0) {
			bgInfinite[0].moveTo(bgInfinite[1].pos.x + bgWidth * 2, 0);
			bgInfinite.push(bgInfinite.shift());
		}
		bgInfinite[1].moveTo(bgInfinite[0].pos.x + bgWidth * 2, 0);

		// Floor
		floor.forEach((f) => f.move(-gameSpeed, 0));
		if (floor[1].pos.x < 0) {
			floor[0].moveTo(floor[1].pos.x + floorWidth * 4, floorY);
			floor.push(floor.shift());
		}
		floor[1].moveTo(floor[0].pos.x + floorWidth * 4, floorY);
	});
}
