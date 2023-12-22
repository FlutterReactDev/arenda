import { Helmet } from "react-helmet-async";
import { Routing, ScrollToTop } from "./providers/RouterProvier";

export const App = () => {
  return (
    <>
      <Helmet>
        <title>
          Turak.kg — сервис бронирования жилья: отели, квартиры посуточно,
          гостевые дома, коттеджи в частном секторе
        </title>
        <meta
          name="description"
          content="Поможем найти и забронировать жильё посуточно в Кыгызстане. Более 1 тысяч вариантов во всех популярных направлениях для путешествий: Бишкек, Наарын, Талас, Ош, Каракол"
        />
        <meta
          name="keywords"
          content="квартиры посуточно, квартиры на сутки, дома, коттеджи, жильё, гостиницы, сервис, бронирование, без посредников."
        />
        <meta property="og:site_name" content="Turak.kg" />
        <meta
          property="og:title"
          content="Turak.kg — сервис бронирования жилья: отели, квартиры посуточно, гостевые дома, коттеджи в частном секторе"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Поможем найти и забронировать жильё посуточно в Кыгызстане. Более 1 тысяч вариантов во всех популярных направлениях для путешествий: Бишкек, Наарын, Талас, Ош, Каракол"
        />
      </Helmet>
      <ScrollToTop />
      <Routing />
    </>
  );
};
