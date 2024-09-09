import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const TryLinkButton = () => {
  return (
    <Link href="/metadata">
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Try Now
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
};

export default TryLinkButton;
