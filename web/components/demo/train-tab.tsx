import { AlertTriangle } from "lucide-react";
import { strings } from "@/lib/strings";
import type { LiveGenEntry } from "./live-gen-stream";
import { LiveGenStream } from "./live-gen-stream";
import type { LossPoint } from "./loss-chart";
import { LossChart } from "./loss-chart";
import type { TrainingConfig } from "./train-sidebar";
import { TrainStatus } from "./train-status";
import { SECTION_LABEL, type Status } from "./types";

export function TrainTab({
  status,
  step,
  loss,
  evalLoss,
  elapsed,
  trainingConfig,
  lossHistory,
  liveGenEntries,
  trainingWarning,
}: {
  status: Status;
  step: number;
  loss: number;
  evalLoss?: number;
  elapsed: number;
  trainingConfig: TrainingConfig;
  lossHistory: LossPoint[];
  liveGenEntries: LiveGenEntry[];
  trainingWarning?: string | null;
}) {
  const isTraining = status === "training";
  const s = strings.trainDiag;

  if (status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="text-muted-foreground">{strings.train.idle}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 flex-1 min-h-0">
      <TrainStatus
        step={step}
        numSteps={trainingConfig.numSteps}
        loss={loss}
        evalLoss={evalLoss}
        elapsed={elapsed}
      />

      {status === "diverged" && (
        <div className="flex flex-col gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 font-medium text-destructive">
            <AlertTriangle className="h-4 w-4" />
            {s.nanTitle}
          </div>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>{s.nanBullet1}</li>
            <li>{s.nanBullet2}</li>
            <li>{s.nanBullet3}</li>
          </ul>
          <p className="text-sm font-medium">{s.nanAction}</p>
        </div>
      )}

      {trainingWarning === "high-loss" && status === "trained" && (
        <div className="flex flex-col gap-2 rounded-lg border border-warning/50 bg-warning/5 p-4">
          <div className="flex items-center gap-2 font-medium text-warning">
            <AlertTriangle className="h-4 w-4" />
            {s.highLossTitle}
          </div>
          <p className="text-sm text-muted-foreground">{s.highLossBody}</p>
          <p className="text-sm font-medium">{s.highLossAction}</p>
        </div>
      )}

      <div className="flex flex-col gap-2 flex-[3] min-h-0">
        <p className={SECTION_LABEL}>{strings.train.loss}</p>
        {lossHistory.length > 1 ? (
          <LossChart
            className="flex-1 min-h-0"
            data={lossHistory}
            numSteps={trainingConfig.numSteps}
            isTraining={isTraining}
          />
        ) : (
          <div className="flex-1 min-h-0 rounded-lg border bg-muted/30" />
        )}
      </div>

      <LiveGenStream className="flex-[2] min-h-0" entries={liveGenEntries} />
    </div>
  );
}
