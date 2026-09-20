export interface Activity {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly icon: string;
  readonly color: string;
}

export interface City {
  readonly id: string;
  readonly title: string;
  readonly detail?: string;
  readonly image: string;
}

export interface DateInvitationPayload {
  readonly activity: string;
  readonly details: string;
  readonly city: string;
  readonly date: string;
  readonly time: string;
}

export interface TelegramResponse {
  readonly success: boolean;
  readonly error?: string;
}

export type InvitationStep = 1 | 2 | 3 | 4 | 5;