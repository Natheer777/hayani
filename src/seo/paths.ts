export function stripLanguagePrefix(path: string) {
  return path.replace(/^\/ar(?=\/|$)/, '') || '/'
}

export function localizePath(path: string, language: string | undefined) {
  const basePath = stripLanguagePrefix(path).replace(/\/$/, '') || '/'
  if (language !== 'ar') return basePath
  return basePath === '/' ? '/ar' : `/ar${basePath}`
}
