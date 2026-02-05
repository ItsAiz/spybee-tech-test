import { SPACING_SIZES } from "@/shared/constants/Spacing.constant";

export type SpacingSize = (typeof SPACING_SIZES)[number];

export type SpacingProps = {
  spy?: SpacingSize;
  spx?: SpacingSize;
};
