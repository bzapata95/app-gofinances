import React from "react";

import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

const icons = {
  ingress: "arrow-up-circle",
  egress: "arrow-down-circle",
};

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: "ingress" | "egress";
  isActive?: boolean;
}

function TransactionTypeButton({
  title,
  type,
  isActive = false,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}

export default TransactionTypeButton;
