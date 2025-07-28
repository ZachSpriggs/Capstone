export interface ItemInput {
  name: unknown;
  category: unknown;
  dateRemoved: unknown;
  notes?: unknown;
  tags?: unknown;
}

export function validateItemInput(
  data: ItemInput
): data is {
  name: string;
  category: string;
  dateRemoved: string;
  notes?: string;
  tags?: string[];
} {
  if (typeof data.name !== "string" || data.name.trim() === "") return false;
  if (typeof data.category !== "string" || data.category.trim() === "")
    return false;
  if (
    typeof data.dateRemoved !== "string" ||
    isNaN(Date.parse(data.dateRemoved))
  )
    return false;
  if (data.notes !== undefined && typeof data.notes !== "string") return false;
  if (
    data.tags !== undefined &&
    (!Array.isArray(data.tags) ||
      !data.tags.every((t) => typeof t === "string"))
  )
    return false;
  return true;
}

export interface CategoryInput {
  name: unknown;
}

export function validateCategoryInput(
  data: CategoryInput
): data is { name: string } {
  return typeof data.name === 'string' && data.name.trim() !== '';
}