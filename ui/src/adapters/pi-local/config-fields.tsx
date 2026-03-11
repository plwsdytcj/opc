import type { AdapterConfigFieldsProps } from "../types";
import {
  Field,
  DraftInput,
} from "../../components/agent-config-primitives";
import { ChoosePathButton } from "../../components/PathInstructionsModal";
import { useI18n } from "../../context/I18nContext";

const inputClass =
  "w-full rounded-md border border-border px-2.5 py-1.5 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground/40";
const instructionsFileHint =
  "Absolute path to a markdown file (e.g. AGENTS.md) that defines this agent's behavior. Injected into the system prompt at runtime.";

export function PiLocalConfigFields({
  isCreate,
  values,
  set,
  config,
  eff,
  mark,
}: AdapterConfigFieldsProps) {
  const { t } = useI18n();
  return (
    <Field label={t("agentConfig.instructionsFile")} hint={t("agentConfig.instructionsFile.hint") || instructionsFileHint}>
      <div className="flex items-center gap-2">
        <DraftInput
          value={
            isCreate
              ? values!.instructionsFilePath ?? ""
              : eff(
                  "adapterConfig",
                  "instructionsFilePath",
                  String(config.instructionsFilePath ?? ""),
                )
          }
          onCommit={(v) =>
            isCreate
              ? set!({ instructionsFilePath: v })
              : mark("adapterConfig", "instructionsFilePath", v || undefined)
          }
          immediate
          className={inputClass}
          placeholder={t("agentConfig.instructionsFile.placeholder")}
        />
        <ChoosePathButton />
      </div>
    </Field>
  );
}
