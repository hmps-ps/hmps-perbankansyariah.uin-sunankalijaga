import { Users, Award, Lightbulb, Target, Heart, BookOpen, BarChart3, Zap, Shield, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ICON_OPTIONS = [
  { value: "Users", label: "Users", icon: Users },
  { value: "Award", label: "Award", icon: Award },
  { value: "Lightbulb", label: "Lightbulb", icon: Lightbulb },
  { value: "Target", label: "Target", icon: Target },
  { value: "Heart", label: "Heart", icon: Heart },
  { value: "BookOpen", label: "Book Open", icon: BookOpen },
  { value: "BarChart3", label: "Bar Chart", icon: BarChart3 },
  { value: "Zap", label: "Zap", icon: Zap },
  { value: "Shield", label: "Shield", icon: Shield },
  { value: "Sparkles", label: "Sparkles", icon: Sparkles },
];

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function IconSelector({ value, onChange, label = "Icon" }: IconSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an icon" />
        </SelectTrigger>
        <SelectContent>
          {ICON_OPTIONS.map((option) => {
            const IconComponent = option.icon;
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  {option.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
