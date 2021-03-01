import Head from 'next/head';
import { useState } from 'react';
import TurkeyMap from './map';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <h1 className="title">
          <a href="https://neleryasak.com">neleryasak.com'a</a> hosgeldin! 👋
        </h1>

        <p className="description">
          Yasadiginiz sehri secebilir, neler yasak ogrenebilirsin. 👇
        </p>

        <TurkeyMap
          customStyle={{ idleColor: '#444', hoverColor: '#dc3522' }}
          onHover={(item) => {
            setSelectedItem(item);
            console.log(item);
            console.log(item.riskValue);
          }}
        />

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
                  ? 'Gevsetilecek 🚫'
                  : 'Serbest ✅'
                : '-'}
            </span>
          </div>
          <div className="item">
            <span className="item-title">Okul oncesi</span>{' '}
            <span className="result">Acik ✅</span>
          </div>
          <div className="item">
            <span className="item-title">Ilkokul</span>{' '}
            <span className="result">Acik ✅</span>
          </div>
          <div className="item">
            <span className="item-title">8, ve 12. siniflar</span>{' '}
            <span className="result">Acik ✅</span>
          </div>
          <div className="item">
            <span className="item-title">Ortaokullar</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? 'Kapali 🚫'
                  : 'Acik ✅'
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
            <span className="item-title">Restoran/cafe vs.</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5
                  ? 'Kapali 🚫'
                  : '07:00 - 19:00 Arasi açık ✅'
                : '-'}
            </span>
          </div>

          <div className="item">
            <span className="item-title">Hali saha, havuzlar</span>{' '}
            <span className="result">
              {selectedItem
                ? selectedItem?.riskValue === 5 || selectedItem?.riskValue === 4
                  ? 'Kapali 🚫'
                  : '09:00 - 19:00 Arasi açık ✅'
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
          padding: 17px;
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
          justify-content: center;
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
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
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
