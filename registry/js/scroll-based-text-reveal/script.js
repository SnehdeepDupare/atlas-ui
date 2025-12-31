import { animate, scroll } from "motion";

const revealText = document.getElementById("reveal-text");

scroll((progress) => animate(revealText, { opacity: progress }), {
  target: revealText,
  offset: ["start 0.8", "start 0.3"],
});
