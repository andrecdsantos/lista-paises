import CountryCard from './components/country-card';

export type Country = {
    name: {
        common: string;
    };

    translations: {
        por: {
            common: string;
        };
    };

    flags: {
        svg: string;
        alt: string;
    };

    capital: string;
    region: string;
    subregion: string;
    population: number;
    languages: {
        [key: string]: string;
    }

    borders?: string[];
    cca3: string;
};

async function getCountries(): Promise<Country[]> {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json()
    const sortedResponse = data.sort((a,b)=> a.translations.por.common.localeCompare(b.translations.por.common))
    return sortedResponse
}

export default async function Home() {
    const countries = await getCountries();
    //console.log(countries);
    return (
        <section className="container grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 w-full gap-2 mt-16">
            {countries.map((country) => (
                <CountryCard 
                    key={country.name.common} 
                    name={country.name.common} 
                    ptName={country.translations.por.common} 
                    flag={country.flags.svg} 
                    flagAlt={country.flags.alt}
                />
            ))}
        </section>
    );
}
