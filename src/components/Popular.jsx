import { useEffect, useState } from "react";
import styled from "styled-components"


const Wraper = styled.div`
  margin: 4rem 0rem;
  `;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;

  img {
    border-radius: 2rem;}

  `;
function Popular() {
 const [popular, setPopular] = useState([])

 

  useEffect(()=>{
    getpopuler();
  },[]);

  
  const getpopuler = async () =>{
   
   const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
   const data = await api.json();
   setPopular(data.recipes)
  }



  return (
    
    <Wraper>
        <h3>Populqr picks</h3>
        {
            
            popular.map((recipe) =>{
                return(
                    
                    <Card key={recipe.id}>
                    <p>{recipe.title} </p>
                    <img src={recipe.image} alt={recipe.title} />
                    </Card>
                );
            })

        }
    </Wraper>
  )

  
}



export default Popular