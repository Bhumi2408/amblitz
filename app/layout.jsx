import { Fraunces, Outfit, DM_Mono, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

/* Display — bulgy, wonky serif that echoes the amBlitz wordmark */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

/* Body — geometric humanist, friendly like the mascot */
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

/* Data — specs, GSM, page counts, bubble labels */
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

/* Devanagari — for the Naam Lekhan pustika */
const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-tiro",
});

export const metadata = {
  // Point this at your real domain before deploying.
  metadataBase: new URL("https://example.com"),
  title: {
    default: "amBlitz — OMR sheets, answer-writing notebooks & Naam Lekhan pustikas",
    template: "%s · amBlitz",
  },
  description:
    "Practice stationery made by a student, for students. OMR practice sheets for NEET, JEE, UPSC and SSC, answer-writing notebooks with printed margins, and Ram Naam Lekhan pustikas with broad boxes. 70 GSM paper, spiral bound.",
  keywords: [
    "OMR sheet for practice",
    "NEET OMR sheet",
    "UPSC answer writing notebook",
    "Ram Naam Lekhan Pustika",
    "spiral notebook A4",
    "amBlitz",
  ],
  openGraph: {
    title: "amBlitz — Get into Action",
    description:
      "OMR sheets, answer-writing notebooks and Naam Lekhan pustikas. 70 GSM paper, spiral bound, student pricing.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/amblitz-mark.png", apple: "/amblitz-mark.png" },
};

export const viewport = {
  themeColor: "#fcfaf2",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${outfit.variable} ${dmMono.variable} ${tiro.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
