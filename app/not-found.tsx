import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 bg-background flex flex-col items-center justify-center px-4">
      <h1 className="font-bold tracking-tighter text-6xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-4">
        404
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
