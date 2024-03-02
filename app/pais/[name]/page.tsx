import { Country } from "@/app/page";
import CountryCard from "@/app/components/country-card";
import Image from "next/image";
import Link from "next/link";

/* 
async function getCountryByName(name:string): Promise<Country> {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    //const data = await response.json()
    //return data[0]
    return (await response.json())[0]
}
 */

async function getCountryByName(name: string): Promise<Country> {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries: Country[] = await response.json();
    return countries.find((country: Country)=>country.name.common === name)!;
}

async function getCountriesBorderByName(name: string) {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries: Country[] = await response.json();
    const country = countries.find(
        (country: Country)=>country.name.common === name)!;
        
    return country.borders?.map(item=> {
        const borderCountry = countries.find(result=> result.cca3 === item)!
        return {
            name: borderCountry.name.common,
            ptName: borderCountry.translations.por.common,
            flag: borderCountry.flags.svg,
            flagAlt: borderCountry.flags.alt,
        }
    })
}

const CountryPage = async ({ params: { name } }: { params: { name: string } }) => {
    //const country = await getCountryByName(name)
    const country = await getCountryByName(decodeURI(name))
    const formatter = Intl.NumberFormat("en", {notation: "compact"})//API de internacionalizacao Intl

    const borderCountries = await getCountriesBorderByName(decodeURI(name))
    //console.log(borderCountries)
    return (
        <section className="container flex flex-col">
            <h2 className="text-5xl text-center font-bold text-gray-800 my-16">{country.translations.por.common}</h2>
            <Link href={"/"} className="flex items-center py-2">
                <Image src={"/arrow-back.svg"} alt="ícone seta voltar" width={24} height={24}/>
                Voltar
            </Link>
            <article className="flex flex-col md:flex-row justify-between min-w-full min-h-48 p-10 bg-white rounded-xl">
                <section>
                    {country.capital && <p className="text-xl text-gray-800"><b>🏙️ Capital: </b> {country.capital}</p>}
                    <p className="text-xl text-gray-800"><b>🗺️ Continente: </b> {country.region} {country.subregion && ` - ${country.subregion}`}</p>
                    <p className="text-xl text-gray-800"><b>👨‍👩‍👧‍👦 População: </b> {formatter.format(country.population)}</p>
                    {/* <p className="text-xl text-gray-800"><b>🗣️ Línguas faladas: </b> {Object.values(country.languages).join(", ")}</p> */}
                    {country.languages &&  <p className="text-xl text-gray-800">
                        <b className="block">🗣️ Línguas faladas: </b> 
                        {Object.values(country.languages).map(language=> 
                            <span key={language} className="inline-block bg-indigo-700 text-white text-sm me-2 p-2 rounded-full">{language}</span>    
                        )}
                    </p>}
                </section>
                <div className="relative my-2 md:my-0 min-h-48 md:h-auto w-96 shadow-md order-first md:order-last">
                    <Image 
                        src={country.flags.svg} 
                        alt={`bandeira: ${country.flags.alt}`}
                        fill
                        className="object-cover"
                    />{/* object-cover para ocupar todo espaço da div */}
                </div>
            </article>
            <section>
                <h3 className="mt-12 text-2xl font-semibold text-gray-800">Países que fazem fronteira</h3>
                <div className="container grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                xl:grid-cols-5 w-full gap-2">
                    {borderCountries?.map(border=> 
                        <CountryCard key={border.name} {...border}/>
                    )}
                </div>
            </section>
        </section>
    );
};

export default CountryPage;
