import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type LossPoint = { step: number; loss: number; evalLoss?: number };

const lossChartConfig = {
  loss: { label: "Train", color: "var(--chart-1)" },
  evalLoss: { label: "Eval", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function LossChart({
  data,
  numSteps,
}: {
  data: LossPoint[];
  numSteps: number;
}) {
  const yMax = data.length > 0 ? Math.ceil(data[0].loss) : 4;
  const hasEval = data.some((p) => p.evalLoss !== undefined);
  return (
    <Card size="sm" className="rounded-lg">
      <CardContent className="pt-4">
        <ChartContainer config={lossChartConfig} className="h-56 w-full">
          <AreaChart data={data} accessibilityLayer>
            <defs>
              <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-loss)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-loss)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="step"
              type="number"
              domain={[0, numSteps]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
              }
            />
            <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, yMax]}
              tickFormatter={(v: number) => v.toFixed(1)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    const p = payload?.[0]?.payload as LossPoint | undefined;
                    return p ? `Step ${p.step}` : "";
                  }}
                />
              }
            />
            <Area
              dataKey="loss"
              type="monotone"
              stroke="var(--color-loss)"
              strokeWidth={2}
              fill="url(#lossGradient)"
              isAnimationActive={false}
            />
            {hasEval && (
              <Area
                dataKey="evalLoss"
                type="monotone"
                stroke="var(--color-evalLoss)"
                strokeWidth={2}
                fill="none"
                dot={{ r: 2, fill: "var(--color-evalLoss)" }}
                connectNulls
                isAnimationActive={false}
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
