import { SaveRepository } from "../repository/save-repository.js";

export function saveService() {
    const { savePost, unsavePost, getSavedPosts } = SaveRepository();

    const savepost = async (userId: number, postId: number) => {
        return await savePost(userId, postId);
    }

    const unsavepost = async (userId: number, postId: number) => {
        return await unsavePost(userId, postId);
    }

    const getSavedPostsByUser = async (userId: number) => {
        return await getSavedPosts(userId);
    }

    return {
        savepost,
        unsavepost,
        getSavedPostsByUser
    };
}