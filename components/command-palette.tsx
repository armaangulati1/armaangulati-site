"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Copy,
  Download,
  FileText,
  FolderGit2,
  Home,
  Mail,
  MoonStar,
  PenLine,
  SunMedium,
} from "lucide-react";

import { site } from "@/lib/site";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type CommandPaletteContextValue = {
  open: () => void;
};

const CommandPaletteContext =
  React.createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      "useCommandPalette must be used within a CommandPaletteProvider",
    );
  }
  return ctx;
}

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const run = React.useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const goto = React.useCallback(
    (href: string) => run(() => router.push(href)),
    [router, run],
  );

  const copyEmail = React.useCallback(
    () =>
      run(() => {
        void navigator.clipboard?.writeText(site.email);
      }),
    [run],
  );

  const emailMe = React.useCallback(
    () =>
      run(() => {
        window.location.href = `mailto:${site.email}`;
      }),
    [run],
  );

  const downloadResume = React.useCallback(
    () =>
      run(() => {
        const a = document.createElement("a");
        a.href = site.resumePath;
        a.download = "Armaan_Gulati_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }),
    [run],
  );

  const toggleTheme = React.useCallback(
    () => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark")),
    [run, setTheme, resolvedTheme],
  );

  const value = React.useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command palette"
        description="Navigate the site, copy contact details, or change theme."
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            <CommandItem onSelect={() => goto("/")}>
              <Home aria-hidden="true" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => goto("/projects")}>
              <FolderGit2 aria-hidden="true" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => goto("/writing")}>
              <PenLine aria-hidden="true" />
              <span>Writing</span>
            </CommandItem>
            <CommandItem onSelect={() => goto("/resume")}>
              <FileText aria-hidden="true" />
              <span>Resume</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Jump to section">
            <CommandItem onSelect={() => goto("/#projects")}>
              <span>Featured projects</span>
            </CommandItem>
            <CommandItem onSelect={() => goto("/#experience")}>
              <span>Healthcare-AI experience</span>
            </CommandItem>
            <CommandItem onSelect={() => goto("/#philosophy")}>
              <span>Engineering philosophy</span>
            </CommandItem>
            <CommandItem onSelect={() => goto("/#contact")}>
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={copyEmail}>
              <Copy aria-hidden="true" />
              <span>Copy email address</span>
            </CommandItem>
            <CommandItem onSelect={downloadResume}>
              <Download aria-hidden="true" />
              <span>Download resume (PDF)</span>
            </CommandItem>
            <CommandItem onSelect={emailMe}>
              <Mail aria-hidden="true" />
              <span>Email me</span>
            </CommandItem>
            <CommandItem onSelect={toggleTheme}>
              {resolvedTheme === "dark" ? (
                <SunMedium aria-hidden="true" />
              ) : (
                <MoonStar aria-hidden="true" />
              )}
              <span>Toggle theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}
