document.addEventListener("DOMContentLoaded", runProgram);

async function runProgram() {
  // 1. LOAD SVG korrekt
  const res = await fetch("BaggrundKort.svg");
  const svg = await res.text();

  document.querySelector("#svg-layer").innerHTML = svg;

  const svgDoc = document.querySelector("#svg-layer svg");

  // 2. find bokse INDE i SVG
  let boks1 = svgDoc.querySelector("#boks1");
  let boks2 = svgDoc.querySelector("#boks2");
  let boks3 = svgDoc.querySelector("#boks3");
  let boks4 = svgDoc.querySelector("#boks4");
  let boks5 = svgDoc.querySelector("#boks5");
  let boks6 = svgDoc.querySelector("#boks6");

  const bokse = [boks1, boks2, boks3, boks4, boks5, boks6];

  bokse.forEach((b) => {
    if (b) b.style.visibility = "hidden";
  });

  // aktive elementer
  let aktivBoks = null;
  let active = null;

  // farver
  const originalColor = "#B63D1E";
  const activeColor = "#631611";

  // 3. klik på punkter
  svgDoc.addEventListener("click", function (evt) {
    const punkt = evt.target.closest("[id^='punkt']");
    if (!punkt) return;

    const id = punkt.id;

    // ------------------------------------
    // reset tidligere punkt-farve
    // ------------------------------------

    if (active && active !== punkt) {
      active.setAttribute("fill", originalColor);
    }

    // ------------------------------------
    // skjul tidligere boks
    // ------------------------------------

    if (aktivBoks) {
      aktivBoks.style.visibility = "hidden";
      aktivBoks.classList.remove("bounce");
    }

    // ------------------------------------
    // vælg korrekt boks
    // ------------------------------------

    if (id === "punkt1") aktivBoks = boks1;
    if (id === "punkt2") aktivBoks = boks2;
    if (id === "punkt3") aktivBoks = boks3;
    if (id === "punkt4") aktivBoks = boks4;
    if (id === "punkt5") aktivBoks = boks5;
    if (id === "punkt6") aktivBoks = boks6;

    // ------------------------------------
    // hvis samme punkt klikkes igen
    // ------------------------------------

    if (active === punkt) {
      punkt.setAttribute("fill", originalColor);

      if (aktivBoks) {
        aktivBoks.style.visibility = "hidden";
      }

      active = null;
      aktivBoks = null;

      return;
    }

    // ------------------------------------
    // gør nyt punkt aktivt
    // ------------------------------------

    active = punkt;

    // skift farve
    punkt.setAttribute("fill", activeColor);

    // vis boks
    if (aktivBoks) {
      aktivBoks.style.visibility = "visible";
      triggerBounce(aktivBoks);
    }
  });
}
