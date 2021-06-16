import React, { useCallback, useEffect, useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import { ActivityIndicator } from "react-native";
import es from "date-fns/locale/es";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";

import HistoryCard from "../../components/HistoryCard";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { LoadContainer } from "../Dashboard/styles";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  name: string;
  amount: string;
  category: string;
  date: string;
  transactionType: "ingress" | "egress";
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentage: number;
  percentageFormatted: string;
}

function Resume() {
  const { user } = useAuth();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensive: TransactionData[] = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.transactionType === "egress" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensive.reduce(
      (accumulator, item) => accumulator + Number(item.amount),
      0
    );

    const totalCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensive.forEach((element) => {
        if (element.category === category.key) {
          categorySum += Number(element.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
        });

        const percentage = (categorySum / expensiveTotal) * 100;
        const percentageFormatted = `${percentage.toFixed(0)}%`;

        totalCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          key: category.key,
          percentage,
          percentageFormatted,
        });
      }
    });

    setTotalByCategories(totalCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );
  return (
    <Container>
      <Header>
        <Title>Historial</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(selectedDate, "MMMM, yyyy", { locale: es })}</Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percentageFormatted"
              y="total"
              colorScale={totalByCategories.map((category) => category.color)}
              labelRadius={50}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.white,
                },
              }}
            />
          </ChartContainer>

          {totalByCategories.map((category) => (
            <HistoryCard
              key={category.key}
              title={category.name}
              amount={category.totalFormatted}
              color={category.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}

export default Resume;
