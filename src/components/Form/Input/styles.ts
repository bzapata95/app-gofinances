import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  border: 1px solid #25242c;
  background: #19181f;
  border-radius: 5px;

  width: 100%;
  padding: 18px 16px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 8px;
`;
