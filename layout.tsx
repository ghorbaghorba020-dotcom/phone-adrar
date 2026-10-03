import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Search, GitCompareArrows, Heart, Store, Moon, Sun } from "lucide-react";
import { DemoBadge } from "./ui-bits";
import { useList } from "@/lib/store";

const NAV = [
  { to: "/", label: "الرئيسية" },
  { to: "/phones", label: "الهواتف" },
  { to: "/brands", label: "الماركات" },
  { to: "/shops", label: "المحلات" },
  { to: "/compare", label: "مقارنة الأسعار" },
  { to: "/offers", label: "العروض" },
  { to: "/for-shops", label: "لأصحاب المحلات" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2">
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-hero text-lg font-black text-primary-foreground shadow-sm" style={{ fontFamily: "var(--font-display)" }}>ه</div>
      <div className="min-w-0 leading-none">
        <p className="text-base font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>هواتف أدرار</p>
        <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground" dir="ltr">PHONE ADRAR</p>
      </div>
    </Link>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const d = localStorage.getItem("pa_theme") === "dark";
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const flip = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    localStorage.setItem("pa_theme", d ? "dark" : "light");
  };
  return (
    <button onClick={flip} aria-label="تبديل الوضع" className="grid size-8 place-items-center rounded-lg border border-border text-foreground/80 hover:bg-muted">
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "bg-accent text-accent-foreground" }} className="rounded-lg px-2.5 py-2 text-[13px] font-semibold text-foreground/80 hover:bg-muted">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5">
          <DemoBadge />
          <Link to="/phones" aria-label="بحث" className="grid size-8 place-items-center rounded-lg border border-border lg:hidden"><Search className="size-4" /></Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const BOTTOM = [
  { to: "/", label: "الرئيسية", Icon: Home },
  { to: "/phones", label: "البحث", Icon: Search },
  { to: "/compare", label: "المقارنة", Icon: GitCompareArrows },
  { to: "/favorites", label: "المفضلة", Icon: Heart },
  { to: "/for-shops", label: "للمحلات", Icon: Store },
] as const;

export function BottomNav() {
  const cmp = useList("compare");
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {BOTTOM.map(({ to, label, Icon }) => (
          <Link key={to} to={to} activeOptions={{ exact: to === "/" }} activeProps={{ className: "text-primary" }} inactiveProps={{ className: "text-muted-foreground" }} className="relative flex flex-col items-center gap-1 py-2.5">
            <Icon className="size-5" />
            <span className="text-[10px] font-bold">{label}</span>
            {to === "/compare" && cmp.list.length > 0 && (
              <span className="absolute top-1.5 left-1/2 translate-x-2.5 rounded-full bg-primary px-1.5 text-[9px] font-bold text-primary-foreground">{cmp.list.length}</span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-border bg-ice pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm font-bold text-primary">قارن قبل ما تشري</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">منصة تربط الزبائن بمحلات الهواتف في أدرار. لا يوجد دفع عبر الإنترنت؛ الشراء يتم مباشرة في المحل.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-semibold text-foreground/80">
          <Link to="/">الرئيسية</Link>
          <Link to="/phones">الهواتف</Link>
          <Link to="/shops">المحلات</Link>
          <Link to="/compare">المقارنة</Link>
          <Link to="/for-shops">لأصحاب المحلات</Link>
          <Link to="/about">تواصل معنا</Link>
        </div>
        <p className="rounded-xl bg-background p-3 text-xs leading-relaxed text-muted-foreground ring-1 ring-border">
          ⚠️ نسخة تجريبية: جميع الأسعار والمحلات والإحصائيات والصور المعروضة حاليًا تجريبية وليست بيانات حقيقية.
        </p>
      </div>
    </footer>
  );
}
