import type { AuthenticatedRequest } from "../middleare.js";

export const getEmailFromRequest = (req: AuthenticatedRequest) => {
    const user = req.user;
    if (user && typeof user === 'object' && 'email' in user) {
        return String(user.email ?? '');
    }
    return '';
};
