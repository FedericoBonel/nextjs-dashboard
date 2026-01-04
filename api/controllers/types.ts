/** Represents the state of a server action */
export interface ActionState {
  message: string | null;
  errors: Record<string, string[] | undefined>;
}
