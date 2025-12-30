import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  usageType: "React/Next" | "JavaScript";
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  installationType: "cli" | "manual";
};

const configAtom = atomWithStorage<Config>("config", {
  usageType: "React/Next",
  packageManager: "pnpm",
  installationType: "cli",
});

export function useConfig() {
  return useAtom(configAtom);
}
