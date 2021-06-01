import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
  type: "ingress" | "egress";
}

interface ContainerProps extends TypeProps {
  isActive: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme }) => theme.colors.primary_medium};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type, theme }) =>
    isActive &&
    type === "egress" &&
    css`
      border: 1.5px solid ${theme.colors.attention_light};
      background-color: ${theme.colors.attention_light};
    `}

  ${({ isActive, type, theme }) =>
    isActive &&
    type === "ingress" &&
    css`
      border: 1.5px solid ${theme.colors.success_light};
      background-color: ${theme.colors.success_light};
    `}
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  ${({ type, theme }) =>
    type === "egress"
      ? css`
          color: ${theme.colors.attention};
        `
      : css`
          color: ${theme.colors.success};
        `}
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.white_medium};
`;
