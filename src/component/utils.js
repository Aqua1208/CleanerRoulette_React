export const getTitleByTotal = (total) => {
  const titles = {
    0: "ビギナー",
    5: "アマチュア",
    20: "エキスパート",
    50: "プロ",
    100: "神",
  };

  let title = "未定";
  Object.keys(titles).forEach((key) => {
    if (total >= parseInt(key)) {
      title = titles[key];
    }
  });
  return title;
};