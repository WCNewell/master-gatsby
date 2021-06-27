export default {
  // Computer title
  name: 'pizza',
  // Visible title
  title: 'Pizzas',
  type: 'document',
  icon: () => '🍕',
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
  ],
};
