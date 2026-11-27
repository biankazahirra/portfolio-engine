export type SceneKind =
  | "sprout"
  | "journal"
  | "audit"
  | "ledger"
  | "oversight"
  | "reporting"
  | "closing";

export interface ChapterDetail {
  heading: string;
  bullets: string[];
}

export interface Chapter {
  id: string;
  number: number;
  label: string;
  title: string;
  meta: string;
  takeaway: string;
  scene: SceneKind;
  details: ChapterDetail[];
}
