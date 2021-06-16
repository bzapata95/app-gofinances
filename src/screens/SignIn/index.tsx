import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle sus {`\n`} finanzas de forma{`\n`} muy simple
          </Title>

          <SignInTitle>
            Haga su login {`\n`} con una de las dos cuentas de abajo
          </SignInTitle>
        </TitleWrapper>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar con google" svg={GoogleSVG} />
          <SignInSocialButton title="Entrar con apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
