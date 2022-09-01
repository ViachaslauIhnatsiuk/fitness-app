const concatFieldOfIngredient = (name: string, amount: number, unit: string) => {
  let result = `${name}: `;

  let newAmount = amount.toFixed(1);
  if (amount > 10) {
    newAmount = `${Math.ceil(amount)}`;
  }

  if (newAmount[newAmount.length - 1] === '0') {
    newAmount = newAmount.slice(0, newAmount.length - 2);
  }
  result = result.concat(`${newAmount}`);

  if (unit.length) {
    result = result.concat(` - ${unit}`);
  }

  return result;
};

export { concatFieldOfIngredient };
