# amBlitz — landing page

Next.js 16 (App Router, Turbopack) + Tailwind CSS v4. There is **no `tailwind.config.js`** — in v4 the whole design system lives in `app/globals.css` inside the `@theme` block.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verified clean on Next 16.3.2
```

---

## Change these before you launch

| What | Where |
|---|---|
| Prices — deliberately left out, listings link to Amazon instead | `lib/content.js` → `bestsellers` |
| Testimonials — illustrative, swap in real reviews | `lib/content.js` → `testimonials` |
| The bulk form has no backend, it only sets local state | `components/BulkOrders.jsx` → `submit()` |
| `metadataBase` points at `example.com` | `app/layout.jsx` |
| Stats — check the 4.7★ / 163 ratings figure is still current | `lib/content.js` → `stats` |

Everything else (product names, ASINs, GSM, page counts, box dimensions, the 108-per-section count) came off the live Amazon listings.

---

## Design system

**Palette** — pulled off the logo rather than picked. Leaf green `#56a83f` and mango `#f8c986` are the tree and the face; `--color-ink` is the wordmark black. Marigold/haldi is held back for the Naam Lekhan section only, and marker red only ever draws a margin rule — never a button.

**Type** — four faces, each with a job:

- **Fraunces** (display) — a bulgy, wonky serif. The `SOFT` and `WONK` variable axes are turned up so it leans toward the logo's 70s wordmark instead of reading like a default serif.
- **Outfit** (body/UI) — geometric humanist, friendly like the mascot.
- **DM Mono** (data) — GSM, page counts, bubble letters, section eyebrows.
- **Tiro Devanagari Hindi** — राम in the Naam Lekhan grid and the Hindi category labels.

**The signature device is the OMR bubble.** It's the most characteristic artefact in this brand's world, so it's used structurally rather than decoratively: section eyebrows are a four-bubble answer row with the current one filled, the FAQ toggle is a bubble that fills when you open it, and the primary buttons shade in from the left on hover the way a pen fills a circle.

Paper is the second device — `ruled`, `ruled-tight`, `graph` and `spiral` are custom `@utility` rules in `globals.css` that draw notebook lines, graph paper and spiral binding in pure CSS. No product photography is used anywhere; every product cover in the bestsellers grid is drawn with divs, so nothing 404s and nothing needs licensing.

**Two animated moments, both earning their keep:**

1. **The hero sheet** fills its own bubbles while a stopwatch counts to `14:24` — that's 180 questions × ~4.8 seconds of circling. The whole page's argument in one object.
2. **The Naam Lekhan grid** writes राम into all 108 boxes of one section, which is the real product format (18 × 6 mm boxes, 108 to a section).

Both start on `IntersectionObserver` and both jump straight to their end state under `prefers-reduced-motion`.

---

## Structure

```
app/
  globals.css     ← the entire design system: @theme tokens, @utility rules, component classes
  layout.jsx      ← fonts + metadata
  page.jsx        ← composes the 18 sections in order
components/
  Bits.jsx        ← Reveal, Eyebrow, SectionHeading, SpecChip
  Navbar.jsx      ← announcement strip + sticky nav + mobile sheet
  Hero.jsx        ← the animated answer sheet
  SpecMarquee.jsx
  Range.jsx       ← the four categories
  Bestsellers.jsx ← product grid + the CSS-drawn covers
  WhyOmr.jsx      ← the time-budget argument
  ExamPicker.jsx  ← NEET / JEE / UPSC / SSC / CTET / CA
  PaperQuality.jsx← the 70 vs 55 GSM show-through comparison
  NaamLekhan.jsx  ← the 108-box section + size ladder
  NumbersAndChannels.jsx
  BulkOrders.jsx  ← institutional quote form
  Testimonials.jsx
  Story.jsx       ← Ambition + Blitz
  Faq.jsx
  Closing.jsx     ← final CTA + footer
lib/content.js    ← all copy and product data, single source
public/
  amblitz-logo.png          ← your logo, background removed, trimmed
  amblitz-mark.png          ← just the tree, used in the nav and as the favicon
  amblitz-logo-original.jpeg
```

The logo you supplied was a JPEG on solid white, which would have shown as a white rectangle on the tinted and dark sections. It's been keyed to transparency and cropped to its bounding box. The nav uses the tree mark beside a wordmark set in Fraunces, because the full vertical lockup shrinks to about 55px wide in a horizontal bar and becomes unreadable; the complete lockup appears at proper size in the story section and the footer.

---

## Accessibility floor

Responsive to 360px, visible keyboard focus rings, `prefers-reduced-motion` respected throughout, the FAQ uses real `aria-expanded` / `aria-controls`, and muted text tones were darkened to clear AA against the cream background.
