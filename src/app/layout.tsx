import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";
import { sanityFetchSafe } from "@/src/sanity/fetch";
import { scripturesQuery, siteSettingsQuery, type Scripture, type SiteSettings } from "@/src/sanity/queries";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const fallbackSettings: SiteSettings = {
  title: "The Church of Pentecost - LA Area",
  tagline: "A Spirit-filled church serving the LA Area.",
  heroHeading: "The Church of Pentecost- La.",
  heroText: "The Church of Pentecost – La Area welcomes you to worship with us.",
  heroImage: null,
  logo: null,
  address: "La Area Office, Accra, Ghana",
  phone: "",
  email: "info@coplaarea.org",
  socials: [],
};

const fallbackScriptures: Scripture[] = [
  {
    id: "fallback-john-316",
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    translation: "KJV",
    order: 1,
    active: true,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetchSafe(siteSettingsQuery, {}, fallbackSettings, {
    documentType: "siteSettings",
  });

  return {
    title: settings.title,
    description: settings.tagline,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await sanityFetchSafe(siteSettingsQuery, {}, fallbackSettings, {
    documentType: "siteSettings",
  });
  const scriptures = await sanityFetchSafe(scripturesQuery, {}, fallbackScriptures, {
    documentType: "scripture",
  });

  return (
    <html lang="en" className={`${bricolage.variable} h-full antialiased`}>
      <head />
      <body className="flex min-h-full flex-col bg-[#f7f4ed] text-[#1c2923] antialiased">
        <SiteHeader logoUrl={settings.logo} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} scriptures={scriptures} />
      </body>
    </html>
  );
}
