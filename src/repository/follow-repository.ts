import { Follow } from "../models/follow.js"

export function followRepository() {
    const follow = async (followerId: number, followingId: number) => {
        const data = await Follow.create({followerId, followingId});
        return data;
    }

    const unfollow = async (followerId: number, followingId: number) => {
        const data = await Follow.destroy({where: {followerId, followingId}});
        return data;
    }

    const getFollowers = async (userId: number) => {
        const data = await Follow.findAll({where: {followingId: userId}});
        return data;
    }

    const getFollowing = async (userId: number) => {
        const data = await Follow.findAll({where: {followerId: userId}});
        return data;
    }

    return {
        follow,
        unfollow,
        getFollowers,
        getFollowing
    }
}