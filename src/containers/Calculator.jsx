import React, { useState } from "react";
import TableContainer from "../components/TableContainer";
import CalculatorForm from "../components/CalculatorForm";
import { Container } from "react-bootstrap";
import { DEFAULT_CALC_VALUES } from "../utils/constants";

const Calculator = () => {
  const [feeRows, setFeeRows] = useState([]);

  const toCurrency = (numberString) => {
    let number = parseFloat(numberString);

    if (isNaN(number)) return "";

    return `$${number.toLocaleString("es-CO")}`;
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Cuota",
        accessor: "installment", // accessor is the "key" in the data
      },
      {
        Header: "Fecha",
        accessor: "date",
      },
      {
        Header: "Valor",
        accessor: "fee",
        Cell: (props) => `${toCurrency(props.value)}`,
      },
      {
        Header: "Pagado",
        accessor: "payedToDate",
        Cell: (props) => toCurrency(props.value),
      },
      {
        Header: "Salario",
        accessor: "salary",
        Cell: (props) => toCurrency(props.value),
      },
    ],
    []
  );
  // const data = React.useMemo(
  //   () => [
  //     {
  //       installment: 1,
  //       date: "August",
  //       fee: 510000,
  //       salary: 3000000,
  //     },
  //     {
  //       installment: 2,
  //       date: "September",
  //       fee: 510000,
  //       salary: 3000000,
  //     },
  //   ],
  //   []
  // );

  return (
    <Container>
      <CalculatorForm
        DEFAULT_CALC_VALUES={DEFAULT_CALC_VALUES}
        setFeeRows={setFeeRows}
      />
      <TableContainer columns={columns} data={feeRows} />
    </Container>
  );
};

export default Calculator;
