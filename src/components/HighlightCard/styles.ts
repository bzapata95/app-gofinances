import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  type: "ingress" | "egress" | "total";
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.primary_light : theme.colors.secondary};

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white_medium};
  font-family: ${({ theme }) => theme.fonts.regular};

  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === "ingress" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type }) =>
    type === "egress" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

    ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.white};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.medium};

  font-size: ${RFValue(32)}px;
  margin-top: 32px;
`;

export const LastTransaction = styled.Text`
  color: ${({ theme }) => theme.colors.white_light};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
