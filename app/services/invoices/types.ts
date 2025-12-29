export interface ActionState {
  message: string | null;
  errors: Record<string, string[]>;
}
