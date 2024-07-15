import { UserStatus } from "@prisma/client";

import prisma from "../instance";

const ADMIN_USERS_COUNT = 5;
const NORMAL_USERS_COUNT = 100;
const BANNED_USERS_COUNT = 5;
export const USERS_COUNT =
  ADMIN_USERS_COUNT + NORMAL_USERS_COUNT + BANNED_USERS_COUNT;

export const seedUsers = async () => {
  await prisma.users.createMany({
    data: Array.from({ length: ADMIN_USERS_COUNT }, (_, i) => ({
      username: `admin_${i + 1}`,
      displayName: `Admin ${i + 1}`,
      groupId: 1,
      userStatus: UserStatus.normal,
      password: "",
    })),
  });
  await prisma.users.createMany({
    data: Array.from({ length: NORMAL_USERS_COUNT }, (_, i) => {
      return {
        username: `user_${i + 1}`,
        displayName: `User ${i + 1}`,
        groupId: 2,
        userStatus: UserStatus.normal,
        password: "",
      };
    }),
  });
  await prisma.users.createMany({
    data: Array.from({ length: BANNED_USERS_COUNT }, (_, i) => {
      return {
        username: `banned_${i + 1}`,
        displayName: `Banned ${i + 1}`,
        groupId: 3,
        userStatus: UserStatus.banned,
        password: "",
      };
    }),
  });
};
