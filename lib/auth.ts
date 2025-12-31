export function checkAdminAuth(user: string, pass: string): boolean {
  return user === 'admin' && pass === 'secret123';
}

export function checkAlbumAuth(albumSlug: string, user: string, pass: string): boolean {
  const mockUsers: Record<string, {user: string, pass: string}> = {
    'test': {user: 'testuser', pass: 'testpass'},
    'wedding': {user: 'wedding', pass: '123456'}
  };
  return (mockUsers[albumSlug]?.user === user) && (mockUsers[albumSlug]?.pass === pass);
}