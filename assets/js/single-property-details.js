document.querySelectorAll("[data-property-description]").forEach((s) => {
  var o;
  const t = s.querySelector("[data-property-description-content]"),
    e = s.querySelector("[data-property-description-toggle]");
  if (!t || !e) return;
  const d =
      e.dataset.labelMore ||
      ((o = e.textContent) == null ? void 0 : o.trim()) ||
      "Read more",
    c = e.dataset.labelLess || "Read less",
    i = () => {
      t.style.setProperty(
        "--property-description-expanded-height",
        `${t.scrollHeight}px`,
      );
    },
    n = () => {
      const r = s.classList.contains("is-expanded");
      i();
      const a = parseFloat(getComputedStyle(t).maxHeight),
        l = Number.isFinite(a)
          ? t.scrollHeight > a + 1
          : t.scrollHeight > t.clientHeight + 1;
      (s.classList.toggle("has-overflow", l), (e.hidden = !l && !r));
    };
  return (
    e.addEventListener("click", () => {
      i();
      const r = s.classList.toggle("is-expanded");
      ((e.textContent = r ? c : d),
        e.setAttribute("aria-expanded", r ? "true" : "false"),
        n());
    }),
    n(),
    window.addEventListener("resize", n),
    () => window.removeEventListener("resize", n)
  );
});
