import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="m-4 flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <p className="text-sm text-muted-foreground">
          © 2026 <span className="font-semibold text-primary">Metadata Reader</span>
        </p>

        <a
          href="mailto:contact@metadata-reader.com?subject=Contact%20Metadata%20Reader"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <EnvelopeIcon className="w-4 h-4" />
          contact@metadata-reader.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
