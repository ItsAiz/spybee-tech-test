import { User } from '@/modules/projects/data/models/Projects.interface';
import { Typography } from '@/shared/components/Typography/Typography';
import { buildInitials } from '@modules/projects/domain/utils/Project.utils';
import styles from './styles.module.css';

export const ProjectUsers = ({ users }: { users: User[] }) => {
  const primaryColors = [
    'var(--primary-100)',
    'var(--primary-200)',
    'var(--primary-300)',
    'var(--primary-400)',
    'var(--primary-500)',
    'var(--primary-100)',
  ];

  return (
    <div style={{ display: 'flex', paddingLeft: '8px' }}>
      {users.slice(0, 6).map((user, index) => {
        const backgroundColor = primaryColors[index % 6];
        return (
          <div
            key={`user-hex-${index}`}
            className={styles.hexagon}
            style={{ backgroundColor }}
          >
            <Typography className={styles.initials} variant={'xs'}>
              {buildInitials(`${user.name} ${user.lastName}`)}
            </Typography>
          </div>
        );
      })}
      {users.length > 6 && (
        <Typography variant={'xs'} color={'muted'}>
          +{users.length - 6}
        </Typography>
      )}
    </div>
  );
};
