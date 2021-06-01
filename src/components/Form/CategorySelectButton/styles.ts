import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7,
})`
  border: 1px solid #25242c;
  background: #19181f;
  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 18px 16px;
`;

export const Category = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.white_light};
`;
