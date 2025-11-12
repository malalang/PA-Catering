const Products: ProductsType = [
    {
        id: 1,
        Name: "Meals",
        Image: "/Menus/BurgerMeal.png",
        Description: "Wholesome combo meals including flavorful mains, crispy sides, and refreshing drinks—perfect for any appetite.",
        Products: [
            { ProductID: "meals_001", Name: "Kota Meals", Description: ["Thrown Kota", "Chips", "Coca-Cola 440ml"], Price: 90, Image: "/Menus/KotaMeal.png", badge: "Bestseller", rating: 4.8 },
            { ProductID: "meals_002", Name: "Burger Meals", Description: ["Burger", "Chips", "Coca-Cola 440ml"], Price: 100, Image: "/Menus/BurgerMeal.png", badge: "Special", rating: 4.5 },
            { ProductID: "meals_003", Name: "Chicken Meals", Description: ["1/4 Chicken", "Bun", "Chips", "Coca-Cola 440ml"], Price: 80, Image: "/Menus/ChickenMeal.png", rating: 4.2 },
            { ProductID: "meals_004", Name: "Fish Meals", Description: ["Fish", "Chips", "Coca-Cola 440ml"], Price: 80, Image: "/Menus/FishMeal.png", badge: "New", rating: 4.0 },
        ],
    },
    {
        id: 2,
        Name: "Kota Meals",
        Image: "/Menus/KotaMeal.png",
        Description: "Our most loved Kota creations, packed with bold local flavor and hearty fillings for the ultimate street-style indulgence.",
        Products: [
            { ProductID: "kmeals_001", Name: "Smash Kota Meals", Image: "/Menus/KotaMeal.png", Description: ["Smash Kota", "Chips", "Coca-Cola 440ml"], Price: 70 },
            { ProductID: "kmeals_002", Name: "Smash Kota Single Meals", Image: "/Menus/Kota.jpg", Description: ["Smash Kota", "Chips"], Price: 70 },
            { ProductID: "kmeals_003", Name: "Double Smash Kota Meals", Image: "/Menus/KotaMeal.png", Description: ["Double Smash Kota", "Chips", "Coca-Cola 440ml"], Price: 70 },
            { ProductID: "kmeals_004", Name: "Double Smash Kota Single Meals", Image: "/Menus/Kota.jpg", Description: ["Double Smash Kota", "Chips"], Price: 70 },
            { ProductID: "kmeals_005", Name: "Thrown Kota Meals", Image: "/Menus/KotaMeal.png", Description: ["Thrown Kota", "Chips", "Coca-Cola 440ml"], Price: 70 },
            { ProductID: "kmeals_006", Name: "Thrown Kota Single Meals", Image: "/Menus/Kota.jpg", Description: ["Thrown Kota", "Chips"], Price: 70 },
        ],
    },
    {
        id: 3,
        Name: "Kota",
        Image: "/Menus/Kota.png",
        Description: "Traditional South African bread rolls stuffed with savory toppings and crunchy chips—each bite a burst of nostalgia.",
        Products: [
            { ProductID: "kota_001", Name: "Smash Kota", Image: "/Menus/Kota.png", Description: ["Bread", "Chips", "Polony", "Archaar", "Rasaian", "Egg", "Lettuce"], Price: 30 },
            { ProductID: "kota_002", Name: "Double Smash Kota", Image: "/Menus/Kota.png", Description: ["Bread", "Chips", "Polony", "Archaar", "Rasaian", "Egg", "Lettuce", "Cheese"], Price: 35 },
            { ProductID: "kota_003", Name: "Thrown Kota", Image: "/Menus/Kota.png", Description: ["Bread", "Chips", "Polony", "Archaar", "Rasaian", "Egg", "Lettuce", "Cheese", "Patty"], Price: 55 },
        ],
    },
    {
        id: 4,
        Name: "Chips",
        Image: "/Menus/Chips.png",
        Description: "Perfectly fried golden chips, available in three sizes to complement any meal or stand alone as a satisfying snack.",
        Products: [
            { ProductID: "chips_001", Name: "Small Chips", Image: "/Menus/Chips.png", Description: ["5cm × 5cm × 2.5cm Box"], Price: 25 },
            { ProductID: "chips_002", Name: "Medium Chips", Image: "/Menus/Chips.png", Description: ["5cm × 7cm × 2.5cm Box"], Price: 35 },
            { ProductID: "chips_003", Name: "Large Chips", Image: "/Menus/Chips.png", Description: ["8cm × 5cm × 3cm Box"], Price: 50 },
        ],
    },
    {
        id: 5,
        Name: "Beverages",
        Image: "/Menus/Drinks.png",
        Description: "A curated selection of cold beverages to quench your thirst—from fizzy favorites to fruity blends.",
        Products: [
            { ProductID: "bev_001", Name: "Coca-Cola", Image: "/Menus/Coca-Cola.png", Description: ["Coca-cola 1.25L", "Coca-cola 400ml"], Price: 15 },
            { ProductID: "bev_002", Name: "Mocktails", Description: ["flavour Mocktails", "flavour Mocktails", "flavour Mocktails"], Price: 40 },
            { ProductID: "bev_003", Name: "Still Water", Description: ["Still Water 500ml"], Price: 7 },
            { ProductID: "bev_004", Name: "Still Water", Description: ["Still Water 1L"], Price: 12 },
            { ProductID: "bev_005", Name: "Cappy", Image: "/Menus/Cappy.png", Description: ["Pineapple flavour"], Price: 14 },
        ],
    },
    {
        id: 6,
        Name: "Pizza",
        Image: "/Menus/mexicanChilli.png",
        Description: "Oven-baked pizzas topped with rich sauces and generous layers of cheese, meats, and veggies—crafted for flavor lovers.",
        Products: [
            { ProductID: "pizza_001", Name: "Chicken and BBQ Pizza", Description: ["A savory pizza with tender chicken and rich BBQ sauce."], Price: 85, Image: "/Menus/ChickenAndBBQ.png", badge: "Fan-favorite" },
            { ProductID: "pizza_002", Name: "Chicken and Mayo Pizza", Description: ["Creamy and delicious, topped with chicken and mayonnaise."], Price: 85, Image: "/Menus/ChickenAndMayo.png" },
            { ProductID: "pizza_003", Name: "Sweet Chilli Sausage Pizza", Description: ["A perfect blend of sweet and spicy with sausage toppings."], Price: 90, Image: "/Menus/mexicanChilli.png" },
            { ProductID: "pizza_004", Name: "Pineapple Pizza", Description: ["A tropical delight with juicy pineapple chunks."], Price: 80, Image: "/Menus/Pineapply.png" },
            { ProductID: "pizza_005", Name: "Mexican Chilli Pizza", Description: ["Spicy and flavorful, with authentic Mexican chilli."], Price: 95, Image: "/Menus/mexicanChilli.png", badge: "Spicy" },
        ],
    },
];

export default Products;
