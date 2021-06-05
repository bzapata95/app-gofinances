import React from "react";
import { categories } from "../../utils/categories";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  transactionType: "ingress" | "egress";
}
interface Props {
  data: TransactionCardProps;
}

function TransactionCard({ data }: Props) {
  const category = categories.find(
    (category) => category.key === data.category
  );
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.transactionType}>
        {data.transactionType === "egress" ? "- " : ""}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}

export default TransactionCard;
