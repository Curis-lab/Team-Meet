import { db } from "./prisma.server"
import { Prisma, TeamStyle } from "@prisma/client"

export const createTeam = async(
    message: string,
    userId: string,
    recipientid: string,
    style: TeamStyle
)=>{
    await db.team.create({
        data:{
            message,
            author:{
                connect:{
                    id: userId
                }
            },
            recipient:{
                connect:{
                    id: recipientid
                }
            },
            style
        }
    })
}

export const getFilterdTeams = async(
    userId: string,
    sortFilter: Prisma.TeamOrderByWithRelationInput,
    whereFilter: Prisma.TeamWhereInput
)=>{
    return await db.team.findMany({
        where:{
            recipientId: userId,
            ...whereFilter
        },
        orderBy: sortFilter,
        select:{
            id: true,
            style: true,
            message: true,
            author:{
                select:{
                    profile: true
                }
            }
        }
    })
}

export const getRecentTeams =  async()=>{
    return await db.team.findMany({
        take:3,
        orderBy:{
            createAt: 'desc',
        },
        select:{
            style:{
                select:{
                    emoji: true
                }
            },
            recipient:{
                select:{
                    id: true,
                    profile: true,
                }
            }
        }
    })
}