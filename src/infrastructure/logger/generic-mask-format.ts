// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { format, TransformableInfo } from 'winston';
import { maskString } from '../../utils/mask-utils';

interface MaskableInfo extends TransformableInfo {
  [key: string]: any;
  mask?: string[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const genericMaskFormat = format((info: MaskableInfo) => {
  const maskFields = Array.isArray(info.mask) ? info.mask : [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const opts = info.maskOptions || {};

  // enmascarar propiedades directas con maskString
  for (const field of maskFields) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const val = info[field];
    if (typeof val === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const { showStart = 0, showEnd = 0 } = opts[field] || {};
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      info[field] = maskString(val, showStart, showEnd);
    }
  }

  // enmascarar dentro de message si viene JSON serializado
  if (typeof info.message === 'string') {
    for (const field of maskFields) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const { showStart = 0, showEnd = 0 } = opts[field] || {};
      // capturamos el valor real y lo pasamos por maskString
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      info.message = info.message.replace(
        new RegExp(`("${field}"\\s*:\\s*")([^"]*?)(")`, 'g'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        (_match, p1, p2, p3) => p1 + maskString(p2, showStart, showEnd) + p3,
      );
    }
  }

  delete info.mask;
  delete info.maskOptions;
  return info;
});

export default genericMaskFormat;
