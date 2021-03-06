import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from "./styles";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface Amount {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entires: Amount;
  expensive: Amount;
  total: Amount;
}

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const theme = useTheme();

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "ingress" | "egress"
  ) {
    const collectionFiltered = collection.filter(
      (transaction) => transaction.transactionType === type
    );

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const numberDatesArray = collectionFiltered.map((transaction) =>
      new Date(transaction.date).getTime()
    );

    const dateMaxApply = new Date(Math.max.apply(Math, numberDatesArray));

    const lastTransactionFormatted = Intl.DateTimeFormat("es-PE", {
      day: "numeric",
      month: "long",
    }).format(dateMaxApply);

    return lastTransactionFormatted;
  }

  async function getData() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.transactionType === "ingress") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
        });
        const date = new Date(item.date);
        const dateFormatted = Intl.DateTimeFormat("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(date);

        return {
          ...item,
          amount,
          date: dateFormatted,
        };
      }
    );

    setData(transactionFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "ingress"
    );
    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      "egress"
    );
    const totalInterval =
      lastTransactionExpensive === 0
        ? "No hay transacciones"
        : `01 a ${lastTransactionEntries}`;

    setHighlightData({
      entires: {
        amount: Number(entriesTotal).toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "No hay transacciones"
            : `??ltimo ingreso d??a: ${lastTransactionEntries}`,
      },
      expensive: {
        amount: Number(expensiveTotal).toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
        }),
        lastTransaction:
          lastTransactionExpensive === 0
            ? "No hay transacciones"
            : `??ltimo ingreso d??a: ${lastTransactionExpensive}`,
      },
      total: {
        amount: Number(entriesTotal - expensiveTotal).toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Hola,</UserGreeting>
                  <Username>{user.name}</Username>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="ingress"
              title="Ingresos"
              amount={highlightData.entires?.amount}
              lastTransaction={highlightData.entires?.lastTransaction}
            />
            <HighlightCard
              type="egress"
              title="Salidas"
              amount={highlightData.expensive?.amount}
              lastTransaction={highlightData.expensive?.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total?.amount}
              lastTransaction={highlightData.total?.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listado</Title>

            <TransactionList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
