// A structure's crafting panel, made to look like the game's (see the screenshots): HTML/CSS boxes in the game's box
// colours (sprTextBox), the game's own UI font (sprFont, drawn glyph by glyph), the item sprites enlarged crisply.
(function () {
  let font = null;
  async function ready() {
    if (!font) font = await fetch("ui/sprfont.json").then((r) => r.json());
  }
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).toUpperCase().replace(/×/g, "x");
  const glyph = (ch) => font.glyphs[ch] || font.glyphs[ch.normalize("NFD")[0]] || null;

  // Text in the game's font: one span per letter, cut from the font atlas (colour: white, dim, yellow, green).
  // Letters the game's font doesn't have (Cyrillic) make the whole text use a pixel web font instead.
  const FB = { white: "#fff", dim: "#c9c6d6", yellow: "#ffe45c", green: "#7dffa0" };
  function ft(s, { color = "white", size = 1 } = {}) {
    const cell = font.cell * size, sep = 2 * size;
    if ([...norm(s)].some((ch) => ch !== " " && !glyph(ch)))
      return `<span class="ftx" style="color:${FB[color] || "#fff"};font-size:${11 * size}px">${esc(norm(s))}</span>`;
    let html = "";
    for (const ch of norm(s)) {
      const g = ch === " " ? null : glyph(ch);
      if (!g) { html += `<i style="width:${8 * size}px"></i>`; continue; }
      html += `<i style="width:${g[1] * size}px;height:${cell}px;margin-right:${sep}px;background:url(ui/sprfont-${color}.png) -${g[0] * size}px 0/${24 * 85 * size}px ${cell}px"></i>`;
    }
    return `<span class="ft">${html}</span>`;
  }

  const style = `
  .cp { display: flex; gap: 6px; align-items: flex-start; justify-content: center; padding: 6px 4px 10px; user-select: none; }
  .cp .ft { display: inline-flex; align-items: center; flex-wrap: nowrap; line-height: 0; }
  .cp .ft i { display: inline-block; image-rendering: pixelated; flex: 0 0 auto; }
  .ftx { font-family: "Press Start 2P", monospace; line-height: 1.35; letter-spacing: 0; white-space: nowrap;
    text-shadow: 2px 0 #17111a, -2px 0 #17111a, 0 2px #17111a, 0 -2px #17111a, 2px 2px #17111a, -2px 2px #17111a, 2px -2px #17111a, -2px -2px #17111a, 0 4px #17111a; }
  .cp .fb { background: #7884ab; border: 3px solid #17111a; border-radius: 8px;
    box-shadow: inset 0 3px 0 #b2bcc2, inset 0 -6px 0 #3e375c; }
  .cp .fb.y { background: #ffbf36; box-shadow: inset 0 3px 0 #fff275, inset 0 -6px 0 #c44d29; }
  .cp .fb.p { background: #bf3fb3; box-shadow: inset 0 3px 0 #ff80aa, inset 0 -6px 0 #682b82; }
  .cp .fb.o { background: #cf7957; box-shadow: inset 0 3px 0 #ffd1ab, inset 0 -6px 0 #753939; }
  .cp img.px { image-rendering: pixelated; }
  .cp .cp-left { width: 360px; position: relative; padding-top: 44px; }
  .cp .cp-plate { position: absolute; top: 0; left: 22px; right: 18px; height: 70px; z-index: 2; display: flex; align-items: center; gap: 12px; padding: 4px 14px 8px; }
  .cp .cp-plate img { height: 56px; }
  .cp .cp-plate .cp-nm { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .cp .cp-list { padding: 36px 8px 12px 12px; }
  .cp .cp-scroll { display: flex; flex-direction: column; gap: 7px; max-height: min(600px, 70vh); overflow-y: auto; padding: 2px 6px 6px 0; scrollbar-width: thin; scrollbar-color: #3e375c transparent; }
  .cp .cp-scroll::-webkit-scrollbar { width: 10px; } .cp .cp-scroll::-webkit-scrollbar-thumb { background: #3e375c; border: 2px solid #17111a; border-radius: 6px; }
  .cp button.fb { -webkit-appearance: none; appearance: none; margin: 0; font: inherit; color: inherit; cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; transition: transform .06s, filter .1s; }
  .cp button.fb:hover { filter: brightness(1.08); }
  .cp button.fb:active, .cp button.fb.cp-sel { transform: translateY(3px); box-shadow: inset 0 3px 0 #3e375c, inset 0 -2px 0 #3e375c; filter: brightness(.95); }
  .cp button.fb.y:active { box-shadow: inset 0 3px 0 #c44d29, inset 0 -2px 0 #c44d29; }
  .cp button.fb.p:active { box-shadow: inset 0 3px 0 #682b82, inset 0 -2px 0 #682b82; }
  .cp button.fb.o:active { box-shadow: inset 0 3px 0 #753939, inset 0 -2px 0 #753939; }
  .cp button.fb:focus-visible { filter: brightness(1.15); }
  .cp .cp-rowb { min-height: 48px; width: 100%; display: flex; align-items: center; gap: 12px; padding: 0 12px 4px; text-align: left; flex: 0 0 auto; }
  .cp .cp-ico { display: grid; place-items: center; flex: 0 0 auto; }
  .cp .cp-ico img { zoom: 2; image-rendering: pixelated; }
  .cp .cp-rowb .cp-ico { width: 32px; height: 32px; }
  .cp .cp-rowb .cp-names { display: flex; flex-direction: column; gap: 3px; overflow: hidden; }
  .cp .cp-right { position: sticky; top: 0; width: 380px; padding: 16px 14px 16px; display: flex; flex-direction: column; align-items: center; gap: 9px; }
  .cp .cp-big { height: 64px; margin: 2px 0; } .cp .cp-big img { zoom: 3; }
  .cp .cp-lines { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .cp .cp-ings { align-self: stretch; display: flex; flex-direction: column; gap: 6px; margin-top: 6px; }
  .cp .cp-ing { display: flex; align-items: center; gap: 12px; min-height: 38px; }
  .cp .cp-ing .cp-ico { width: 40px; height: 36px; }
  .cp .cp-ing .n { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .cp .cp-craftrow { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
  .cp .cp-arrow { width: 0; height: 0; border: 13px solid transparent; cursor: pointer; filter: drop-shadow(2px 0 0 #17111a) drop-shadow(-2px 0 0 #17111a) drop-shadow(0 2px 0 #17111a) drop-shadow(0 -2px 0 #17111a); }
  .cp .cp-arrow.l { border-right: 16px solid #fff; border-left: 0; }
  .cp .cp-arrow.r { border-left: 16px solid #fff; border-right: 0; }
  .cp .cp-arrow.cp-off { opacity: .25; cursor: default; }
  .cp .cp-craft { width: 270px; height: 48px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px 5px 12px; }
  .cp .cp-craft img { width: 28px; height: 28px; }
  .cp .cp-btns { display: grid; grid-template-columns: 140px 140px; gap: 10px 12px; margin-top: 4px; }
  .cp .cp-btns button { height: 54px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding-bottom: 5px; }
  .cp .cp-tag { margin-top: 2px; }`;

  async function open(station, D, host) {
    await ready();
    let sel = 0, tier = 0;
    const iconOf = (id) => `items/${id}.png`;

    function render() {
      const keep = host.querySelector(".cp-scroll") ? host.querySelector(".cp-scroll").scrollTop : 0;
      const base = station.recipes[sel], it = base.chain ? base.chain[tier] : base;
      const u = it.unlock;
      const tr = (window.t || ((k) => k));
      const unlockText = u.type === "default" ? tr("unlockedStart") : u.type === "skill" ? `${tr("skill")} ${u.name}` : u.name;
      const words = (s, max) => {  // break a name into lines of about `max` characters
        const out = []; let line = "";
        for (const w of String(s).split(/\s+/)) { if (line && (line + " " + w).length > max) { out.push(line); line = w; } else line = line ? line + " " + w : w; }
        if (line) out.push(line); return out;
      };
      const list = station.recipes.map((r, i) => {
        const color = "white";
        const lines = words(r.name, 16).slice(0, 2);
        return `<button type="button" class="fb cp-rowb ${i === sel ? "cp-sel" : ""}" data-i="${i}" title="${esc(r.name)}"><span class="cp-ico"><img src="${iconOf(r.id)}" alt=""></span>
          <span class="cp-names">${lines.map((l) => ft(l, { color })).join("")}</span></button>`;
      }).join("");
      const ings = it.cost.map((c) => {
        const nm = words(D.itemNames[c.id] || "#" + c.id, 13);
        return `<div class="cp-ing"><span class="cp-ico" title="${esc(D.itemNames[c.id])}"><img src="${iconOf(c.id)}" alt=""></span>
          <div class="n">${nm.map((l) => ft(l, {})).join("")}</div>${ft(String(c.n))}</div>`;
      }).join("");
      host.innerHTML = `<style>${style}</style><div class="cp">
        <div class="cp-left">
          <div class="fb cp-plate"><img class="px" src="${esc(station.image)}" alt=""><div class="cp-nm">${words(station.name, 12).map((l) => ft(l)).join("")}</div></div>
          <div class="fb cp-list"><div class="cp-scroll">${list}</div></div>
        </div>
        <div class="fb cp-right">
          ${ft(it.name)}
          ${base.chain ? ft(tr("tierOf", tier + 1, base.chain.length), {}) : ft(`id ${it.id}`)}
          <span class="cp-ico cp-big"><img src="${iconOf(it.id)}" alt=""></span>
          <div class="cp-lines">${words(it.desc, 20).map((l) => ft(l, {})).join("")}</div>
          <div class="cp-lines cp-tag">${words(unlockText, 20).map((l) => ft(l, { color: u.type === "default" ? "green" : "yellow" })).join("")}</div>
          <div class="cp-ings">${ings}</div>
          <div class="cp-craftrow">
            <span class="cp-arrow l ${base.chain ? "" : "cp-off"}" data-a="-1"></span>
            <button type="button" class="fb y cp-craft"><img class="px" src="craft/sprCraftHammer0.png" alt="">${ft(tr("btnCraft"))}${ft(base.chain ? String(tier + 1) : "1")}</button>
            <span class="cp-arrow r ${base.chain ? "" : "cp-off"}" data-a="1"></span>
          </div>
          <div class="cp-btns">
            <button type="button" class="fb p">${ft(tr("btnHalf"))}</button><button type="button" class="fb p">${ft(tr("btnMax"))}</button>
            <button type="button" class="fb p">${ft(tr("btnInf"))}</button><button type="button" class="fb o">${ft(tr("btnPin1"))}${ft(tr("btnPin2"))}</button>
          </div>
        </div></div>`;
      host.querySelector(".cp-scroll").scrollTop = keep;
      host.querySelectorAll(".cp-rowb").forEach((el) => el.addEventListener("click", () => { sel = +el.dataset.i; tier = 0; render(); }));
      host.querySelectorAll(".cp-arrow").forEach((el) => el.addEventListener("click", () => {
        const chain = station.recipes[sel].chain;
        if (!chain) return;
        tier = (tier + +el.dataset.a + chain.length) % chain.length; render();
      }));
    }
    render();
  }

  window.CraftPanel = { open, ready, ft: (s, o) => ft(s, o) };
})();
