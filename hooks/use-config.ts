import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  usageType: "React/Next" | "JavaScript";
};

const configAtom = atomWithStorage<Config>("config", {
  usageType: "React/Next",
});

export function useConfig() {
  return useAtom(configAtom);
}
