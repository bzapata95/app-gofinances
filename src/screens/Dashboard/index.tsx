import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
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
} from "./styles";

const dataKey = "@gofinances:transactions";
export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function getData() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        console.log({ item });
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
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/15035675?v=4",
              }}
            />
            <User>
              <UserGreeting>Hola,</UserGreeting>
              <Username>Bryan</Username>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="ingress"
          title="Ingresos"
          amount="S/ 17 000"
          lastTransaction="Última actualización día 13 de abril"
        />
        <HighlightCard
          type="egress"
          title="Salidas"
          amount="S/ 1 000"
          lastTransaction="Última actualización día 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="S/ 16 000"
          lastTransaction="Última actualización día 13 de abril"
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
    </Container>
  );
}
