import kaplay from "kaplay";

// Context Initialisation
const k = kaplay({
width: 1920,
height: 1080,
letterbox: true,
background: [0,0,0],
global: false,
buttons: {
    jump: {
        keyboard: ["space"],
        mouse: "left",
    }
},
debugKey: "b",
debug: true,
});

export default k;
