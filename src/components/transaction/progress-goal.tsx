import { Progress } from "@/components/ui/progress"

interface ProgressGoalProps {
  goal: number
  percentage: number
}

export function ProgressGoal({ goal, percentage }: ProgressGoalProps) {
  return (
    <div className="flex items-center space-x-2 w-full">
      <Progress
        value={100 - goal}
        className="rotate-180 bg-gradient-to-l border border-zinc-600 from-purple-600 to-pink-500"
      />
      <span className="text-white text-[10px]">{percentage}%</span>
    </div>
  )
}
