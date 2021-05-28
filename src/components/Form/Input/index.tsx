import React from "react";

import { TextInputProps } from "react-native";

import { Container } from "./styles";

type InputProps = TextInputProps;

function Input({ ...rest }: InputProps) {
  return (
    <Container {...rest} placeholderTextColor="rgba(229, 229, 229, 0.5)" />
  );
}

export default Input;
