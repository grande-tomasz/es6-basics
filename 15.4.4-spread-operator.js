const average = (...args) =>
{
  let sum = 0;
  args.forEach(arg => sum += arg);
  return sum / args.length;
};

const grades = [1, 5, 5, 5, 4, 3, 3, 2, 1];
console.log(average(...grades));
