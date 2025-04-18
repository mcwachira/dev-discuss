/*
  Warnings:

  - You are about to drop the column `topicId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `upvotes` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentCount` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvotes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "upvotes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "topicId",
ADD COLUMN     "commentCount" INTEGER NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "Topic";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnPosts" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TagsOnPosts_pkey" PRIMARY KEY ("postId","tagId")
);

-- AddForeignKey
ALTER TABLE "TagsOnPosts" ADD CONSTRAINT "TagsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPosts" ADD CONSTRAINT "TagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
