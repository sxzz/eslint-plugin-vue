export function fileURLToPath(url: string | URL) {
  return new URL(url).pathname
}
