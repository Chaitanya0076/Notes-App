"use server"

import { createClient } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";

export const loginAction = async (email: string, password: string) => {
    try{
        const {auth} = await createClient();
        const {error} = await auth.signInWithPassword({
            email,
            password
        });
        if(error) throw error;

        return {
            errorMessage: null
        }
    }catch(error){
        return handleError(error);
    }
}

export const logoutAction = async () => {
    try{
        const {auth} = await createClient();
        const {error} = await auth.signOut();
        if(error) throw error;

        return {
            errorMessage: null
        }
    }catch(error){
        return handleError(error);
    }
}

export const signUpAction = async (email: string, password: string) => {
    try{
        const {auth} = await createClient();
        const {data,error} = await auth.signUp({
            email,
            password
        });
        if(error) throw error;

        const userId = data.user?.id;
        if(!userId) throw new Error("An error occurred while signing up");

        await prisma.user.create({
            data: {
                id: userId,
                email,
            },
        })

        return {
            errorMessage: null
        }
    }catch(error){
        return handleError(error);
    }
}