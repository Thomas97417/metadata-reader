import Link from "next/link";
import { MetadataLinkButton } from "./MetadataLinkButton";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="m-4 flex justify-between">
      <Link href="/">
        <h1 className="font-bold text-5xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30">
          Metadata Reader
        </h1>
      </Link>
      <div className="flex flex-col xs:flex-row items-end xs:items-center gap-2">
        <MetadataLinkButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
