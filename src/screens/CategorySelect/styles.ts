import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};

  padding-bottom: ${getBottomSpace()}px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.primary_medium};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary : theme.colors.primary};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary_light};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
