if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runProgram);
} else {
  runProgram();
}

function runProgram() {
  const svgDoc = document.querySelector("#svg-layer svg");
  if (!svgDoc) return;

  const bokse = ["boks1", "boks2", "boks3", "boks4", "boks5", "boks6"].map((id) => svgDoc.querySelector("#" + id));
  bokse.forEach((b) => {
    if (b) b.style.visibility = "hidden";
  });

  let aktivBoks = null,
    active = null;

  function triggerBounce(el) {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "bounce 0.3s ease";
  }

  svgDoc.addEventListener("click", function (evt) {
    const punkt = evt.target.closest("[id^='punkt']");
    if (!punkt) return;
    if (active && active !== punkt) active.setAttribute("fill", "#B63D1E");
    if (aktivBoks) aktivBoks.style.visibility = "hidden";
    const map = { punkt1: bokse[0], punkt2: bokse[1], punkt3: bokse[2], punkt4: bokse[3], punkt5: bokse[4], punkt6: bokse[5] };
    aktivBoks = map[punkt.id] || null;
    if (active === punkt) {
      punkt.setAttribute("fill", "#B63D1E");
      active = null;
      aktivBoks = null;
      return;
    }
    active = punkt;
    punkt.setAttribute("fill", "#631611");
    if (aktivBoks) {
      aktivBoks.style.visibility = "visible";
      triggerBounce(aktivBoks);
    }
  });
}
