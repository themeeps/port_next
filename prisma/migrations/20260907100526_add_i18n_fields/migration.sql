-- Project: title/description -> titleEn/titleId/descriptionEn/descriptionId
ALTER TABLE "Project" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "Project" ADD COLUMN "titleId" TEXT;
ALTER TABLE "Project" ADD COLUMN "descriptionEn" TEXT;
ALTER TABLE "Project" ADD COLUMN "descriptionId" TEXT;
UPDATE "Project" SET "titleEn" = "title", "titleId" = "title", "descriptionEn" = "description", "descriptionId" = "description";
ALTER TABLE "Project" ALTER COLUMN "titleEn" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "titleId" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "descriptionEn" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "descriptionId" SET NOT NULL;
ALTER TABLE "Project" DROP COLUMN "title";
ALTER TABLE "Project" DROP COLUMN "description";

-- SkillGroup: title -> titleEn/titleId
ALTER TABLE "SkillGroup" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "SkillGroup" ADD COLUMN "titleId" TEXT;
UPDATE "SkillGroup" SET "titleEn" = "title", "titleId" = "title";
ALTER TABLE "SkillGroup" ALTER COLUMN "titleEn" SET NOT NULL;
ALTER TABLE "SkillGroup" ALTER COLUMN "titleId" SET NOT NULL;
ALTER TABLE "SkillGroup" DROP COLUMN "title";

-- SkillSubgroup: label -> labelEn/labelId
ALTER TABLE "SkillSubgroup" ADD COLUMN "labelEn" TEXT;
ALTER TABLE "SkillSubgroup" ADD COLUMN "labelId" TEXT;
UPDATE "SkillSubgroup" SET "labelEn" = "label", "labelId" = "label";
ALTER TABLE "SkillSubgroup" ALTER COLUMN "labelEn" SET NOT NULL;
ALTER TABLE "SkillSubgroup" ALTER COLUMN "labelId" SET NOT NULL;
ALTER TABLE "SkillSubgroup" DROP COLUMN "label";

-- AboutContent: bio -> bioEn/bioId
ALTER TABLE "AboutContent" ADD COLUMN "bioEn" TEXT;
ALTER TABLE "AboutContent" ADD COLUMN "bioId" TEXT;
UPDATE "AboutContent" SET "bioEn" = "bio", "bioId" = "bio";
ALTER TABLE "AboutContent" ALTER COLUMN "bioEn" SET NOT NULL;
ALTER TABLE "AboutContent" ALTER COLUMN "bioId" SET NOT NULL;
ALTER TABLE "AboutContent" DROP COLUMN "bio";

-- AboutHighlight: title/desc -> titleEn/titleId/descEn/descId
ALTER TABLE "AboutHighlight" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "AboutHighlight" ADD COLUMN "titleId" TEXT;
ALTER TABLE "AboutHighlight" ADD COLUMN "descEn" TEXT;
ALTER TABLE "AboutHighlight" ADD COLUMN "descId" TEXT;
UPDATE "AboutHighlight" SET "titleEn" = "title", "titleId" = "title", "descEn" = "desc", "descId" = "desc";
ALTER TABLE "AboutHighlight" ALTER COLUMN "titleEn" SET NOT NULL;
ALTER TABLE "AboutHighlight" ALTER COLUMN "titleId" SET NOT NULL;
ALTER TABLE "AboutHighlight" ALTER COLUMN "descEn" SET NOT NULL;
ALTER TABLE "AboutHighlight" ALTER COLUMN "descId" SET NOT NULL;
ALTER TABLE "AboutHighlight" DROP COLUMN "title";
ALTER TABLE "AboutHighlight" DROP COLUMN "desc";
