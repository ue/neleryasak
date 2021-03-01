import Head from 'next/head';
import { useState } from 'react';
import TurkeyMap from './map';
import { data } from '../data';
import Select from 'react-select';
import AdSense from 'react-adsense';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState({
    id: 'Istanbul',
    riskValue: 4,
    name: 'Istanbul',
  });
  const mappedData = data.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? '#fff' : '#333',
      padding: 10,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontWeight: 'bold',
      cursor: 'pointer',
    }),
    control: () => ({
      border: '3px solid #0070f3',
      borderRadius: '10px',
      display: 'flex',
      color: '#333',
      fontWeight: 'bold',
    }),
  };

  return (
    <div className="container">
      <Head>
        <title>Neler Yasak?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Yeni tedbirler neler? Hafta içi ve hafta sonu yasakları hangi sehir icin serbest? Restoranlar hangi sehirler icin acildi. Hangi saatler arasinda sokaga cikmak serbest?"
        />
        <meta property="og:url" content="https://www.neleryasak.com" />
        <meta
          property="og:title"
          content="Hangi şehir için hangi yasaklar kalkti?"
        />
        <meta
          property="og:description"
          content="Yeni tedbirler neler? Hafta içi ve hafta sonu yasakları hangi sehir icin serbest? Restoranlar hangi sehirler icin acildi. Hangi saatler arasinda sokaga cikmak serbest?"
        />
        <meta property="og:site_name" content="Neler Yasak?" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/photoai-92d2a.appspot.com/o/photoAI%2FScreen%20Shot%202021-03-02%20at%2000.30.21.png?alt=media&token=6c9c9202-67b8-48d2-881d-6e4058a69f6c"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@neleryasak" />
        <meta
          property="twitter:title"
          content="Hangi şehir için hangi yasaklar kalkti?"
        />
        <meta
          property="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/photoai-92d2a.appspot.com/o/photoAI%2FScreen%20Shot%202021-03-02%20at%2000.30.21.png?alt=media&token=6c9c9202-67b8-48d2-881d-6e4058a69f6c"
        />
        <meta
          property="twitter:description"
          content="Yeni tedbirler neler? Hafta içi ve hafta sonu yasakları hangi sehir icin serbest? Restoranlar hangi sehirler icin acildi. Hangi saatler arasinda sokaga cikmak serbest?"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="keywords"
          content="neler yasak,korona,yeni tedbirler,tedbirler,hafta sonu sokaga cikma, hafta sonu, restorantlar acik mi, Korona virüsü yasaklari,kısıtlamalar,yeni normallesme,normallesme sureci, okullar acildi,neler yasak,neleryasak,korona yasakalri,dugun serbest,"
        />

        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <script
          data-ad-client="ca-pub-6892073554958359"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>

      <main>
        <h1 className="title">
          <a href="https://neleryasak.com">neleryasak.com'a</a> hosgeldin! 👋
        </h1>

        <p className="description">
          Yaşadığınız şehri seçebilir ve neler yasak öğrenebilirsin.👇
        </p>

        <TurkeyMap
          customStyle={{ idleColor: '#444', hoverColor: '#dc3522' }}
          onHover={(item) => {
            setSelectedItem(item);
            console.log(item);
            console.log(item.riskValue);
          }}
        />
        <span>veya</span>

        <div className="select-wrapper">
          <Select
            styles={customStyles}
            options={mappedData}
            placeholder="Iller"
            value={{ value: selectedItem?.id, label: selectedItem?.name }}
            onChange={(selectedItem) => setSelectedItem(selectedItem)}
          />
        </div>

        <div className="selected-city-title">
          <span className="selected-city">{selectedItem?.name}</span> için neler
          yasak?
        </div>

        <div className="content">
          <div className="item">
            <span className="item-title">Hafta sonu sokağa çıkmak:</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? 'Pazar Yasak 🚫'
                  : 'Serbest ✅'
                : '-'}
            </span>
          </div>
          <div className="item">
            <span className="item-title">Aksam sokaga sokağa çıkmak:</span>{' '}
            <span className="result">Yasak 🚫</span>
          </div>
          <div className="item">
            <span className="item-title">+65 ve 20 Yas:</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? 'Gevşetilecek 🚫'
                  : 'Serbest ✅'
                : '-'}
            </span>
          </div>
          <div className="item">
            <span className="item-title">Okul oncesi</span>{' '}
            <span className="result">Açık ✅</span>
          </div>
          <div className="item">
            <span className="item-title">Ilkokul</span>{' '}
            <span className="result">Açık ✅</span>
          </div>
          <div className="item">
            <span className="item-title">8, ve 12. siniflar</span>{' '}
            <span className="result">Açık ✅</span>
          </div>
          <div className="item">
            <span className="item-title">Ortaokullar</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? 'Kapalı 🚫'
                  : 'Açık ✅'
                : '-'}
            </span>
          </div>

          <div className="item">
            <span className="item-title">Ortaokullar</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? 'Yüz yüze sınav 🚫'
                  : 'Açık ✅'
                : '-'}
            </span>
          </div>

          <div className="item">
            <span className="item-title">Restoranlar</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5
                  ? 'Kapalı 🚫'
                  : '07:00 - 19:00 Arası açık ✅'
                : '-'}
            </span>
          </div>

          <div className="item">
            <span className="item-title">Hali saha, havuzlar</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? 'Kapalı 🚫'
                  : '09:00 - 19:00 Arası açık ✅'
                : '-'}
            </span>
          </div>

          <div className="item">
            <span className="item-title">Kamu</span>{' '}
            <span className="result">Normal ✅</span>
          </div>

          <div className="item">
            <span className="item-title">Nikah</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? '50 kisiye kadar 1 saat ✅'
                  : '100 kisiye kadar 1 saat ✅'
                : '-'}
            </span>
          </div>

          <AdSense.Google client="ca-pub-6892073554958359" slot="7806394673" />
          <div className="mark">neleryasak.com</div>
        </div>
      </main>

      <footer>
        <a
          href="https://twitter.com/ugurerdal"
          className="footer-text"
          target="_blank"
          rel="noopener noreferrer">
          Ugur Erdal
        </a>
      </footer>

      <style jsx>{`
        .content {
          border: 3px solid #000;
          border-radius: 14px;
          padding: 10px 3px;
          margin: 5px;
        }
        .selected-city-title {
          margin-bottom: 30px;
          font-size: 1em;
          font-weight: bold;
        }
        .selected-city {
          color: #0070f3;
        }
        .mark {
          text-align: center;
          margin-top: 30px;
          font-weight: bold;
          color: #0070f3;
          opacity: 0.5;
        }
        .item-title {
          font-weight: bold;
          margin: 5px;
          color: #0070f3;
        }
        .select-wrapper {
          width: 300px;
          margin: 30px;
        }
        .result {
          font-size: 18px;
          color: #000;
          font-weight: bold;
        }
        .item {
          margin: 10px;
        }
        .footer-text {
          font-weight: bold;
        }
        .container {
          min-height: 100vw;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: calc(0.75em + 3vmin);
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: calc(0.75em + 1vmin);
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        #svg-turkiye-haritasi {
          width: 100vw !important;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: nunito;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
