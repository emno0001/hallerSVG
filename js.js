/* ------ Siden loader ------ */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runProgram);
} else {
  runProgram();
}

/* ------ Js henter svg-laget fra html'en  ------ */
function runProgram() {
  const svgDoc = document.querySelector("#svg-layer svg");
  if (!svgDoc) return;

  /* ------ Laver en konstant for alle bokse ------ */
  const bokse = ["boks1", "boks2", "boks3", "boks4", "boks5", "boks6"].map((id) => svgDoc.querySelector("#" + id));
  bokse.forEach((b) => {
    if (b) b.style.visibility = "hidden";
  });

  /* ------ Ingen bokse er valgt ------ */
  let aktivBoks = null,
    active = null;

  /* ------ Lytter efter click på et punkt ------ */
  svgDoc.addEventListener("click", function (evt) {
    const punkt = evt.target.closest("[id^='punkt']");

    /* ------ Hvis bruger klikker udenfor punkter eller på baggrund sker ingenting ------ */
    if (!punkt) return;

    /* ------ Hvis et andet punkt er valgt, skifter den det gamle punkts farve tilbage ------ */
    if (active && active !== punkt) active.setAttribute("fill", "#B63D1E");

    /* ------ Hvis en informationsboks allerede er åben, skjuler vi den igen ------ */
    if (aktivBoks) aktivBoks.style.visibility = "hidden";

    /* ------ Liste der fortæller hvilken boks der hører til hvilket punkt ------ */
    const map = { punkt1: bokse[0], punkt2: bokse[1], punkt3: bokse[2], punkt4: bokse[3], punkt5: bokse[4], punkt6: bokse[5] };

    /* ------ Finder den boks der passer til det punkt der blev klikket på ------ */
    aktivBoks = map[punkt.id] || null;

    /* ------ Hvis brugeren klikker på det samme punkt igen, skifter den punktets farve tilbage til normal ------ */
    if (active === punkt) {
      punkt.setAttribute("fill", "#B63D1E");

      /* ------ Husker at der ikke længere er et aktivt punkt eller en aktiv boks, og stop her  ------ */
      active = null;
      aktivBoks = null;
      return;
    }

    active = punkt;
    punkt.setAttribute("fill", "#631611");
    if (aktivBoks) {
      aktivBoks.style.visibility = "visible";
    }
  });
}
