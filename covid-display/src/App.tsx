import { Global, css } from "@emotion/react";
import { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import CountryList from "./components/CounrtyList";
import GlobalInfo from "./components/GlobalInfo";
import type { ResponseData, Country } from './types'

const App: React.FunctionComponent = () => {
  const [data, setData] = useState<ResponseData | undefined>(undefined);
  const [activeCountries, setActiveCountries] = useState<Country[]>([]);

  const fetchData = async () => {
    const result = await fetch('https://api.covid19api.com/summary');
    const data: ResponseData = await result.json();

    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onCountryClick = (country: Country) => {
    const conutryIndex = activeCountries.findIndex(
      (activeCountry) => activeCountry.ID === country.ID
    );

    if(conutryIndex>-1){
      const newActiveCountries = [...activeCountries];
      newActiveCountries.splice(conutryIndex);
      setActiveCountries(newActiveCountries);
    }else{
      setActiveCountries([...activeCountries, country]);
    }
  };

  return (
    <div className="App">
      <Global styles={css`
        body{
          background-color: #f1f1f1;
          color: #7d7d7d;
        }
      `} />

      {/* {activeCountries.map((aCountry) => (<span>{aCountry.Country}</span>))} */}

      {data ? (
        <>
          <GlobalInfo
            newConfirmed={data?.Global.NewConfirmed}
            newDeaths={data?.Global.NewDeaths}
            newRecovered={data?.Global.NewRecovered}
          />

          <hr/>
          <BarChart countries={activeCountries}/>

          <CountryList countries={data.Countries} onItemClick={onCountryClick} />
        </>
      ) : (
        "Loading..."
      )
      }
    </div>
  );
};

export default App;
