import { followRepository } from "../repository/follow-repository.js";

export function followService() {
    const { follow, unfollow, getFollowers, getFollowing } = followRepository();

    const followUser = async (followerId: number, followingId: number) => {
        const data = await follow(followerId, followingId);
        return data;
    }

    const unfollowUser = async (followerId: number, followingId: number) => {
        const data = await unfollow(followerId, followingId);
        return data;
    }

    const getUserFollowers = async (userId: number) => {
        const data = await getFollowers(userId);
        return data;
    }

    const getUserFollowing = async (userId: number) => {
        const data = await getFollowing(userId);
        return data;
    }

    return {
        followUser,
        unfollowUser,
        getUserFollowers,
        getUserFollowing
    }
}