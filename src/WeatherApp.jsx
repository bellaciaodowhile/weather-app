/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL, textCapitalize, diff, getMode, getDescription, timeAnimation } from "./helpers";

export const WeatherApp = () => {

    const [search, setSearch] = useState('Ciudad Bolívar')
    const [beforeMode, setBeforeMode] = useState('')
    const [mode, setMode] = useState()
    const [timeIcon, setTimeIcon] = useState('')
    const [dataWeather, setDataWeather] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length > 0) fetchWeather();
    }
    
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    
    const fetchWeather = async () => {
        try {
            const city = textCapitalize(search);
            const res = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
            const data = await res.json();

            if (data.cod == '404') return alert('No se encuentran resultados')
            setDataWeather(data);
            
            const timeIcon = data.weather[0].icon
            const afterMode = getMode(data.weather[0].icon)

            setMode(afterMode)

            if (beforeMode != afterMode) {
                setBeforeMode(afterMode)
                if (beforeMode == '') return setTimeIcon(timeIcon)
                setTimeout(() => { setTimeIcon(timeIcon) }, 1000);
            } else {
                setTimeIcon(timeIcon)
            }

            timeAnimation(beforeMode, afterMode);
            setSearch('');

        } catch (error) {
            console.log('Ha ocurrido un error: ' + error)
        }
    }

    useEffect(()=> {
        fetchWeather();
    },[])

    return (
        <main className={`day h-full w-full relative`}>
            <div className="container py-20 m-auto px-5 md:px-32 flex flex-col items-center">
                <div className={`absolute top-0 night ${mode == 'night' ? 'night--active' : 'night--inactive'}`}></div>
                <div className="rounded-3xl card flex flex-col items-center absolute">
                    {  
                        dataWeather && (
                            <div className="flex flex-col items-center text-white">
                                <img src={`./images/${timeIcon}.webp`} alt="Icon WeatherApp" className="max-w-56 mt-5 time__img time__img--in opacity-0 h-44" />
                                <div className="flex">
                                    <p className="text-7xl sm:text-9xl font-bold numbers" dangerouslySetInnerHTML={{ __html: diff(dataWeather?.main?.temp)}}></p>
                                    <span className="text-xl mt-3 font-bold">°</span>
                                </div>
                                <h1 className="text-xs sm:text-md uppercase">{dataWeather.name}</h1>
                                <h2 className={`${mode == 'day' ? 'bg-blue-950' : 'bg-violet-500'} uppercase rounded-md text-xs px-4 py-1 mt-2`}>
                                    { getDescription(dataWeather.weather[0].description) }
                                </h2>
                            </div>
                        )
                    }
                    <form onSubmit={handleSubmit} className="flex gap-2 mt-10">
                        <input 
                        type="text" 
                        value={search}
                        onChange={handleSearch}
                        className="p-3 rounded-full w-full text-center max-w-60"
                        placeholder="Buscar localización"
                        />
                    </form>
                </div>
            </div>
        </main>
    )
}