import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";

import Input from "../../components/Form/InputForm";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import CategorySelect from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nombre es obligatorio"),
  amount: Yup.number()
    .typeError("Informe un valor númerico")
    .positive("El monto no puede ser negativo")
    .required("El monto es requerido"),
});

function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [transactionType, setTransactionType] = useState("");

  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);

  function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Seleccione el tipo de transacción");
    }

    if (category.key === "category") {
      return Alert.alert("Seleccione una categoría");
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Registro</Title>
        </Header>

        <Form>
          <Fields>
            <Input
              name="name"
              control={control}
              placeholder="Motivo"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <Input
              name="amount"
              control={control}
              placeholder="Monto"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="ingress"
                title="Ingreso"
                onPress={() => setTransactionType("ingress")}
                isActive={transactionType === "ingress"}
              />
              <TransactionTypeButton
                type="egress"
                title="Egreso"
                onPress={() => setTransactionType("egress")}
                isActive={transactionType === "egress"}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => setIsOpenCategoryModal(true)}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={isOpenCategoryModal}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setIsOpenCategoryModal(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;
