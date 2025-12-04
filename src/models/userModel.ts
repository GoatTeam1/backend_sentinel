import { User } from "../generated/prisma/client";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import prisma from "../config/dbConnection";

export class userModel {
    async getAllUsers() {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            throw new Error("No users found");
        }
        return users;
    }

    async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async createUser(data: User) {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username },
                ],
            },
        });

        if (existingUser) {
            if (existingUser.email === data.email) {
                throw new Error("Email already exists");
            }
            if (existingUser.username === data.username) {
                throw new Error("Username already exists");
            }
        }
        data.password = await hashPassword(data.password);

        return await prisma.user.create({ data });
    }

    async updateUser(id: string, data: Partial<User>) {
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new Error("User not found");
        }
        return await prisma.user.update({
            where: { id },
            data,
        });
    }

    async deleteUser(id: string) {
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new Error("User not found");
        }
        return await prisma.user.delete({
            where: { id },
        });

    }

    async changePassword(id: string, newPassword: string) {
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new Error("User not found");
        }
        existingUser.password = await hashPassword(newPassword);
        return await prisma.user.update({
            where: { id },
            data: { password: existingUser.password },
        });
    }

    async signIn(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return user;
    }


}