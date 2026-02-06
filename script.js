const EMAIL = "creanga_v@yahoo.com";

const copyBtn = document.getElementById("copyBtn");
const hint = document.getElementById("hint");
const clock = document.getElementById("clock");

function setHint(text) {
  if (!hint) return;
  hint.textContent = text;
  if (!text) return;
  window.clearTimeout(setHint._t);
  setHint._t = window.setTimeout(() => (hint.textContent = ""), 2200);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL);
    setHint("Copied to clipboard.");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = EMAIL;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      setHint("Copied to clipboard.");
    } catch {
      setHint("Copy failed. You can select and copy manually.");
    } finally {
      document.body.removeChild(ta);
    }
  }
}

if (copyBtn) copyBtn.addEventListener("click", copyEmail);

function tick() {
  if (!clock) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  clock.textContent = `Local time: ${hh}:${mm}`;
}

tick();
setInterval(tick, 1000 * 10);
