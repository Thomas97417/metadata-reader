import Link from "next/link";
import { MetadataLinkButton } from "./MetadataLinkButton";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <div className="m-4 flex justify-between">
      <Link href="/">
        <h1 className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Metadata Reader
        </h1>
      </Link>
      <div className="flex items-center gap-2">
        <MetadataLinkButton />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
