// Library Authorization - No-op stub for SPMA (no auth)
// TODO: Add proper authorization when auth is implemented

export type LibraryAction =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "borrow"
  | "return"
  | "admin"

export function checkLibraryPermission(): boolean {
  return true
}

export function assertLibraryPermission(): void {
  // No-op - SPMA has no auth
}
