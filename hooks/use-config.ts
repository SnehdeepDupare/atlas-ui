import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  usageType: "React" | "HTML";
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  installationType: "cli" | "manual";
};

const configAtom = atomWithStorage<Config>("config", {
  usageType: "React",
  packageManager: "pnpm",
  installationType: "cli",
});

export function useConfig() {
  return useAtom(configAtom);
}
