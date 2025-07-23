-- CreateTable
CREATE TABLE "touristic_destinations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" VARCHAR(2048) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "touristic_destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "touristic_destination_likes" (
    "id" SERIAL NOT NULL,
    "touristic_destination_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "touristic_destination_likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "touristic_destination_likes" ADD CONSTRAINT "touristic_destination_likes_touristic_destination_id_fkey" FOREIGN KEY ("touristic_destination_id") REFERENCES "touristic_destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
