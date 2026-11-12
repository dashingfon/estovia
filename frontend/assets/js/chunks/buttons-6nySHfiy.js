const l = "favs",
  S = "favorites:updated",
  a = ".favorite-button",
  i = "[data-favorites-count]",
  _ = "[data-favorites-count-large], [data-favorites-count]";
function d(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e != "string") return null;
  const t = e.trim();
  return t ? (/^\d+$/.test(t) ? Number(t) : t) : null;
}
function c() {
  try {
    const e = localStorage.getItem(l),
      t = e ? JSON.parse(e) : [],
      r = Array.isArray(t) ? t.map(d).filter((o) => o !== null) : [];
    return Array.from(new Set(r));
  } catch {
    return [];
  }
}
function y() {
  return c().length;
}
function E(e = y()) {
  document.querySelectorAll(i).forEach((t) => {
    ((t.textContent = String(e)), (t.hidden = e === 0));
  });
}
function f(e) {
  try {
    localStorage.setItem(l, JSON.stringify(e));
  } catch {}
  ((window.storedFavs = e), E(e.length));
}
function A(e) {
  (f(e),
    window.dispatchEvent(new CustomEvent(S, { detail: { count: e.length } })));
}
function F() {
  const e = c();
  return (f(e), e);
}
const T = 3e3,
  h = 5;
function O(e) {
  let t = document.querySelector("[data-favorite-toast-stack]");
  t ||
    ((t = document.createElement("div")),
    (t.className = "favorite-toast-stack"),
    (t.dataset.favoriteToastStack = ""),
    t.setAttribute("aria-live", "polite"),
    t.setAttribute("aria-atomic", "false"),
    document.body.appendChild(t));
  const r = document.createElement("div");
  ((r.className = "favorite-toast"), (r.textContent = e), t.appendChild(r));
  const o = Array.from(t.querySelectorAll(".favorite-toast"));
  (o.slice(0, Math.max(0, o.length - h)).forEach((n) => n.remove()),
    window.setTimeout(() => {
      r.isConnected &&
        (r.classList.add("is-hiding"),
        r.addEventListener("transitionend", () => r.remove(), { once: !0 }));
    }, T));
}
let s = null;
function u(e) {
  var t;
  return d(
    e.dataset.favoriteId ??
      ((t = e.closest("[data-id]")) == null ? void 0 : t.dataset.id),
  );
}
function v(e, t) {
  (e.classList.toggle("is-active", t),
    e.setAttribute("aria-pressed", t ? "true" : "false"),
    e.setAttribute(
      "aria-label",
      t ? "Remove from favorites" : "Save to favorites",
    ));
}
function g() {
  const e = F();
  document.querySelectorAll(a).forEach((t) => {
    const r = u(t);
    v(t, r !== null && e.includes(r));
  });
}
function p() {
  s === null &&
    (s = window.requestAnimationFrame(() => {
      ((s = null), g());
    }));
}
function b() {
  new MutationObserver((t) => {
    t.some((o) =>
      Array.from(o.addedNodes).some((n) =>
        n instanceof HTMLElement
          ? n.matches(a) ||
            n.matches(i) ||
            n.querySelector(a) !== null ||
            n.querySelector(i) !== null
          : !1,
      ),
    ) && p();
  }).observe(document.body, { childList: !0, subtree: !0 });
}
function w(e, t) {
  document.querySelectorAll(a).forEach((r) => {
    u(r) === e && v(r, t);
  });
}
function C(e) {
  const t = u(e);
  if (t === null) return;
  const r = c(),
    o = r.includes(t),
    n = o ? r.filter((m) => m !== t) : [...r, t];
  (A(n),
    w(t, !o),
    O(o ? "Removed from favorites" : "Property added to favorites"));
}
export { _ as F, a, l as b, b as i, c as r, g as s, C as t };
