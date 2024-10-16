import Footer from "../components/Footer";
import Header from "../components/Header";
import { TopLevelAnimationWrapper } from "../components/Transition";
import "../styles/globals.scss";

import Container from "react-bootstrap/Container";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;900&family=Open+Sans:wght@300&family=Source+Sans+Pro&&display=swap"
        rel="stylesheet"
      />
      <Container fluid className="light-mode">
        <Header />
        <TopLevelAnimationWrapper>
          <div id="content">
            <Component {...pageProps} />
          </div>
        </TopLevelAnimationWrapper>
        <Footer />
      </Container>
    </>
  );
};

export default MyApp;
