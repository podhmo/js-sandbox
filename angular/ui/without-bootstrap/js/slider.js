'use strict';
const slider = document.querySelector(".slider");
console.log(`left: ${slider.offsetLeft}, top: ${slider.offsetTop}, height: ${slider.offsetHeight}`);
Array.prototype.forEach.call(document.querySelectorAll(".box"), (e) => {
  console.log(`box left: ${e.offsetLeft}, top: ${e.offsetTop}, height: ${e.offsetHeight}`);
});

// detect position
let boundingArea = [];
function setup(e) {
  Array.prototype.forEach.call(e.querySelectorAll(".box"), (e) => {
    e.addEventListener("click", (event) => {
      console.log(`clicked: ${event.currentTarget.innerHTML}`);
    });
  });
  e.addEventListener("touchstart", (event) => {
    boundingArea = [];
    Array.prototype.forEach.call(event.currentTarget.querySelectorAll(".box"), (e) => {
      boundingArea.push({
        el: e,
        x0: e.offsetLeft,
        x1: e.offsetLeft + e.offsetWidth,
        y0: e.offsetTop,
        y1: e.offsetTop + e.offsetHeight
      });
    });
  });
  // debounce
  let debounceTimer = null;
  e.addEventListener("touchmove", (event) => {
    if (debounceTimer) {
      return;
    }
    debounceTimer = setTimeout(() => {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }, 100);

    const t = event.targetTouches[0];
    // console.log(JSON.stringify({clientX: t.clientX, clientY: t.clientY, screenX: t.screenX, screenY: t.screenY}));
    let satisfied = null;
    let inactives = [];
    let actives = [];
    for (const box of boundingArea) {
      const x = t.clientX;
      const y = t.clientY;
      // console.log(`x0 < x < x1 = ${box.x0 <= x && x <= box.x1},  y0 < y < y1 = ${box.y0 <= y && y <= box.y1}`);
      if (box.x0 <= x && x <= box.x1 && box.y0 <= y && y <= box.y1) {
        satisfied = box;
        actives = actives.concat(inactives);
        actives.push(box.el);
        var clickEvent = document.createEvent('Events');
        clickEvent.initEvent("click", true, false);
        box.el.dispatchEvent(clickEvent);
        inactives = [];
      } else {
        inactives.push(box.el);
      }
    }
    if (inactives.length === boundingArea.length) {
      return;
    }
    // console.log(`inactives: ${inactives.length}, actives: ${actives.length}`);
    for (const e of inactives) {
      e.classList.remove("box--active");
    }
    for (const e of actives) {
      e.classList.add("box--active");
    }
  });
}
setup(document.querySelector(".slider"));
