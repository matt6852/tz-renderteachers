import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [subject, setSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [teachersIds, setTeachersIds] = useState([]);
  const [url, setUrl] = useState(null);
  const [listOfTeachers, setListOfTeahers] = useState([]);
  const [page, setPage] = useState(10);
  const [start, setStart] = useState(0);
  const [subjectName, setsubjectName] = useState("");
  

  const handleCity = (name) => {
    const selected = cities.filter((city) => city.cityName === name);
    const { id } = selected[0];
    setCity(id);
  };
  const handleSubjects = (str) => {
    const selected = subjects.filter((subject) => subject.name === str);
    const { id } = selected[0];
    const { name } = selected[0];
    setsubjectName(name)
    setSubject(id);
    if(district){
         fetchIds();
    }
  };
  const handleDistricts = (name) => {
      
    const selected = districts.filter(
      (district) => district.verbatimName === name
    );
    const { id } = selected[0];
    setDistrict(id);
    fetchIds()

    
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLIstOfTeahers(url)
    setIsLoading(true)
     setStart(page);
     setPage(page + 10);

    
     
  };
  const handleapge = () => {
      setIsLoading(true)
      setStart(page);
      setPage(page + 10);
      hhtpGeneerator(teachersIds, page, start);
      
      fetchLIstOfTeahers(url)
      


    
     
  };
 

  
 

  const hhtpGeneerator = (teachersIds,page,start) => {
      setIsLoading(true)
    let url = `http://api.repetit.ru/public/teachers/short?`;
    let teenPerpage = teachersIds.slice(start,page)
    for (let i = 0; i < teenPerpage.length; i++) {
        url += `Ids=${String(teenPerpage[i])}&`;
        
    }
    setUrl(url)
   setIsLoading(false)
  };

  const fetchCities = async () => {
      
  
    const { data } = await axios.get("http://api.repetit.ru/public/areas", {
    
    });
    if (data.length > 0) {
        setCities(data);
        
        
    }
    
  };
  const fetchSubjects = async () => {
   
    const { data } = await axios.get(
      "http://api.repetit.ru/public/subjects",
      {}
    );
    if (data.length > 0) {
    
      setSubjects(data);
    }
  };
  const fetchDistricts = useCallback( async () => {
      
    const { data } = await axios.get(
      "http://api.repetit.ru/public/districts?",
      {
        params: { AreaId: city },
      }
    );
    if (data.length > 0) {
        setDistricts(data);
    
        
    }
  },[city]);
  const fetchIds = async () => {
    
    
    const { data } = await axios.get(
      "http://api.repetit.ru/public/search/teacherIds?",
      {
        params: { AreaId: city, DistrictId: district, SubjectId: subject },
      }
    );
    if (data.length > 0) {
      
      setTeachersIds(data);
    }
  };
  const fetchLIstOfTeahers = async (url) => {

    const { data } = await axios.get(url);
    if (data.length > 0) {
      
      setListOfTeahers(data)
     
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchCities();
   
  }, []);

  useEffect(() => {
    if (city) {
      fetchDistricts();
    }
  }, [city, fetchDistricts]);
  
 useEffect(()=>{
   if(teachersIds.length > 0){
       setIsLoading(false)
    hhtpGeneerator(teachersIds,page)
   }
 },[teachersIds,page,url])

 useEffect(()=>{
   if(listOfTeachers.length > 0){
       setIsLoading(false)
   }
 },[listOfTeachers])




  return (
    <AppContext.Provider
      value={{
        cities,
        subjects,
        handleCity,
        districts,
        handleSubmit,
        handleSubjects,
        handleDistricts,
        listOfTeachers,
        teachersIds,
        subjectName,
       
        
       
       
        handleapge,
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
