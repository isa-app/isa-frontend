export const calculateFees = ({
  percentage,
  salary,
  installments,
  topLimit,
  payedInstallments,
  payed,
}) => {
  const installmentFee = salary * (percentage / 100);

  const yetToPay = topLimit - payed;

  const remainingInstallments = installments - payedInstallments;

  const installmentsToTopLimit = yetToPay / installmentFee;

  const topInstallmentsToPay =
    installmentsToTopLimit < remainingInstallments
      ? payedInstallments + installmentsToTopLimit
      : remainingInstallments;

  const data = [];
  let date = new Date();
  const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    // day: "numeric",
  };

  let totalPayed = payed;

  for (
    let index = payedInstallments + 1;
    index <= Math.round(topInstallmentsToPay);
    index++
  ) {
    let fee;
    if (totalPayed + installmentFee > topLimit) fee = topLimit - totalPayed;
    else fee = installmentFee;

    totalPayed += fee;

    const feeObj = {
      installment: index,
      date: date.toLocaleDateString("es-CO", options),
      fee: fee.toFixed(0),
      payedToDate: totalPayed,
      salary: salary,
    };
    date.setMonth(date.getMonth() + 1);

    data.push(feeObj);
  }

  const totalObj = {
    installment: "Total",
    // date: date.toLocaleDateString("es-CO", options),
    payedToDate: totalPayed.toFixed(0),
    // salary: salary,
  };

  data.push(totalObj);

  return data;
};
