import { useEffect, useState } from "react";
import styled from "styled-components"

import {Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
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
        <Splide 
        options={{perPage:4,
        arrows:false,
        pagination:false,
        drag:'free',
        gap: '3rem' }}>
        {
            
            popular.map((recipe) =>{
                return(
                  <SplideSlide>
                    <Card key={recipe.id}>
                    <p>{recipe.title} </p>
                    <img src={recipe.image} alt={recipe.title} />
                    </Card>
                    </SplideSlide>
                );
            })

        }
        </Splide>
    </Wraper>
  )

  
}

const Wraper = styled.div`
  margin: 4rem 0rem;
  `;

const Card = styled.div`
  min-height: 25rem ;
  border-radius: 2rem;
  overflow:hidden;
  position: relative;

  img {
    border-radius: 2rem !important;
    positio,:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;
    
  }

  p{
    position:absolute;
    z-index:10;y
    left:50%;
    bottom:0%;
  }

  `;

export default Popular