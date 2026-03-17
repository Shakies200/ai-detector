import { clsx } from "clsx";
import { CheckCircle2, AlertCircle, HelpCircle, ShieldAlert } from "lucide-react";

type Verdict = 'human' | 'likely_human' | 'uncertain' | 'likely_ai' | 'ai';

interface VerdictBadgeProps {
  verdict: Verdict;
  className?: string;
}

const config: Record<Verdict, { label: string; icon: React.ElementType; classes: string }> = {
  human: {
    label: "Human Written",
    icon: CheckCircle2,
    classes: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  likely_human: {
    label: "Likely Human",
    icon: CheckCircle2,
    classes: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  },
  uncertain: {
    label: "Uncertain",
    icon: HelpCircle,
    classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  likely_ai: {
    label: "Likely AI",
    icon: AlertCircle,
    classes: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  ai: {
    label: "AI Generated",
    icon: ShieldAlert,
    classes: "bg-red-500/10 text-red-400 border-red-500/20",
  }
};

export function VerdictBadge({ verdict, className }: VerdictBadgeProps) {
  const { label, icon: Icon, classes } = config[verdict] || config.uncertain;

  return (
    <div className={clsx(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm",
      classes,
      className
    )}>
      <Icon className="w-4 h-4" />
      {label}
    </div>
  );
}
