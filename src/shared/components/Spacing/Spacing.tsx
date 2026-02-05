import { SpacingProps } from '@/shared/data/models/Spacing.interface';

export const Spacing = ({ spy = 2, spx = 2 }: SpacingProps) => {
  const spacingY = spy !== undefined ? `${spy}px` : '0px';
  const spacingX = spx !== undefined ? `${spx}px` : '0px';

  return (
    <div
      style={{
        margin: `${spacingY} ${spacingX} ${spacingY} ${spacingX}`,
        backgroundColor: '#EAE3F3'
      }}
    />
  );
};
