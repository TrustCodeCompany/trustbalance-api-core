export class PasswordGenerator {
  static generatePassword(
    length: number,
    options: { [key: string]: boolean },
  ): string {
    const optionsChars: { [key: string]: string } = {
      digits: '1234567890',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      symbols: '@$!%&',
    };
    const chars: string[] = [];
    for (const key in options) {
      if (
        Object.prototype.hasOwnProperty.call(options, key) &&
        options[key] &&
        Object.prototype.hasOwnProperty.call(optionsChars, key)
      ) {
        chars.push(optionsChars[key]);
      }
    }

    if (!chars.length) return '';

    let password: string = '';

    for (let j: number = 0; j < chars.length; j++) {
      password += chars[j].charAt(Math.floor(Math.random() * chars[j].length));
    }
    if (length > chars.length) {
      length = length - chars.length;
      for (let i = 0; i < length; i++) {
        const index: number = Math.floor(Math.random() * chars.length);
        password += chars[index].charAt(
          Math.floor(Math.random() * chars[index].length),
        );
      }
    }

    return password;
  }
}
