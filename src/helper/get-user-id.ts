import type { AuthenticatedRequest } from "../middleare.js";

export const getUserIdFromRequest = (req: AuthenticatedRequest) => {
  const user = req.user;
  if (user && typeof user === "object" && "id" in user) {
    const idValue = (user as { id?: unknown }).id;
    const id = Number(idValue);
    return Number.isFinite(id) ? id : null;
  }
  return null;
};
