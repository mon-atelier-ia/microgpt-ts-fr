import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TrainTab } from "./train-tab";

const meta: Meta<typeof TrainTab> = {
  title: "Demo/TrainTab",
  component: TrainTab,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TrainTab>;

const baseLossHistory = Array.from({ length: 50 }, (_, i) => ({
  step: i + 1,
  loss: 3.5 * Math.exp(-i / 20) + 0.5,
}));

const baseArgs = {
  step: 50,
  loss: 1.2,
  elapsed: 3200,
  trainingConfig: { learningRate: 0.001, numSteps: 1000 },
  lossHistory: baseLossHistory,
  liveGenEntries: [
    { step: 10, words: ["alice", "bob", "clara"] },
    { step: 20, words: ["diana", "emma", "felix"] },
  ],
};

export const Training: Story = {
  args: { ...baseArgs, status: "training" },
};

export const Trained: Story = {
  args: { ...baseArgs, status: "trained", step: 1000 },
};

export const Diverged: Story = {
  args: {
    ...baseArgs,
    status: "diverged",
    step: 12,
    loss: Number.NaN,
    lossHistory: [
      { step: 1, loss: 3.5 },
      { step: 2, loss: 3.4 },
      { step: 3, loss: 3.6 },
      { step: 4, loss: 4.1 },
      { step: 5, loss: 5.8 },
      { step: 6, loss: 12.3 },
      { step: 7, loss: 89.2 },
      { step: 8, loss: 450 },
      { step: 9, loss: 2300 },
      { step: 10, loss: 15000 },
      { step: 11, loss: 98000 },
    ],
  },
};

export const HighLossWarning: Story = {
  args: {
    ...baseArgs,
    status: "trained",
    step: 1000,
    loss: 3.1,
    trainingWarning: "high-loss",
    lossHistory: Array.from({ length: 100 }, (_, i) => ({
      step: (i + 1) * 10,
      loss: 3.5 - 0.4 * (1 - Math.exp(-i / 80)),
    })),
  },
};

export const Idle: Story = {
  args: {
    ...baseArgs,
    status: "idle",
    step: 0,
    loss: 0,
    elapsed: 0,
    lossHistory: [],
    liveGenEntries: [],
  },
};
