-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'DELETED');

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'ACTIVE';
