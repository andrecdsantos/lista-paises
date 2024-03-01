import Image from "next/image"
import Link from "next/link"


const CountryCard = ( {name, ptName, flag, flagAlt} : {name: string, ptName: string, flag: string, flagAlt: string}) => {
  return (
    <Link href={`/pais/${name}`}>
                    <article
                        className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 
                      hover:shadow-lg transition-all"
                        key={name}
                    >
                        <div className="relative w-full h-40 p-2 overflow-hidden rounded-lg">
                            {/* relative para o fill funcionar, overflow-hidden para o pegar o rounded  */}
                            <Image
                                src={flag}
                                alt={`bandeira de ${flagAlt}`}
                                fill
                                className="object-cover"
                            />{' '}
                            {/* fill ocupa todo espaco do elemento pai relative */}
                        </div>
                        <p className="font-bold text-center text-xl mt-1">
                            {ptName}
                        </p>
                    </article>
                </Link>
  )
}

export default CountryCard