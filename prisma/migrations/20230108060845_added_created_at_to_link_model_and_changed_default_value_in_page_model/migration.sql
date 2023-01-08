-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "pageId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL DEFAULT true,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Link_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("clicks", "id", "name", "pageId", "show", "url") SELECT "clicks", "id", "name", "pageId", "show", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE TABLE "new_Page" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitor" INTEGER NOT NULL DEFAULT 0,
    "bgColor" TEXT NOT NULL DEFAULT '#121212',
    "textColor" TEXT NOT NULL DEFAULT '#ffffff',
    CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Page" ("bgColor", "bio", "createdAt", "name", "textColor", "title", "userId", "visitor") SELECT "bgColor", "bio", "createdAt", "name", "textColor", "title", "userId", "visitor" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_name_key" ON "Page"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
