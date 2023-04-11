import { useEffect, useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

import {Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
function Vegie() {
  const [vegie, setVegie] = useState([])

 

  useEffect(()=>{
    getVegie();
  },[]);

  
  const getVegie = async () =>{

   const check = localStorage.getItem('vegie')

   if(check){
    setVegie(JSON.parse(check));
   }else{
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
    const data = await api.json();
    localStorage.setItem('vegie', JSON.stringify(data.recipes));
    setVegie(data.recipes)
   }
   
   
  }
  return  (
    
    <Wraper>
        <h3>Our vegetarian picks</h3>
        <Splide 
        options={{perPage:3,
        arrows:false,
        pagination:false,
        drag:'free',
        gap: '3rem' }}>
        {
            
            vegie.map((recipe) =>{
                return(
                  <SplideSlide>
                    <Card key={recipe.id}>
                    <Link to={"/recipe/"+recipe.id}>
                    <p>{recipe.title} </p>
                    <Gradient />
                    <img src={recipe.image} alt={recipe.title} />
                    </Link>
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
  max-height: 25rem ;
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
    z-index:10;
    left:50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  `;
  const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0));
  `;
export default Vegie