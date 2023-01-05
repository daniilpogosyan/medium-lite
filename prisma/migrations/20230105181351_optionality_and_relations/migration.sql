/*
  Warnings:

  - Made the column `authorID` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,
    CONSTRAINT "posts_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("ID", "authorID", "content", "title") SELECT "ID", "authorID", "content", "title" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE TABLE "new_users" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);
INSERT INTO "new_users" ("ID", "email", "passwordHash") SELECT "ID", "email", "passwordHash" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
