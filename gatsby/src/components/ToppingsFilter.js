import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function countPizzasInToppings(pizzas) {
  return pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      
      // if it is, increment by 1
      if(existingTopping) {
        existingTopping.count += ;1
      }
      // otherwise create a new entry in our acc and set it to one
      acc[topping.id] = {
        id: topping.id,
        name: topping.name,
        count: 1
      }
      return acc;
    }, {})
}

export default function ToppingsFilter() {
  // Get a list of the toppings
  // Get a list of all the pizzas and their topings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  console.clear();
  console.log(toppings, pizzas);
  // Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts);

  // Loop over the list of toppings and display the topping and the count of pizzas in that toping
  // Link it up ...

  return (
    <div>
      <p>Toppings</p>
    </div>
  );
}
