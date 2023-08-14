const importAll = (r) => {
  let audioFiles = {};
  r.keys().forEach((key) => {
    // Remove the leading './' from the key
    const trimmedKey = key.replace(/^\.\//, '');
    // Add the folder path before the trimmed key
    const filePath = './audios/' + trimmedKey;
    audioFiles[key] = r(key).default;
    // Assign the value to the updated file path
    audioFiles[filePath] = audioFiles[key];
  });
  console.log(audioFiles);
  return audioFiles;
};

export const audioFiles = importAll(
  require.context('./audios', false, /\.(mp3|wav)$/)
);