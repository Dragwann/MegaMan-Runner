import k from "../ctx";

export default function gameOver() {
	let highScore = k.getData("highscore") || 0;
	const currentScore = k.getData("current-score") || 0;

	// Update highscore if needed
	if (currentScore > highScore) {
		k.setData("highscore", currentScore);
		highScore = currentScore;
	}

	// Title
	k.add([
		k.text("GAME OVER", { font: "pixel", size: 90 }),
		k.anchor("center"),
		k.pos(k.center().x, k.center().y - 300),
	]);

	// Highscore label
	k.add([
		k.text("HIGHSCORE", { font: "pixel", size: 45 }),
		k.anchor("center"),
		k.pos(k.center().x - 400, k.center().y - 200),
	]);

	// Highscore value
	k.add([
		k.text(`${highScore}`, { font: "pixel", size: 45 }),
		k.anchor("center"),
		k.pos(k.center().x - 400, k.center().y - 150),
	]);

	// Current score label
	k.add([
		k.text("CURRENT SCORE", { font: "pixel", size: 45 }),
		k.anchor("center"),
		k.pos(k.center().x + 400, k.center().y - 200),
	]);

	// Current score value
	k.add([
		k.text(`${currentScore}`, { font: "pixel", size: 45 }),
		k.anchor("center"),
		k.pos(k.center().x + 400, k.center().y - 150),
	]);

	// Flashing restart prompt
	const prompt = k.add([
		k.text("Press SPACE or click to play again", { font: "pixel", size: 40 }),
		k.anchor("center"),
		k.pos(k.center().x, k.center().y + 250),
	]);

	// Make the text flash
	k.loop(0.6, () => {
		prompt.hidden = !prompt.hidden;
	});

	// Restart events
	k.onKeyPress("space", () => k.go("game"));
	k.onClick(() => k.go("game"));
}