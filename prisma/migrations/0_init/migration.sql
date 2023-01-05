-- CreateTable
CREATE TABLE "posts" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "content" TEXT,
    "authorID" INTEGER
);

-- CreateTable
CREATE TABLE "users" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "passwordHash" TEXT
);

