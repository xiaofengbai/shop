export const getCode = () => {
  var num = "";
  for (var i = 0; i < 4; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};
