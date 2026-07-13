import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import { site } from "@/lib/site";
import { ogImageUrl } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPaletteProvider } from "@/components/command-palette";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · Armaan Gulati",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: ogImageUrl({
          title: "Building AI systems for healthcare operations.",
          subtitle:
            "Two years embedded with Medicaid providers. Agentic systems, shipped and evaluated honestly.",
          metric: "19.2% cohort engagement · ~12.8x benchmark",
        }),
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [
      ogImageUrl({
        title: "Building AI systems for healthcare operations.",
        subtitle:
          "Two years embedded with Medicaid providers. Agentic systems, shipped and evaluated honestly.",
        metric: "19.2% cohort engagement · ~12.8x benchmark",
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CommandPaletteProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground"
            >
              Skip to content
            </a>
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
          </CommandPaletteProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
