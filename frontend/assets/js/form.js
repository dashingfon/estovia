import "./chunks/select-CgPps8-F.js";
import {
  a as _,
  m as g,
  r as S,
  s as A,
} from "./chunks/formValidators-CYrX3L8B.js";
import { g as q, s as w } from "./chunks/formSubmit-2k71gPUb.js";
import { c as T } from "./chunks/clearUpTime-CCP46cso.js";
import { i as x } from "./chunks/tooltip-CD18jfR6.js";
import "./chunks/ApiService-Dc-2LBYs.js";
import "./chunks/recaptcha-C9PLnSeW.js";
const u = document.querySelector(".form--contact");
function C() {
  if (!u) return;
  new IntersectionObserver(
    (r) => {
      r.forEach((t) => {
        t.isIntersecting
          ? u.classList.add("is-pinned")
          : u.classList.remove("is-pinned");
      });
    },
    { threshold: 0.2 },
  ).observe(u);
}
const p = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
];
x();
const m = {},
  f = ".form__field, .form__filter, .consent",
  F = 1e4;
function v(e, r) {
  const t = e.closest(f),
    s =
      t == null
        ? void 0
        : t.querySelector(`[data-error-for="${e.getAttribute("name")}"]`);
  s && (s.textContent = r);
}
function d(e) {
  const r = S(e);
  return (A(e, f, r), r.valid);
}
function b(e) {
  const r = e.closest(f),
    t = e.checked;
  return (
    r == null || r.classList.toggle("is-error", !t),
    r == null || r.classList.toggle("is-valid", t),
    v(
      e,
      t
        ? ""
        : (e.getAttribute("data-error-required") ?? "This field is required."),
    ),
    t
  );
}
function k(e) {
  Array.from(e.querySelectorAll('input[data-validate="email"]')).forEach(
    (t) => {
      const s = t.list;
      s &&
        (t.addEventListener("input", () => {
          const n = t.value;
          s.innerHTML = "";
          const i = n.indexOf("@");
          if (i === -1)
            n.length > 0 &&
              p.forEach((o) => {
                const c = document.createElement("option");
                ((c.value = `${n}@${o}`), s.appendChild(c));
              });
          else {
            const o = n.slice(0, i),
              c = n.slice(i + 1);
            p.filter((l) => l.startsWith(c) && l !== c).forEach((l) => {
              const E = document.createElement("option");
              ((E.value = `${o}@${l}`), s.appendChild(E));
            });
          }
        }),
        t.addEventListener("change", () => {
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.value) && (s.innerHTML = "");
        }));
    },
  );
}
function I(e) {
  const r = e.querySelector('select[name="country"]'),
    t = e.querySelector('select[name="location"]');
  if (!r || !t) return;
  const s = Array.from(t.options).filter((n) => n.value !== "");
  r.addEventListener("change", () => {
    const n = r.value;
    t.value = "";
    for (let o = t.options.length - 1; o >= 0; o--)
      t.options[o].value !== "" && t.remove(o);
    ((n ? s.filter((o) => o.dataset.country === n) : s).forEach((o) =>
      t.appendChild(o),
    ),
      t.dispatchEvent(new Event("change", { bubbles: !0 })));
  });
}
function O(e) {
  const r = e.closest(".form__content"),
    t = r == null ? void 0 : r.querySelector(".form__filters");
  t &&
    t.querySelectorAll("select[name]").forEach((s) => {
      (e
        .querySelectorAll(`input[type="hidden"][name="${s.name}"]`)
        .forEach((i) => i.remove()),
        (s.multiple
          ? Array.from(s.selectedOptions)
              .map((i) => i.value)
              .filter((i) => i !== "")
          : s.value
            ? [s.value]
            : []
        ).forEach((i) => {
          const o = document.createElement("input");
          ((o.type = "hidden"),
            (o.name = s.name),
            (o.value = i),
            e.appendChild(o));
        }));
    });
}
function y(e, r, t) {
  var n, i;
  const s = e.closest(".form__container");
  if (
    ((i =
      (n = e.parentElement) == null
        ? void 0
        : n.querySelector(".form__message")) == null || i.remove(),
    t && s)
  ) {
    const o = s.querySelector(".contact__success-body");
    (o && r && (o.textContent = r),
      m[e.id] && window.clearTimeout(m[e.id]),
      s.classList.add("is-success-active"),
      (m[e.id] = window.setTimeout(() => {
        s.classList.remove("is-success-active");
      }, T)));
    return;
  }
  if (!t) {
    const o = document.createElement("p");
    ((o.className = "form__message form__message--error"),
      (o.textContent = r),
      e.insertAdjacentElement("afterend", o),
      o.scrollIntoView({ behavior: "smooth", block: "center" }));
  }
}
function P(e) {
  const r = q(e);
  r &&
    ((r.disabled = !0),
    window.setTimeout(() => {
      r.disabled = !1;
    }, F));
}
function L(e) {
  (e.forEach((r) => {
    Array.from(r.options).forEach((t) => {
      t.selected = t.defaultSelected;
    });
  }),
    e.forEach((r) => {
      ((r.dataset.resetting = "true"),
        r.dispatchEvent(new Event("change", { bubbles: !0 })),
        delete r.dataset.resetting);
    }));
}
function V(e) {
  var t;
  const r =
    (t = e.closest(".form__content")) == null
      ? void 0
      : t.querySelector(".form__filters");
  r && L(Array.from(r.querySelectorAll("select[name]")));
}
function $(e) {
  L(h(e, "select[name]"));
}
async function D(e) {
  await w(
    e,
    (r) => {
      (y(e, r, !0),
        e.reset(),
        V(e),
        $(e),
        e
          .querySelectorAll(".is-valid, .is-error, .was-blurred")
          .forEach((t) => {
            t.classList.remove("is-valid", "is-error", "was-blurred");
          }),
        h(e, 'input[type="checkbox"]').forEach((t) => {
          var s;
          ((t.checked = !1),
            (s = t.closest(f)) == null ||
              s.classList.remove("is-valid", "is-error", "was-blurred"));
        }));
    },
    (r) => y(e, r, !1),
  );
}
function h(e, r) {
  return Array.from(e.elements).filter((t) => t.matches(r));
}
function M(e) {
  const r = e.dataset.submit === "external",
    t = Array.from(e.querySelectorAll("[data-validate]")),
    s = h(e, 'input[type="checkbox"][required]');
  (k(e),
    t.forEach((n) => {
      n instanceof HTMLInputElement &&
        (n.getAttribute("data-validate") ?? n.type) === "tel" &&
        _(n);
    }),
    t.forEach((n) => {
      (n.addEventListener("blur", () => {
        (n.value !== "" || n.classList.contains("was-blurred")) &&
          (n.classList.add("was-blurred"), d(n));
      }),
        n.addEventListener("input", () => {
          (n.closest(".is-error") || n.closest(".is-valid")) && d(n);
          const i = g(n);
          i ? v(n, i) : n.closest(".is-error") || v(n, "");
        }),
        n.addEventListener("change", () => {
          n instanceof HTMLSelectElement &&
            n.dataset.resetting !== "true" &&
            d(n);
        }));
    }),
    s.forEach((n) => {
      n.addEventListener("change", () => {
        n.closest(".is-error") && b(n);
      });
    }),
    e.addEventListener("submit", (n) => {
      var o, c;
      ((c =
        (o = e.parentElement) == null
          ? void 0
          : o.querySelector(".form__message")) == null || c.remove(),
        t.forEach((a) => {
          (a.hasAttribute("required") || a.value.trim() !== "") &&
            a.classList.add("was-blurred");
        }));
      let i = !0;
      if (
        (t.forEach((a) => {
          d(a) || (i = !1);
        }),
        s.forEach((a) => {
          b(a) || (i = !1);
        }),
        !i)
      ) {
        (n.preventDefault(), n.stopPropagation());
        const a = e.querySelector(".is-error");
        a == null || a.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if ((O(e), r)) {
        P(e);
        return;
      }
      (n.preventDefault(), D(e));
    }));
}
document.querySelectorAll(".form__form").forEach(M);
document.querySelectorAll(".form__filters").forEach(I);
window.addEventListener("DOMContentLoaded", () => {
  C();
});
