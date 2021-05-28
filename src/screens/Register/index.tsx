import React, { useState } from "react";
import { Modal } from "react-native";

import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";

import Input from "../../components/Form/Input";
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

function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const [transactionType, setTransactionType] = useState("");

  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);

  return (
    <Container>
      <Header>
        <Title>Registro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Motivo" />
          <Input placeholder="Monto" />

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

        <Button title="Categoría" />
      </Form>

      <Modal visible={isOpenCategoryModal}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={() => setIsOpenCategoryModal(false)}
        />
      </Modal>
    </Container>
  );
}

export default Register;
