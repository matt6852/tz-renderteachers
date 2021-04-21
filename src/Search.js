import React from "react";
import { useGlobalContext } from "./Context";


const Search = () => {
  const {
    cities,
    subjects,
    handleCity,
    districts,
    handleSubmit,
    handleSubjects,
    handleDistricts,
    startLoading,
    district,
  } = useGlobalContext();
  

  return (
    <>
      <div className="dropdown">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <select
            className="form-item"
            name="subject"
            onChange={(e) => handleSubjects(e.target.value)}
            required
          >
            <option defaultValue>Укажите предмет</option>
            {subjects.map((subject) => {
              const { name, id } = subject;
              return (
                <option key={id} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <select
            className="form-item"
            name="cities"
            onChange={(e) => handleCity(e.target.value)}
            required
          >
            <option defaultValue>Укажите город</option>
            {cities.map((city) => {
              const { cityName, id } = city;
              return (
                <option key={id} value={cityName}>
                  {cityName}
                </option>
              );
            })}
          </select>
          <select
            className="form-item"
            name="district"
            onChange={(e) => handleDistricts(e.target.value)}
            required
          >
            <option defaultValue>Укажите район</option>
            {}
            {districts.map((district) => {
              const { verbatimName, id } = district;
              return (
                <option key={id} value={verbatimName}>
                  {verbatimName}
                </option>
              );
            })}
          </select>
          <button
            disabled={!district} 
            onClick={() => startLoading}
            className="form-item-btn"
            // disabled={isLoading}
            type="submit"
          >
            Применить фильтр
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
