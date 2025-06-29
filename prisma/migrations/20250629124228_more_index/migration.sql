-- CreateIndex
CREATE INDEX "Example_slug_idx" ON "Example"("slug");

-- CreateIndex
CREATE INDEX "ExampleItem_slug_exampleId_idx" ON "ExampleItem"("slug", "exampleId");

-- CreateIndex
CREATE INDEX "RateLimit_key_idx" ON "RateLimit"("key");
