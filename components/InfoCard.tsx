"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
interface InfoCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="h-full"
    >
      <Card className="group border-border/50 hover:border-primary/50 transition-colors duration-300 overflow-hidden relative h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative space-y-4 pb-4">
          <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-2.5">
            <CardTitle className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary group-hover:from-primary group-hover:to-secondary transition-colors duration-300">
              {title}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/90">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col justify-between">
          <p className="text-muted-foreground/90 leading-relaxed">{content}</p>
          <div className="h-1 w-12 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
