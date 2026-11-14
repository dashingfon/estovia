import { S as w } from "./chunks/swiper-core-BnFUnwZ2.js";
import { N as S } from "./chunks/navigation-rTcc44Ki.js";
import "./chunks/create-element-if-not-defined-SL9OhxBU.js";
document.querySelectorAll(".single-property-hero").forEach((l) => {
  const b = l.querySelector("[data-single-property-carousel]"),
    h = l.querySelector("[data-single-property-thumbs]"),
    _ = l.querySelector("[data-single-property-prev]"),
    A = l.querySelector("[data-single-property-next]"),
    v = Array.from(l.querySelectorAll("[data-single-property-thumb]")),
    u = Array.from(l.querySelectorAll(".single-property-hero__slide"));
  if (!b) return;
  const f = (e) => {
      v.forEach((t) => {
        t.classList.toggle(
          "is-active",
          Number(t.dataset.singlePropertyThumb) === e,
        );
      });
    },
    o = h
      ? new w(h, {
          slidesPerView: 5,
          spaceBetween: 12,
          speed: 500,
          watchSlidesProgress: !0,
          slideToClickedSlide: !0,
          breakpoints: { 0: { slidesPerView: 3 }, 640: { slidesPerView: 5 } },
        })
      : null,
    E = (e) => {
      if (!o) return;
      const t =
          typeof o.params.slidesPerView == "number"
            ? o.params.slidesPerView
            : 5,
        g = o.activeIndex,
        P = g + t - 1;
      e > P ? o.slideTo(e - t + 1) : e < g && o.slideTo(e);
    },
    L = new w(b, {
      modules: [S],
      slidesPerView: 1,
      speed: 650,
      navigation: {
        prevEl: _,
        nextEl: A,
        disabledClass: "single-property-hero__nav--disabled",
      },
      on: {
        init(e) {
          (f(e.activeIndex), E(e.activeIndex));
        },
        slideChange(e) {
          (f(e.activeIndex), E(e.activeIndex));
        },
      },
    });
  if (
    (v.forEach((e) => {
      e.addEventListener("click", () => {
        L.slideTo(Number(e.dataset.singlePropertyThumb));
      });
    }),
    !u.length)
  )
    return;
  const m = u.map((e) => {
    var t;
    return {
      src: e.href,
      alt: ((t = e.querySelector("img")) == null ? void 0 : t.alt) || "",
    };
  });
  let n = 0,
    c = null;
  const r = document.createElement("div");
  ((r.className = "single-property-hero__lightbox"),
    r.setAttribute("role", "dialog"),
    r.setAttribute("aria-modal", "true"),
    r.setAttribute("aria-label", "Property image gallery"));
  const d = document.createElement("img");
  d.className = "single-property-hero__lightbox-image";
  const s = document.createElement("button");
  ((s.className = "single-property-hero__lightbox-close"),
    (s.type = "button"),
    s.setAttribute("aria-label", "Close gallery"),
    (s.textContent = "X"));
  const i = document.createElement("button");
  ((i.className =
    "single-property-hero__lightbox-nav single-property-hero__lightbox-nav--prev"),
    (i.type = "button"),
    i.setAttribute("aria-label", "Previous gallery image"));
  const a = document.createElement("button");
  ((a.className =
    "single-property-hero__lightbox-nav single-property-hero__lightbox-nav--next"),
    (a.type = "button"),
    a.setAttribute("aria-label", "Next gallery image"),
    r.append(d, s, i, a),
    l.append(r));
  const x = () => {
      const e = m[n];
      ((d.src = e.src), (d.alt = e.alt));
    },
    p = (e) => {
      ((n = (n + e + m.length) % m.length), x());
    },
    y = () => {
      (r.classList.remove("is-open"),
        (document.body.style.overflow = ""),
        c == null || c.focus());
    },
    k = (e, t) => {
      ((n = e),
        (c = t),
        x(),
        r.classList.add("is-open"),
        (document.body.style.overflow = "hidden"),
        s.focus());
    };
  (u.forEach((e, t) => {
    e.addEventListener("click", (g) => {
      (g.preventDefault(), k(t, e));
    });
  }),
    s.addEventListener("click", y),
    i.addEventListener("click", () => p(-1)),
    a.addEventListener("click", () => p(1)),
    r.addEventListener("click", (e) => {
      e.target === r && y();
    }),
    document.addEventListener("keydown", (e) => {
      r.classList.contains("is-open") &&
        (e.key === "Escape"
          ? y()
          : e.key === "ArrowLeft"
            ? p(-1)
            : e.key === "ArrowRight" && p(1));
    }));
});
