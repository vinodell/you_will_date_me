import { telegramApi } from "../../../consts";
import type { DateInvitationPayload, TelegramResponse } from "../types";

export async function sendDateInvitation(
  payload: DateInvitationPayload,
): Promise<void> {
  const response = await fetch(telegramApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as TelegramResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Telegram send failed");
  }
}
