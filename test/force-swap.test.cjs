const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

function element() {
  const classes = new Set();
  return {
    style: {}, children: [], className: "", innerHTML: "",
    classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name), contains: (name) => classes.has(name) },
    appendChild(child) { this.children.push(child); },
    addEventListener(event, callback) { this[event] = callback; }
  };
}

function moduleInstance(name, number, hidden = false, locked = false) {
  return {
    name, data: { identifier: `module_${number}_${name}` }, hidden, calls: [],
    show(speed, callback, options) {
      this.calls.push({ action: "show", speed, callback, options });
      if (!locked || options.force) this.hidden = false;
    },
    hide(speed, callback, options) {
      this.calls.push({ action: "hide", speed, callback, options });
      this.hidden = true;
    }
  };
}

function harness(modules, options = {}) {
  let definition;
  const requests = [];
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../MMM-Modulebar.js"), "utf8"), {
    Module: { register: (_name, value) => { definition = value; } },
    MM: { getModules: () => modules }, document: { createElement: element },
    console: { log() {} }, fetch: (url) => requests.push(url)
  });
  const bar = Object.assign({}, definition, {
    identifier: "module_9_MMM-Modulebar",
    config: Object.assign({}, definition.defaults, { animationSpeed: 0 }, options)
  });
  const dom = bar.getDom();
  const buttons = dom.children.slice(0, -1);
  return { bar, buttons, overlay: dom.children.at(-1), requests };
}

test("showing a swap member hides its peers and refreshes their text and icons", () => {
  const calendar = moduleInstance("calendar", 1, true);
  const news = moduleInstance("newsfeed", 2);
  const clock = moduleInstance("clock", 3);
  const { buttons } = harness([calendar, news, clock], {
    forceSwap: ["calendar", "newsfeed"],
    buttons: {
      1: { module: "calendar", text: "Calendar on", text2: "Calendar off" },
      2: { module: "newsfeed", text: "News on", text2: "News off", symbol: "bell", symbol2: "bell-slash" }
    }
  });
  assert.equal(buttons[0].children[0].innerHTML, "Calendar off");
  buttons[0].click();
  assert.equal(calendar.hidden, false);
  assert.equal(news.hidden, true);
  assert.equal(clock.hidden, false);
  assert.equal(buttons[1].children[1].innerHTML, "News off");
  assert.match(buttons[1].children[0].className, /bell-slash$/);
  buttons[1].click();
  assert.equal(calendar.hidden, true);
  assert.equal(news.hidden, false);
  assert.equal(buttons[0].children[0].innerHTML, "Calendar off");
  assert.equal(buttons[1].children[1].innerHTML, "News on");
  for (const item of [calendar, news]) {
    assert.ok(item.calls.every((call) => call.callback === 0 && call.options.force === false));
  }
});

test("unrelated buttons and hiding a visible member do not hide the group", () => {
  const calendar = moduleInstance("calendar", 1);
  const news = moduleInstance("newsfeed", 2);
  const clock = moduleInstance("clock", 3, true);
  const { buttons } = harness([calendar, news, clock], {
    forceSwap: ["calendar", "newsfeed"],
    buttons: { 1: { module: "clock" }, 2: { module: "calendar" } }
  });
  buttons[0].click();
  assert.equal(calendar.hidden, false);
  assert.equal(news.hidden, false);
  buttons[1].click();
  assert.equal(calendar.hidden, true);
  assert.equal(news.hidden, false);
});

test("empty or invalid groups preserve independent toggles", () => {
  for (const forceSwap of [[], null, "calendar"]) {
    const calendar = moduleInstance("calendar", 1, true);
    const news = moduleInstance("newsfeed", 2);
    const { buttons } = harness([calendar, news], { forceSwap, buttons: { 1: { module: "calendar" } } });
    buttons[0].click();
    assert.equal(calendar.hidden, false);
    assert.equal(news.hidden, false);
  }
});

test("numeric and array instance selectors keep selected instances together", () => {
  for (const idnum of [1, "1", ["1", 2], undefined]) {
    const targets = [moduleInstance("calendar", 1, true), moduleInstance("calendar", 2, true)];
    const news = moduleInstance("newsfeed", 3);
    const { buttons } = harness([...targets, news], {
      forceSwap: ["calendar", "newsfeed"], buttons: { 1: { module: "calendar", idnum } }
    });
    buttons[0].click();
    assert.equal(targets[0].hidden, false);
    assert.equal(targets[1].hidden, idnum === 1 || idnum === "1");
    assert.equal(news.hidden, true);
  }
});

test("a locked target does not blank the group and allowForce still works", () => {
  for (const allowForce of [false, true]) {
    const calendar = moduleInstance("calendar", 1, true, true);
    const news = moduleInstance("newsfeed", 2);
    const { buttons } = harness([calendar, news], {
      allowForce, forceSwap: ["calendar", "newsfeed"],
      buttons: { 1: { module: "calendar", text: "on", text2: "off" } }
    });
    buttons[0].click();
    assert.equal(calendar.hidden, !allowForce);
    assert.equal(news.hidden, allowForce);
    assert.equal(buttons[0].children[0].innerHTML, allowForce ? "on" : "off");
  }
});

test("peer images refresh and URL hooks only run for the clicked button", () => {
  const calendar = moduleInstance("calendar", 1, true);
  const news = moduleInstance("newsfeed", 2);
  const { buttons, requests } = harness([calendar, news], {
    forceSwap: ["calendar", "newsfeed"], buttons: {
      1: { module: "calendar", showUrl: "/calendar/show", hideUrl: "/calendar/hide" },
      2: { module: "newsfeed", img: "on.png", img2: "off.png", hideUrl: "/news/hide" }
    }
  });
  buttons[0].click();
  assert.equal(buttons[1].children[0].src, "off.png");
  assert.deepEqual(requests, ["/calendar/show"]);
  buttons[0].click();
  assert.deepEqual(requests, ["/calendar/show", "/calendar/hide"]);
});

test("hide-all overlay remains independent of swap visibility", () => {
  const calendar = moduleInstance("calendar", 1);
  const { buttons, overlay } = harness([calendar], {
    forceSwap: ["calendar"], buttons: { 1: { module: "all", symbol: "toggle-on", symbol2: "toggle-off" } }
  });
  buttons[0].click();
  assert.equal(overlay.classList.contains("paint-it-black--visible"), true);
  assert.equal(calendar.hidden, false);
  buttons[0].click();
  assert.equal(overlay.classList.contains("paint-it-black--visible"), false);
});
