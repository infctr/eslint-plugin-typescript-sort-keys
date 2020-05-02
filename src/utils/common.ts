const nameToIndexSignature = (x: string) => `[index: ${x}]`;
const indexSignatureRegexp = new RegExp(
  `^${nameToIndexSignature('.+')}`.replace('[', '\\[').replace(']', '\\]'),
);

export const indexSignature = {
  create: nameToIndexSignature,
  regex: indexSignatureRegexp,
};
