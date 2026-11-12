import "./filters.js";
import "./chunks/filters-by-country-CTCbVeLt.js";
import "./chunks/select-CgPps8-F.js";
import { i as S } from "./chunks/property-card-CeRf2ke5.js";
import { i as I } from "./chunks/property-map-CRvHGPW1.js";
import { A as _ } from "./chunks/ApiService-Dc-2LBYs.js";
import "./chunks/tooltip-CD18jfR6.js";
import "./chunks/clearUpTime-CCP46cso.js";
import "./chunks/recaptcha-C9PLnSeW.js";
import "./chunks/swiper-core-BnFUnwZ2.js";
import "./chunks/navigation-rTcc44Ki.js";
import "./chunks/create-element-if-not-defined-SL9OhxBU.js";
import "./chunks/remoteImages-DKIuinEQ.js";
const M = 550,
  x = new Set([
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "End",
    "Home",
    "PageDown",
    "PageUp",
    " ",
  ]);
function C() {
  const e = (a) => {
      a.preventDefault();
    },
    t = (a) => {
      x.has(a.key) && a.preventDefault();
    },
    n = { capture: !0, passive: !1 };
  return (
    window.addEventListener("wheel", e, n),
    window.addEventListener("touchmove", e, n),
    window.addEventListener("keydown", t, n),
    () => {
      (window.removeEventListener("wheel", e, !0),
        window.removeEventListener("touchmove", e, !0),
        window.removeEventListener("keydown", t, !0));
    }
  );
}
function D(e) {
  const t = window.scrollY,
    n = Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    a = Math.min(n, Math.max(0, t + e.getBoundingClientRect().top)),
    o = a - t;
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Math.abs(o) < 1
  )
    return (
      window.scrollTo({ left: window.scrollX, top: a, behavior: "instant" }),
      Promise.resolve()
    );
  const l = C();
  return new Promise((s) => {
    const r = window.performance.now(),
      w = () => {
        (window.scrollTo({ left: window.scrollX, top: a, behavior: "instant" }),
          l(),
          s());
      },
      p = (y) => {
        const m = Math.min(1, (y - r) / M),
          d = 1 - Math.pow(1 - m, 3);
        if (
          (window.scrollTo({
            left: window.scrollX,
            top: t + o * d,
            behavior: "instant",
          }),
          m < 1)
        ) {
          window.requestAnimationFrame(p);
          return;
        }
        w();
      };
    window.requestAnimationFrame(p);
  });
}
function R() {
  const e = document.documentElement,
    t = document.body,
    n = window.scrollX,
    a = window.scrollY,
    o = Math.max(0, window.innerWidth - e.clientWidth),
    i = Number.parseFloat(window.getComputedStyle(t).paddingRight),
    l = {
      overflow: e.style.overflow,
      overscrollBehavior: e.style.overscrollBehavior,
    },
    s = {
      position: t.style.position,
      top: t.style.top,
      left: t.style.left,
      width: t.style.width,
      overflow: t.style.overflow,
      overscrollBehavior: t.style.overscrollBehavior,
      paddingRight: t.style.paddingRight,
    };
  ((e.style.overflow = "hidden"),
    (e.style.overscrollBehavior = "none"),
    (t.style.position = "fixed"),
    (t.style.top = `-${a}px`),
    (t.style.left = `-${n}px`),
    (t.style.width = "100%"),
    (t.style.overflow = "hidden"),
    (t.style.overscrollBehavior = "none"),
    o > 0 && (t.style.paddingRight = `${i + o}px`));
  let r = !1;
  return () => {
    r ||
      ((r = !0),
      (e.style.overflow = l.overflow),
      (e.style.overscrollBehavior = l.overscrollBehavior),
      (t.style.position = s.position),
      (t.style.top = s.top),
      (t.style.left = s.left),
      (t.style.width = s.width),
      (t.style.overflow = s.overflow),
      (t.style.overscrollBehavior = s.overscrollBehavior),
      (t.style.paddingRight = s.paddingRight),
      window.scrollTo({ left: n, top: a, behavior: "instant" }));
  };
}
function T() {
  const e = document.querySelector("[data-header]"),
    t = (e == null ? void 0 : e.hasAttribute("inert")) ?? !1,
    n = (e == null ? void 0 : e.classList.contains("header--hidden")) ?? !1,
    a = n
      ? "header--request-position-hidden"
      : "header--request-position-visible";
  return (
    document.body.classList.add("property-list-requesting"),
    e == null || e.setAttribute("inert", ""),
    e == null || e.classList.add(a),
    () => {
      window.requestAnimationFrame(() => {
        (e == null || e.classList.toggle("header--hidden", n),
          e == null || e.classList.remove(a),
          t || e == null || e.removeAttribute("inert"),
          document.body.classList.remove("property-list-requesting"));
      });
    }
  );
}
function A(e, t) {
  const n = t === "map" ? e.dataset.mapUrl : e.dataset.gridUrl;
  return n ? new URL(n, window.location.origin).pathname : null;
}
function F(e) {
  const t = A(e, "map");
  return t ? (window.location.pathname === t ? "map" : "grid") : null;
}
function L(e, t, n) {
  const a = A(e, n);
  if (!a) return t;
  const o = new URL(t, window.location.origin);
  return ((o.pathname = a), o.pathname + o.search + o.hash);
}
function B() {
  document.querySelectorAll("[data-property-list]").forEach((e) => {
    var o;
    if (e.dataset.viewToggleInitialized === "true") return;
    e.dataset.viewToggleInitialized = "true";
    const t = e.querySelectorAll(".property-list__view-btn");
    if (!t.length) return;
    const n = (i) => {
      const l = e.querySelectorAll("[data-view-target]"),
        s = e.querySelector("[data-view-pagination]");
      (e.classList.toggle("property-list--view-grid", i === "grid"),
        e.classList.toggle("property-list--view-map", i === "map"),
        t.forEach((r) => {
          const w = r.dataset.view === i;
          (r.classList.toggle("is-active", w),
            r.setAttribute("aria-pressed", w ? "true" : "false"));
        }),
        l.forEach((r) => {
          r.hidden = r.dataset.viewTarget !== i;
        }),
        s && (s.hidden = i === "map"));
    };
    t.forEach((i) => {
      i.addEventListener("click", () => {
        const l = i.dataset.view ?? "grid";
        n(l);
        const s =
            window.location.pathname +
            window.location.search +
            window.location.hash,
          r = L(e, s, l);
        r !== s && window.history.pushState({}, "", r);
      });
    });
    const a =
      ((o = Array.from(t).find((i) => i.classList.contains("is-active"))) ==
      null
        ? void 0
        : o.dataset.view) ?? "grid";
    n(a);
  });
}
function P(e) {
  return e.classList.contains("property-list--view-map") ? "map" : "grid";
}
function b(e, t) {
  e.querySelectorAll(".property-list__view-btn").forEach((n) => {
    n.dataset.view === t && n.click();
  });
}
function V() {
  const e = window.location.pathname.split("/").filter(Boolean)[0] ?? "";
  return /^[a-z]{2}$/.test(e) ? e : "en";
}
function k(e, t, n) {
  (t.setAttribute("aria-busy", "true"),
    n == null || n.setAttribute("aria-hidden", "false"),
    e.classList.add("is-loading"),
    document.documentElement.classList.add("property-list-loading"),
    document.body.classList.add("property-list-loading"));
}
function H(e, t, n) {
  (t.setAttribute("aria-busy", "false"),
    n == null || n.setAttribute("aria-hidden", "true"),
    e.classList.remove("is-loading"),
    document.documentElement.classList.remove("property-list-loading"),
    document.body.classList.remove("property-list-loading"));
}
function E(e, t) {
  (e.querySelectorAll("button, input, select").forEach((n) => {
    if (t) {
      ((n.dataset.loadingDisabled = "true"),
        (n.dataset.wasDisabledBeforeLoading = n.disabled ? "true" : "false"),
        (n.disabled = !0));
      return;
    }
    n.dataset.loadingDisabled === "true" &&
      ((n.disabled = n.dataset.wasDisabledBeforeLoading === "true"),
      delete n.dataset.loadingDisabled,
      delete n.dataset.wasDisabledBeforeLoading);
  }),
    e.querySelectorAll("[data-view-pagination] a[href]").forEach((n) => {
      (n.setAttribute("aria-disabled", t ? "true" : "false"),
        (n.tabIndex = t ? -1 : 0));
    }));
}
function U(e) {
  const t = new Set(),
    n = new FormData(e);
  return (
    [
      "country",
      "region",
      "search",
      "property_type[]",
      "bedrooms[]",
      "bathrooms[]",
      "facilities[]",
      "views[]",
    ].forEach((o) => {
      n.getAll(o).some((i) => String(i).trim() !== "") && t.add(o);
    }),
    String(n.get("listing_type") ?? "sale") !== "sale" && t.add("listing_type"),
    ["price", "plot", "area", "pool"].forEach((o) => {
      const i = e.elements.namedItem(`${o}_min`),
        l = e.elements.namedItem(`${o}_max`),
        s =
          i instanceof HTMLInputElement &&
          i.value !== (i.dataset.defaultValue ?? "0"),
        r =
          l instanceof HTMLInputElement &&
          l.value !== (l.dataset.defaultValue ?? l.value);
      (s || r) && t.add(o);
    }),
    t.size
  );
}
function z(e, t) {
  const n = e.querySelector("[data-active-filter-count]");
  if (!n || n.dataset.activeFilterCountInitialized === "true") return;
  n.dataset.activeFilterCountInitialized = "true";
  const a = () => {
    const o = U(t);
    ((n.textContent = String(o)), (n.hidden = o === 0));
  };
  (t.addEventListener("input", a), t.addEventListener("change", a), a());
}
function O(e) {
  [
    "country",
    "region",
    "property_type[]",
    "bedrooms[]",
    "bathrooms[]",
    "facilities[]",
    "views[]",
  ].forEach((a) => {
    const o = e.elements.namedItem(a);
    o instanceof HTMLSelectElement &&
      (Array.from(o.options).forEach((i) => {
        i.selected = !1;
      }),
      (o.value = ""),
      o.dispatchEvent(new Event("change", { bubbles: !0 })));
  });
  const t = e.elements.namedItem("search");
  t instanceof HTMLInputElement &&
    t.value !== "" &&
    ((t.value = ""), t.dispatchEvent(new Event("change", { bubbles: !0 })));
  const n = e.querySelector('input[name="listing_type"][value="sale"]');
  (n &&
    ((n.checked = !0), n.dispatchEvent(new Event("change", { bubbles: !0 }))),
    e.querySelectorAll("[data-range]").forEach((a) => {
      const o = a.querySelector("[data-range-min]"),
        i = a.querySelector("[data-range-max]");
      (i &&
        ((i.value = i.dataset.defaultValue ?? i.max),
        i.dispatchEvent(new Event("change", { bubbles: !0 }))),
        o &&
          ((o.value = o.dataset.defaultValue ?? o.min),
          o.dispatchEvent(new Event("change", { bubbles: !0 }))));
    }));
}
function Y() {
  document.querySelectorAll("[data-property-list]").forEach((e) => {
    if (e.dataset.ajaxFilteringInitialized === "true") return;
    const t = e.querySelector(".filters__form"),
      n = e.querySelector("[data-property-results]"),
      a = e.querySelector(".property-list__loader"),
      o = e.querySelector("[data-property-count-number]"),
      i = e.querySelector(".property-list__sort-select");
    if (!t || !n || !o) return;
    const l = t.querySelector("[data-filters-reset]");
    (z(e, t), (e.dataset.ajaxFilteringInitialized = "true"));
    let s = null,
      r = !1,
      w = null;
    const p = () => {
        ((n.innerHTML =
          '<p class="property-list__empty">Unable to load properties. Please try again.</p>'),
          (o.textContent = "0"));
      },
      y = (d) => {
        const f = new FormData(t),
          c = new URLSearchParams();
        return (
          f.forEach((v, g) => {
            const h = String(v ?? ""),
              u = t.elements.namedItem(g),
              q =
                u instanceof HTMLInputElement ? u.dataset.defaultValue : void 0;
            h === "" || h === q || c.append(g, h);
          }),
          i != null && i.value && c.set("sort", i.value),
          c.set("page_url", t.action || window.location.pathname),
          c.set("language", V()),
          c.has("per_page") || c.set("per_page", "6"),
          c.set("page", d ?? "1"),
          c
        );
      },
      m = async (d, f = !1) => {
        if (r) return;
        ((s = new AbortController()), (r = !0));
        const c = P(e),
          v = y(d),
          g = n.contains(document.activeElement),
          h = T();
        try {
          (f && (await D(e)), k(e, n, a), E(e, !0), (w = R()));
          const u = await _.postForm("/api/properties/search", v, {
            signal: s.signal,
          });
          if (!u.success || typeof u.html != "string") {
            p();
            return;
          }
          ((n.innerHTML = u.html),
            (o.textContent = u.totalCountLabel ?? "0"),
            I(n),
            S(n),
            b(e, c),
            u.url &&
              (window.history.pushState({}, "", L(e, u.url, c)),
              (e.dataset.renderedSearch = window.location.search)),
            g && n.focus({ preventScroll: !0 }));
        } catch (u) {
          u.name !== "AbortError" && p();
        } finally {
          (H(e, n, a), E(e, !1), w == null || w(), (w = null), h(), (r = !1));
        }
      };
    (t.addEventListener("submit", (d) => {
      (d.preventDefault(), !r && m(void 0, !0));
    }),
      l == null ||
        l.addEventListener("click", (d) => {
          var f, c;
          (d.preventDefault(),
            !r &&
              (O(t),
              (c =
                (f = t.closest("[data-filters-drawer]")) == null
                  ? void 0
                  : f.querySelector("[data-filters-close]")) == null ||
                c.click(),
              m(void 0, !0)));
        }),
      i == null ||
        i.addEventListener("change", () => {
          r || m();
        }),
      e.addEventListener("click", (d) => {
        var v;
        const f =
          (v = d.target) == null
            ? void 0
            : v.closest("[data-view-pagination] a[href]");
        if (!f || (d.preventDefault(), r)) return;
        const c = new URL(f.href).searchParams.get("page") ?? "1";
        m(c, !0);
      }),
      (e.dataset.renderedSearch = window.location.search),
      window.addEventListener("popstate", () => {
        const d = F(e);
        if (d && window.location.search === e.dataset.renderedSearch) {
          b(e, d);
          return;
        }
        window.location.reload();
      }));
  });
}
document.addEventListener("DOMContentLoaded", () => {
  (S(), B(), Y());
});
