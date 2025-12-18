import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Users, Award, Lightbulb, Target, Heart, BookOpen,
  BarChart3, Zap, Shield, Sparkles
} from "lucide-react";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map icon names to lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Award,
  Lightbulb,
  Target,
  Heart,
  BookOpen,
  BarChart3,
  Zap,
  Shield,
  Sparkles,
};

export function getIconComponent(iconName: string, className?: string) {
  const Icon = iconMap[iconName] || Sparkles;
  return React.createElement(Icon, { className: className || "w-6 h-6" });
}
