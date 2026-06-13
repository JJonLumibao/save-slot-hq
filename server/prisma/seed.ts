import { prisma } from "../src/db.setup.js"
import { encryptPassword } from "../src/auth-utils.js"

const clearDb = async () => {
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();
}

const seed = async () => {
  console.log("Seeding the database...");
  await clearDb();

  // USERS
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

  const rex = await prisma.user.create({
    data: {
      firstName: "Rex",
      lastName: "Regular",
      username: "RexReg",
      email: "rex@email.com",
      passwordHash: await encryptPassword("rexpassword"),
      role: "REGULAR",
    },
  });

  const renny = await prisma.user.create({
    data: {
      firstName: "Renny",
      lastName: "Regular",
      username: "RennyReg",
      email: "ren@email.com",
      passwordHash: await encryptPassword("renpassword"),
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

  const prentice = await prisma.user.create({
    data: {
      firstName: "Prentice",
      lastName: "Premium",
      username: "PrenticePre",
      email: "prentice@email.com",
      passwordHash: await encryptPassword("prepassword"),
      role: "PREMIUM",
    },
  });

  const prince = await prisma.user.create({
    data: {
      firstName: "Prince",
      lastName: "Premium",
      username: "PrincePre",
      email: "prince@email.com",
      passwordHash: await encryptPassword("pripassword"),
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

  const anna = await prisma.user.create({
    data: {
      firstName: "Anna",
      lastName: "Admin",
      username: "AnnaAdm",
      email: "anna@email.com",
      passwordHash: await encryptPassword("annpassword"),
      role: "ADMIN",
    },
  });

  const ashley = await prisma.user.create({
    data: {
      firstName: "Ashley",
      lastName: "Admin",
      username: "AshleyAdm",
      email: "ashley@email.com",
      passwordHash: await encryptPassword("ashpassword"),
      role: "ADMIN",
    },
  });

  // GAMES
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

  const zombieRush = await prisma.game.create({
    data: {
      name: "Zombie Rush",
      description: "Co-op survival shooter against endless zombie waves",
    },
  });

  const galaxyRaiders = await prisma.game.create({
    data: {
      name: "Galaxy Raiders",
      description: "Sci-fi MMO with ship customization and guild battles",
    },
  });

  const kingdomsRise = await prisma.game.create({
    data: {
      name: "Kingdoms Rise",
      description: "Strategy game focused on kingdom management and warfare",
    },
  });

  const mysticQuest = await prisma.game.create({
    data: {
      name: "Mystic Quest",
      description: "Fantasy RPG featuring dungeons and boss encounters",
    },
  });

  // FAVORITES
  await prisma.user.update({
    where: { id: reggie.id },
    data: {
      favorites: {
        connect: [
          { id: fighterX.id },
          { id: petLife.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: rex.id },
    data: {
      favorites: {
        connect: [
          { id: behindYou.id },
          { id: galaxyRaiders.id },
          { id: kingdomsRise.id },
          { id: zombieRush.id },
          { id: craftWorld.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: renny.id },
    data: {
      favorites: {
        connect: [
          { id: galaxyRaiders.id },
          { id: fastRacer.id },
          { id: zombieRush.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: preesha.id },
    data: {
      favorites: {
        connect: [
          { id: craftWorld.id },
          { id: mysticQuest.id },
          { id: petLife.id },
          { id: fighterX.id },
          { id: behindYou.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: prentice.id },
    data: {
      favorites: {
        connect: [
          { id: craftWorld.id },
          { id: fastRacer.id },
          { id: zombieRush.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: prince.id },
    data: {
      favorites: {
        connect: [
          { id: craftWorld.id },
          { id: fastRacer.id },
          { id: zombieRush.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: adam.id },
    data: {
      favorites: {
        connect: [
          { id: craftWorld.id },
          { id: fastRacer.id },
          { id: zombieRush.id },
          { id: fighterX.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: anna.id },
    data: {
      favorites: {
        connect: [
          { id: craftWorld.id },
          { id: fastRacer.id },
          { id: zombieRush.id },
          { id: mysticQuest.id },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: ashley.id },
    data: {
      favorites: {
        connect: [
          { id: mysticQuest.id },
          { id: fighterX.id },
          { id: craftWorld.id },
        ],
      },
    },
  });

  await prisma.review.createMany({
  data: [
    {
      rating: 5,
      comment: "Best fighting game I've played! IT'S SO PEAK!!",
      userId: preesha.id,
      gameId: fighterX.id,
    },
    {
      rating: 4,
      comment: "Really fun with friends! I always play after work!",
      userId: adam.id,
      gameId: fighterX.id,
    },
    {
      rating: 3,
      comment: "Could use more maps. Music is solid tho",
      userId: prentice.id,
      gameId: fighterX.id,
    },
    {
      rating: 5,
      comment: "Pet Life is adorable! They have my dog in the game!!",
      userId: preesha.id,
      gameId: petLife.id,
    },
    {
      rating: 2,
      comment: "Story was too short...",
      userId: prince.id,
      gameId: behindYou.id,
    },
    {
      rating: 1,
      comment: "Very predictable jumpscares too, needs a remake",
      userId: prince.id,
      gameId: behindYou.id,
    },
    {
      rating: 5,
      comment: "Can't stop playing!!",
      userId: anna.id,
      gameId: craftWorld.id,
    },
    {
      rating: 5,
      comment: "Story of this game is just sooooo good! 10/10 would recommend!!",
      userId: ashley.id,
      gameId: mysticQuest.id,
    },
  ],
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