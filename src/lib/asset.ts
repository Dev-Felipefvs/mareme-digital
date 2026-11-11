/** Prefixa caminhos de /public com o basePath (necessário em subpastas do GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
