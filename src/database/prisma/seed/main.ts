import { seedPrisma } from "./connector";
import { seedDebugProblems } from "./debugProblems";
import { seedDebugSubmissions } from "./debugSubmissions";
import { seedGroups } from "./groups";
import { seedProblems } from "./problems";
import { seedSubmissions } from "./submissions";
import { seedUsers } from "./users";

const seed = async () => {
  await seedPrisma.$queryRaw`DROP RULE IF EXISTS "user_rankings_update_on_new_user" ON users ;`;
  await seedGroups();
  await seedUsers();
  await seedProblems();
  await seedPrisma.$queryRaw`SELECT 1 FROM refresh_rankings();`;
  await seedSubmissions();
  await seedDebugProblems();
  await seedDebugSubmissions();
};

seed().then(() => {
  console.log("Seeding complete");
});
