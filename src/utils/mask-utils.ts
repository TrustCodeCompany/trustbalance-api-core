export function maskString(str: string, showStart = 0, showEnd = 0, maskChar = '*'): string {
  const len = str.length;
  // SOLO evitamos el enmascaramiento si pido mostrar más caracteres que existen
  if (showStart + showEnd > len) {
    return str;
  }
  const middle = maskChar.repeat(len - showStart - showEnd);
  return str.slice(0, showStart) + middle + str.slice(len - showEnd);
}
