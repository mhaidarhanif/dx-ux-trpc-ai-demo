-- DropForeignKey
ALTER TABLE "ExampleItem" DROP CONSTRAINT "ExampleItem_exampleId_fkey";

-- AddForeignKey
ALTER TABLE "ExampleItem" ADD CONSTRAINT "ExampleItem_exampleId_fkey" FOREIGN KEY ("exampleId") REFERENCES "Example"("id") ON DELETE CASCADE ON UPDATE CASCADE;
