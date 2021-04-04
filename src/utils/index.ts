export const mixKeyByAug: (...arg: Array<string>) => string = (...arg) => {
  let args = Array.from(arg),
    res = '';
  args.map(item => res += `${item} - `);
  return res.slice(0, res.length - 3);
}