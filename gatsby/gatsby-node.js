import path from 'path';
// import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
        clark: 'is cool',
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    console.log('Creating page for topping', topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for Topping
      },
    });
  });
  // 4. Pass topping data to pizza.js
}

// async function fetchBeersandTurnIntoNodes({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) {
//   // 1. Fetch list of beers
//   const res = await fetch('https://api.sampleapis.com/beers/ale');
//   const beers = await res.json();
//   console.log(beers);
//   // 2. Loop over each one
//   for (const beer of beers) {
//     const nodeMeta = {
//       id: createNodeId(`beer-${beer.name}`),
//       parent: null,
//       children: [],
//       internal: {
//         type: 'Beer',
//         mediaType: 'application/json',
//         contentDigest: createContentDigest(beer),
//       },
//     };
//     // 3. Create a node for that beer
//     actions.createNode({
//       ...beer,
//       ...nodeMeta,
//     });
//   }
// }

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters

  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many paiges there are based on how many slicemasterss there are, and how many per page

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${data.slicemasters.totalCount} total people. And we have 
    ${pageCount} pages with ${pageSize} per page`
  );

  // 4. Loop from 1 to n and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

// export async function sourceNodes(params) {
//   // Fetch a list of beers and source them into our gatsby api
//   await Promise.all([fetchBeersandTurnIntoNodes(params)]);
// }

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be reosolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
