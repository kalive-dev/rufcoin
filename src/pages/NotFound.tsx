import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-space text-white">
      <div className="text-center px-4">
        <p className="text-xs text-muted-foreground tracking-[0.25em] uppercase mb-2">
          RUF XP PROTOCOL
        </p>
        <h1 className="mb-4 text-4xl sm:text-5xl font-bold text-glow">
          404 — page not found
        </h1>
        <p className="mb-6 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
          Looks like you took a wrong turn. All active missions, XP and the
          calculator live on the main RUF page.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
        >
          Back to RUF XP
        </a>
      </div>
    </main>
  );
};

export default NotFound;
