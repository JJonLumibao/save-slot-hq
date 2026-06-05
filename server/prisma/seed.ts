import { prisma } from "../src/db.setup.js"
import { encryptPassword } from "../src/auth-utils.js"

const clearDb = async () => {
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();
}

const seed = async () => {
  console.log("Seeding the database...");
  await clearDb();

  const reggie = await prisma.user.create({
    data: {
      firstName: "Reggie",
      lastName: "Regular",
      username: "ReggieReg",
      email: "reggie@email.com",
      passwordHash: await encryptPassword("regpassword"),
      role: "REGULAR",
    },
  });

  const preesha = await prisma.user.create({
    data: {
      firstName: "Preesha",
      lastName: "Premium",
      username: "PreeshaPre",
      email: "preesha@email.com",
      passwordHash: await encryptPassword("prepassword"),
      role: "PREMIUM",
    },
  });

  const adam = await prisma.user.create({
    data: {
      firstName: "Adam",
      lastName: "Admin",
      username: "AdamAdm",
      email: "adam@email.com",
      passwordHash: await encryptPassword("adapassword"),
      role: "ADMIN",
    },
  });

  const fighterX = await prisma.game.create({
    data: {
      name: "Fighter X",
      description: "3D based 1v1 fighting game multiplayer"
    },
  });

  const fastRacer = await prisma.game.create({
    data: {
      name: "Fast Racer",
      description: "Racing game with a single player story, and competitive multiplayer feature"
    },
  });

  const petLife = await prisma.game.create({
    data: {
      name: "Pet Life",
      description: "First person pet simulator where you can interact with other player-controlled pets"
    },
  }); 

  const behindYou = await prisma.game.create({
    data: {
      name: "Behind You",
      description: "Single-player/co-op story-based horror game"
    },
  });

  const craftWorld = await prisma.game.create({
    data: {
      name: "Craft World",
      description: "Single-player/co-op 3D first person sandbox game"
    },
  });
};

seed()
  .then(() => {
    console.log("Seeding complete");
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })