import { r as g, s as v, F as h } from "./chunks/buttons-6nySHfiy.js";
import { A as p } from "./chunks/ApiService-Dc-2LBYs.js";
function d(t, e) {
  t == null || t.setAttribute("aria-hidden", e ? "false" : "true");
}
function u(t, e) {
  t.querySelectorAll(h).forEach((a) => {
    ((a.textContent = String(e)), (a.hidden = !1));
  });
}
function c() {
  const t = document.querySelector("[data-favorites-page]");
  if (!t || t.dataset.favoritesPageInitialized === "true") return;
  t.dataset.favoritesPageInitialized = "true";
  const e = t.querySelector("[data-favorites-results]"),
    a = t.querySelector("[data-favorites-empty]"),
    i = t.querySelector("[data-favorites-loader]");
  if (!e || !a) return;
  let r = null;
  const l = async () => {
    const o = g();
    if ((u(t, o.length), !o.length)) {
      (r == null || r.abort(), (e.innerHTML = ""), (a.hidden = !1), d(i, !1));
      return;
    }
    (r == null || r.abort(),
      (r = new AbortController()),
      (a.hidden = !0),
      d(i, !0));
    const s = new URLSearchParams();
    (o.forEach((n) => s.append("ids[]", String(n))),
      s.set("language", t.dataset.language || "en"));
    try {
      const n = await p.postForm("/api/properties/favorites", s, {
        signal: r.signal,
      });
      if (!n.success || typeof n.html != "string")
        throw new Error("Unable to load favorites");
      ((e.innerHTML = n.html), v());
      const f = Number(n.totalCount ?? o.length);
      (u(t, f), (a.hidden = f > 0));
    } catch (n) {
      if (n.name === "AbortError") return;
      ((e.innerHTML = ""), (a.hidden = !1), u(t, 0));
    } finally {
      d(i, !1);
    }
  };
  (window.addEventListener("favorites:updated", () => {
    l();
  }),
    l());
}
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", c, { once: !0 })
  : c();
