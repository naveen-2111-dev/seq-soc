import { ProfileRepository } from "../repository/profile-repository.js";

export function ProfileService(){
    const { updateProfile, getProfile } = ProfileRepository();

    const updateprofile = async (email: string, profileImageUrl: string) => {
        const result = await updateProfile(email, profileImageUrl);
        return result;
    }

    const getprofile = async (email: string) => {
        const result = await getProfile(email);
        return result;
    }

    return {
        updateprofile,
        getprofile,
    }
}