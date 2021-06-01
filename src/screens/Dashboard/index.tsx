import React from "react";
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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      title: "Desarrollo web",
      amount: "S/ 1,200.00",
      category: { name: "Ventas", icon: "dollar-sign" },
      date: "04/13/2020",
      type: "ingress",
    },
    {
      id: "2",
      title: "Desarrollo web",
      amount: "S/ 1,200.00",
      category: { name: "Alimentación", icon: "coffee" },
      date: "04/13/2020",
      type: "egress",
    },
    {
      id: "3",
      title: "Desarrollo web",
      amount: "S/ 1,200.00",
      category: { name: "Casa", icon: "home" },
      date: "04/13/2020",
      type: "ingress",
    },
    {
      id: "4",
      title: "Desarrollo web",
      amount: "S/ 1,200.00",
      category: { name: "Compras", icon: "shopping-bag" },
      date: "04/13/2020",
      type: "ingress",
    },
  ];
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
