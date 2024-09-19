export function secondsToHuman(ts) {
  let h = Math.floor(ts / 3600);
  let m = Math.floor((ts - h * 3600) / 60);
  let s = Math.floor(ts - h * 3600 - m * 60);

  let txt = '';
  if (h > 0) {
    txt += h + '时';
  }
  if (m > 0) {
    txt += m + '分';
  } else if (h > 0) {
    txt += '0分';
  }
  txt += s + '秒';

  return txt;
}
