import { LanguageSwitcher } from "@/components/general/language-switcher";
import { ThemeSwitch } from "@/components/general/theme-switch";
import { useAppInfo } from "@/contexts/app-info-context";
import { Link } from "@heroui/link";

export function ShareHeader() {
  const { appName, appLogo } = useAppInfo();

  return (
    <header className="w-full px-6 border-b border-default-200/50 bg-background/70 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl sm:p-0 h-16 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="/">
          {appLogo && <img alt="App Logo" className="h-8 w-8 object-contain" src={appLogo} />}
          <p className="font-bold text-2xl text-foreground">{appName}</p>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
