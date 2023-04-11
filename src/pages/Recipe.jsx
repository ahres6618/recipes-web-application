import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"

function Recipe() {
   let Params =useParams();
   const [details, setdetails]= useState({})
   const [activetab, setActivetab]=useState('instructions');

  const fetchedDetails = async () =>{
    const data= await fetch(`https://api.spoonacular.com/recipes/${Params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`).then((response) => response.json())
    .then((datadetails) => {
        console.log(datadetails)
        setdetails(datadetails);
    });
    
    

} 

useEffect(()=>{
   fetchedDetails();
   
   console.log("----"+details.title)

  },[Params.name]);
  
  return (
    
    <Deatailwraper>
        <h2>{details.title}</h2>
        <div><img src={details.image} alt=""/></div>
         <Info>
            <Button className={activetab==='instructions'? 'active':''} onClick={()=>{setActivetab('instructions')}}>Instruction</Button>
            <Button className={activetab==='ingredients'? 'active':''} onClick={()=>{setActivetab('ingredients')}}>Ingridients</Button>
           {activetab==='instructions' &&
           ( <div>
           <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
           <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
           
           </div>)}

           {activetab==='ingredients' &&
          (<ul>
            {details.extendedIngredients.map((ingredient)=>{
             return <li key={ingredient.id}>{ingredient.original}</li>
                 
            })
            }
           </ul>)}
         </Info>
    </Deatailwraper>
  )
}

const Deatailwraper= styled.div`
margin-top: 10rem;
margin-bottom:5rem;
display:flex;

img{
    width:60%;
}
h2{
    margin-bottom:2rem;
}
li{
    font-size:1.2rem;
    line-height:2.5rem;
}
ul{
    margin-top:2rem;
}
.active{
    background:linear-gradient(35deg,#494949,#313131);
}
`

const Button= styled.button`
padding:2rem;
color:#313131;
background:white;
border:2px solid black;
margin-right:2rem;
font-weight:600;
`
const Info= styled.div`
margin-left:10rem;
`
export default Recipe