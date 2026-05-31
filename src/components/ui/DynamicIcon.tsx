import {
  Atom,
  Network,
  Code2,
  BrainCircuit,
  Database,
  Globe,
  Layers,
  Cpu,
  FlaskConical,
  PenTool,
  BarChart2,
  ShieldCheck,
  BookOpen,
  Zap,
  LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType<LucideProps>> = {
  Atom,
  Network,
  Code2,
  BrainCircuit,
  Database,
  Globe,
  Layers,
  Cpu,
  FlaskConical,
  PenTool,
  BarChart2,
  ShieldCheck,
  BookOpen,
  Zap,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = ICON_MAP[name] ?? BookOpen;
  return <Icon {...props} />;
}
