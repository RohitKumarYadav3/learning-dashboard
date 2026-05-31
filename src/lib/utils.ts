type ClassValue = string | undefined | null | boolean | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity)
    .filter((x): x is string => typeof x === "string" && x.length > 0)
    .join(" ");
}
