export function checkAdminAuth(user: string, pass: string): boolean {
  return user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS;
}

export function checkAlbumAuth(albumSlug: string, user: string, pass: string): boolean {
  const albumUser = process.env[`NEXT_PUBLIC_ALBUM_${albumSlug.toUpperCase()}_USER`];
  const albumPass = process.env[`NEXT_PUBLIC_ALBUM_${albumSlug.toUpperCase()}_PASS`];
  return user === albumUser && pass === albumPass;
}
