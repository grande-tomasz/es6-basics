const average = (...args) =>
{
  let sum = 0;
  args.forEach(arg => sum += arg);
  return sum / args.length;
};
console.log(average(1)); // 1
console.log(average(1, 3)); // 2
console.log(average(1, 3, 6, 6)); // 4
