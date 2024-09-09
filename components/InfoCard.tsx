import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  content: string;
}

export function InfoCard({
  icon: Icon,
  title,
  description,
  content,
}: InfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <Icon className="w-8 h-8 mb-2 " />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="leading-5">{content}</p>
      </CardContent>
    </Card>
  );
}
