import { Milonga } from 'next/font/google';
import { themeParks } from './themeparks';
import { motion } from 'framer-motion';

const milongaFont = Milonga({
  weight: '400',
  subsets: ['latin'],
});

 const fadeInUp = {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: "easeOut" },
            viewport: { once: true, margin: "-100px" }
        };

export default function Explainer() {
  return (
    <div
      id="info"
      className="min-h-screen bg-repeat-y animate-gradient-vertical"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #CFE8D2, #F4F9F3, #CFE8D2)',
        backgroundSize: '100% 300%',
        backgroundRepeat: 'repeat-y',
      }}
    >
      <div className="w-full flex justify-center py-[50px]">
        <h1
          className={`${milongaFont.className} text-5xl sm:text-7xl md:text-[90px] text-main-500 text-center m-4 sm:m-10`}
        >
          Welkom bij Kompas!
        </h1>
      </div>

      <div className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col h-full justify-between gap-6">
          <motion.div  {...fadeInUp} className="liquid-glass rounded-[16px] shadow-sm p-6">
            <h2 className={`${milongaFont.className} text-xl md:text-2xl font-bold text-main-500 mb-3`}>
              Altijd op de hoogte van de wachttijden!
            </h2>
            <p className="text-md text-main-700">
              Met Kompas zie je in één oogopslag de actuele wachttijden van attracties in parken verspreid
              over heel Europa. Of je nu een dagje uit plant of ter plekke staat in de rij — wij geven je
              realtime informatie in een overzichtelijke en gebruiksvriendelijke interface. Geen verrassingen
              meer, alleen maar slim plannen en meer plezier uit je parkbezoek halen!
              <br />
            </p>
            <br />
            <h2 className={`${milongaFont.className} text-xl md:text-2xl font-bold text-main-500 mb-3`}>
              Update: Versie 1.1
            </h2>
            <p>
              Kompas versie 1.1, visuele, en praktische verbeteringen.
              <br />
              <br />
              Dit is er nieuw:
              <br />
              Openingstijden widget toegevoegd
              <br />
              UI verbeteringen
              <br />
              Animaties toegevoegd
              <br />
            </p>
          </motion.div>

          <motion.div  {...fadeInUp} className="liquid-glass rounded-[16px] shadow-sm p-6">
            <h2 className={`${milongaFont.className} text-xl md:text-2xl font-bold text-main-500 mb-3`}>
              Hoe werkt Kompas?
            </h2>
            <p className="text-md text-main-700">
              Kompas verzamelt actuele wachttijden van attractieparken verspreid over heel Europa en zet deze
              in een overzichtelijke pagina. Zo kun je snel zien waar het druk is en waar niet. De gegevens
              worden real-time opgehaald via de API's van{' '}
              <a
                href="https://themeparks.wiki/"
                target="_blank"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Themeparks Wiki
              </a>
              .
            </p>
          </motion.div>
        </div>

        <motion.div  {...fadeInUp}  className="liquid-glass h-[100%] rounded-[16px] shadow-sm p-6">
          <h2 className={`${milongaFont.className} text-3xl md:text-4xl font-bold text-main-500 mb-3`}>
            Ondersteunde parken
          </h2>
          <p className="text-xl text-main-700 mt-[30px]">
            Kompas ondersteund de volgende parken:
          </p>
          <div className="h-[450px] overflow-y-scroll bg-main-400/30 inset-shadow-sm p-4 rounded-xl mt-[30px]">
            {themeParks.map((park) => (
              <li key={park.id} className="mb-1">
                <a href={park.id} className="text-main-500 text-xl hover:underline">
                  {park.name}
                </a>
              </li>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full flex justify-center p-4 mt-8">
        <a
          href="#top"
          className="text-main-500 hover:text-main-600 transition-colors duration-300"
        >
          Terug naar boven
        </a>
      </div>
    </div>
  );
}
