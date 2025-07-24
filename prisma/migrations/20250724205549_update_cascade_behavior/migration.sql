-- DropForeignKey
ALTER TABLE "touristic_destination_likes" DROP CONSTRAINT "touristic_destination_likes_touristic_destination_id_fkey";

-- AddForeignKey
ALTER TABLE "touristic_destination_likes" ADD CONSTRAINT "touristic_destination_likes_touristic_destination_id_fkey" FOREIGN KEY ("touristic_destination_id") REFERENCES "touristic_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
