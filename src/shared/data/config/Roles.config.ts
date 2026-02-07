export const ROLE_ROUTES = {
  admin: [
    { label: 'My Projects', path: '/projects' },
    { label: 'Users', path: '/users' },
    { label: 'Settings', path: '/settings' },
  ],
  basic: [
    { label: 'My Projects', path: '/projects' },
  ],
};

export type UserRole = keyof typeof ROLE_ROUTES;
