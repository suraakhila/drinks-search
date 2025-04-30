import React ,{useEffect, useState} from 'react';

import "./index.css"
const SampleuseEffect1 = () => {
  const[searchname,setsearchname]=useState("");
  const[userdata,setdata]=useState([]);
  const[isError,seterror]=useState({status:false,msg:""
  });
  const[loading,setloading]=useState(false);
  const url="https://www.thecocktaildb.com/api/json/v1/1";
 const dataFetch=  async (url)=>{
  try{
    setloading(true);
    const response=await fetch(url);
    const {drinks}=await response.json();
    if(drinks==null)
      throw new Error("data not found");
    setdata(drinks);
    setloading(false);
    seterror({status:false,msg:""});
  }
  catch(e){
    console.log(e+"akhila");
    setloading(false);
    seterror({status:true,msg:e.message||"Error while fetching data"});

  }
}
useEffect(()=>{
  const newurl=`${url}/search.php?s=l`;
  dataFetch(newurl)}
  ,[])
 useEffect(()=>{
  if(searchname.trim()===""){
    dataFetch(`${url}/search.php?s=l`);
  }else{
  const newurl=`${url}/search.php?s=${searchname}`;
  dataFetch(newurl)}
},[searchname])
  if(loading)
    return<h2>loading...</h2>
  if(isError.status)
    return<h3 style={{color:"chocolate"}}>{isError.msg}</h3>;
  return (
    <div>
      <form><input name="search" id="search" placeholder="Enter the item" value={searchname} onChange={(e)=>setsearchname(e.target.value)}/></form>
      <ul className='drinksList'>
        {userdata.map((eachObj)=>{
          return (<li key={eachObj.idDrink}><div><img src={eachObj.strDrinkThumb} alt="error"/> </div><div><h4>{eachObj.strDrink}</h4></div></li>);
        }
        )}
      </ul>
      <footer
  style={{
    position:'sticky',
    bottom:0,
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#f1f1f1',
    color: '#333',
    fontSize: '14px',
    borderTop: '1px solid #ccc',
    marginTop: 'auto',
  }}
>
  Copyright © {new Date().getFullYear()} by Sura Akhila | All Rights Reserved.
</footer>
    </div>
  )
}
export default SampleuseEffect1;
