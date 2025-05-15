import { Milonga } from 'next/font/google';


const milongaFont = Milonga({
  weight: '400',  
  subsets: ['latin'],
});

export default function Backup() {
    return(<div>

    <div id="info" className="bg-main-400 py-10 px-5">
      <h1
        className={`${milongaFont.className} text-[45px] font-bold text-main-500 text-center mb-10`}
      >
        Welkom bij Kompas!
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-main-300 rounded-[16px] shadow-md p-6 max-w-[600px] w-full">
          <h2 className={` ${milongaFont.className} text-2xl font-bold text-main-500 mb-3`}>
            Altijd op de hoogte van de wachttijden!
          </h2>
          <p className="text-md text-main-700">
            Met Kompas zie je in één oogopslag de actuele wachttijden van attracties in parken verspreid
            over heel Europa. Of je nu een dagje uit plant of ter plekke staat in de rij — wij geven je
            realtime informatie in een overzichtelijke en gebruiksvriendelijke interface. Geen verrassingen
            meer, alleen maar slim plannen en meer plezier uit je parkbezoek halen!
          </p>
        </div>
        

        <div className="bg-main-300 rounded-[16px] shadow-md p-6 max-w-[600px] w-full">
          <h2 className={` ${milongaFont.className} text-2xl font-bold text-main-500 mb-3`}>Hoe werkt Kompas?</h2>
          <p className="text-md text-main-700">
            Kompas verzamelt actuele wachttijden van attractieparken verspreid over heel Europa en zet deze
            in een overzichtelijke pagina. Zo kun je snel zien waar het druk is en waar niet. De gegevens
            worden real-time opgehaald via de API's van{' '}
            <a href="https://themeparks.wiki/" target="_blank" className="underline text-blue-600 hover:text-blue-800">
              Themeparks Wiki
            </a>.
          </p>
        </div>
      </div>
    </div>
    <div className="w-[100vw] bg-main-400 flex justify-center p-4">
        <a href="#top">Terug naar boven</a>
        </div>
    </div>)
}