import React from 'react';
import clsx from 'clsx';
import { Typography } from '@/shared/components/Typography/Typography';
import { ChipProps } from '@/shared/data/models/Chip.interface';
import styles from './styles.module.css';

const resolveChipColor = (bgColor: string) => {
  if (bgColor.startsWith('var(')) return bgColor;
  return `var(--${bgColor})`;
};

export const Chip = ({
  label,
  isBoldText = false,
  textColor = 'default',
  bgColor = 'neutral-200',
  isSquare = false,
  minWidth = 'auto'
}: ChipProps) => {
  
  const dynamicStyles = {
    '--chip-bg-color': resolveChipColor(bgColor),
    '--chip-text-color': textColor.startsWith('var(') ? textColor : `var(--${textColor})`,
    minWidth
  } as React.CSSProperties;

  return (
    <div 
      className={clsx(
        styles.chip, 
        isSquare ? styles.square : styles.rounded
      )} 
      style={dynamicStyles}
      data-testid={'chip-container'}
    >
      <Typography 
        variant={'xs'}
        weight={isBoldText ? 'bold' : 'regular'}
        color={textColor}
      >
        {label}
      </Typography>
    </div>
  );
};
