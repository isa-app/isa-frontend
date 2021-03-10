import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { calculateFees } from "../utils/calcs";
import "../assets/styles/components/CalculatorForm.scss";

const errorMessages = {
  percentage: "Debe ser un porcentage valido",
  cop: "Debe ser un valor valido",
  installment: "Debe ser un número de cuotas valido",
};

const CalculatorForm = ({ DEFAULT_CALC_VALUES, setFeeRows }) => {
  const { register, handleSubmit, errors } = useForm({});

  const handleCalc = (data) => {
    Object.keys(data).map(
      (item) =>
        (data[item] = !data[item].length
          ? DEFAULT_CALC_VALUES[item]
          : Number(data[item]))
    );

    // console.log(calculateFees(data));

    setFeeRows(calculateFees(data));
  };

  return (
    <Form
      className="my-4 p-4 border border-info shadow-sm"
      onSubmit={handleSubmit(handleCalc)}
    >
      <Form.Row>
        <Form.Group as={Col} sm={12} md={6} controlId="formPercentage">
          <Form.Label>Porcentaje (%)</Form.Label>
          <Form.Control
            type="text"
            placeholder={DEFAULT_CALC_VALUES.percentage}
            name="percentage"
            ref={register({ pattern: /^\d*\.?\d*$/ })}
          />
          {errors.percentage && (
            <span className="required_message">{errorMessages.percentage}</span>
          )}
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6} controlId="formSalary">
          <Form.Label>Salario (COP)</Form.Label>
          <Form.Control
            type="text"
            placeholder={DEFAULT_CALC_VALUES.salary}
            name="salary"
            ref={register({ pattern: /^[0-9]*$/ })}
          />
          {errors.salary && (
            <span className="required_message">{errorMessages.cop}</span>
          )}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} sm={12} md={6} controlId="formInstallments">
          <Form.Label>Número de Cuotas (#)</Form.Label>
          <Form.Control
            type="text"
            placeholder={DEFAULT_CALC_VALUES.installments}
            name="installments"
            ref={register({ pattern: /^[0-9]*$/ })}
          />
          {errors.installments && (
            <span className="required_message">
              {errorMessages.installment}
            </span>
          )}
        </Form.Group>
        <Form.Group as={Col} sm={12} md={6} controlId="formTopLimit">
          <Form.Label>Tope Limite (COP)</Form.Label>
          <Form.Control
            type="text"
            placeholder={DEFAULT_CALC_VALUES.topLimit}
            name="topLimit"
            ref={register({ pattern: /^[0-9]*$/ })}
          />
          {errors.topLimit && (
            <span className="required_message">{errorMessages.cop}</span>
          )}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group
          as={Col}
          sm={12}
          md={6}
          controlId="formRemainingInstallments"
        >
          <Form.Label>Cuotas Pagadas (#)</Form.Label>
          <Form.Control
            type="text"
            placeholder={DEFAULT_CALC_VALUES.payedInstallments}
            name="payedInstallments"
            ref={register({ pattern: /^[0-9]*$/ })}
          />
          {errors.payedInstallments && (
            <span className="required_message">
              {errorMessages.installment}
            </span>
          )}
        </Form.Group>
        <Form.Group as={Col} controlId="formTopLimit">
          <Form.Label>Cantidad Actual Pagada (COP)</Form.Label>
          <Form.Control
            type="text"
            placeholder={DEFAULT_CALC_VALUES.payed}
            name="payed"
            ref={register({ pattern: /^[0-9]*$/ })}
          />
          {errors.payed && (
            <span className="required_message">{errorMessages.cop}</span>
          )}
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Calcular
      </Button>
    </Form>
  );
};

export default CalculatorForm;
