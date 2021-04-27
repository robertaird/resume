export const relativeFileName = (fileName: string) => {
  return `src/${
    fileName.startsWith('./')
      ? fileName.split('./')[1]
      : fileName.split('src/')[1]
  }`;
};
