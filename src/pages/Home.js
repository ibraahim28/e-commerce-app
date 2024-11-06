import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Card from "../components/Card";
import CardLayout from "../Layouts/CardLayout";
import Cart from "../components/Cart";

const groceryItems = [
  {
    id: 1,
    title: "Organic Tomatoes",
    price: 120,
    description: "Fresh organic tomatoes, perfect for salads and sauces.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 2,
    title: "Spinach Bunch",
    price: 80,
    description: "Leafy green spinach, rich in iron and great for smoothies.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 3,
    title: "Chicken Breast",
    price: 650,
    description: "Lean, boneless chicken breast, ideal for grilling and baking.",
    category: "Meat",
    addedToCart: false
  },
  {
    id: 4,
    title: "Beef Mince",
    price: 800,
    description: "Fresh minced beef, perfect for burgers and pasta sauces.",
    category: "Meat",
    addedToCart: false
  },
  {
    id: 5,
    title: "Brown Eggs (Dozen)",
    price: 180,
    description: "Farm-fresh brown eggs, packed with protein.",
    category: "Dairy & Eggs",
    addedToCart: false
  },
  {
    id: 6,
    title: "Milk (1 Liter)",
    price: 120,
    description: "Whole milk from grass-fed cows.",
    category: "Dairy & Eggs",
    addedToCart: false
  },
  {
    id: 7,
    title: "Fresh Carrots",
    price: 70,
    description: "Crunchy and sweet, great for snacking and cooking.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 8,
    title: "Red Apples (1 Kg)",
    price: 220,
    description: "Juicy red apples, perfect for a healthy snack.",
    category: "Fruits",
    addedToCart: false
  },
  {
    id: 9,
    title: "Bananas (Dozen)",
    price: 150,
    description: "Sweet and ripe bananas, rich in potassium.",
    category: "Fruits",
    addedToCart: false
  },
  {
    id: 10,
    title: "Broccoli",
    price: 90,
    description: "Fresh green broccoli, perfect for steaming or stir-fry.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 11,
    title: "Greek Yogurt (500g)",
    price: 300,
    description: "Thick, creamy Greek yogurt, high in protein.",
    category: "Dairy & Eggs",
    addedToCart: false
  },
  {
    id: 12,
    title: "Almond Milk (1 Liter)",
    price: 250,
    description: "Non-dairy almond milk, unsweetened and great for lactose intolerance.",
    category: "Dairy & Eggs",
    addedToCart: false
  },
  {
    id: 13,
    title: "Salmon Fillet",
    price: 1200,
    description: "Fresh salmon fillet, rich in omega-3 fatty acids.",
    category: "Meat",
    addedToCart: false
  },
  {
    id: 14,
    title: "Ground Coffee (250g)",
    price: 450,
    description: "Rich and aromatic ground coffee, perfect for a morning boost.",
    category: "Beverages",
    addedToCart: false
  },
  {
    id: 15,
    title: "Orange Juice (1 Liter)",
    price: 200,
    description: "Freshly squeezed orange juice with no added sugar.",
    category: "Beverages",
    addedToCart: false
  },
  {
    id: 16,
    title: "Basmati Rice (5 Kg)",
    price: 800,
    description: "Long-grain basmati rice, ideal for biryani and pulao.",
    category: "Grains",
    addedToCart: false
  },
  {
    id: 17,
    title: "Whole Wheat Bread",
    price: 100,
    description: "Freshly baked whole wheat bread, rich in fiber.",
    category: "Bakery",
    addedToCart: false
  },
  {
    id: 18,
    title: "Butter (200g)",
    price: 180,
    description: "Creamy salted butter, perfect for spreading and baking.",
    category: "Dairy & Eggs",
    addedToCart: false
  },
  {
    id: 19,
    title: "Cheddar Cheese (200g)",
    price: 250,
    description: "Sharp cheddar cheese, great for sandwiches and pasta.",
    category: "Dairy & Eggs",
    addedToCart: false
  },
  {
    id: 20,
    title: "Bell Peppers (1 Kg)",
    price: 180,
    description: "Mixed bell peppers - red, yellow, and green - ideal for stir-fries.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 21,
    title: "Whole Chicken",
    price: 900,
    description: "Fresh whole chicken, ideal for roasting or grilling.",
    category: "Meat",
    addedToCart: false
  },
  {
    id: 22,
    title: "Grapes (1 Kg)",
    price: 300,
    description: "Sweet, seedless grapes, perfect for snacking.",
    category: "Fruits",
    addedToCart: false
  },
  {
    id: 23,
    title: "Brown Rice (2 Kg)",
    price: 350,
    description: "Whole grain brown rice, rich in fiber and nutrients.",
    category: "Grains",
    addedToCart: false
  },
  {
    id: 24,
    title: "Oats (1 Kg)",
    price: 400,
    description: "Rolled oats, perfect for breakfast and baking.",
    category: "Grains",
    addedToCart: false
  },
  {
    id: 25,
    title: "Cucumber (1 Kg)",
    price: 60,
    description: "Fresh cucumbers, great for salads and refreshing snacks.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 26,
    title: "Shrimp (500g)",
    price: 1200,
    description: "Fresh shrimp, perfect for seafood dishes.",
    category: "Meat",
    addedToCart: false
  },
  {
    id: 27,
    title: "Green Beans (500g)",
    price: 75,
    description: "Crisp green beans, ideal for steaming or stir-frying.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 28,
    title: "Sweet Potatoes (1 Kg)",
    price: 150,
    description: "Nutritious and naturally sweet, great for baking and mashing.",
    category: "Vegetables",
    addedToCart: false
  },
  {
    id: 29,
    title: "Lentils (1 Kg)",
    price: 180,
    description: "High-protein lentils, perfect for soups and stews.",
    category: "Grains",
    addedToCart: false
  },
  {
    id: 30,
    title: "Olive Oil (500ml)",
    price: 600,
    description: "Extra virgin olive oil, ideal for cooking and salads.",
    category: "Condiments & Oils",
    addedToCart: false
  }
];


const Home = ({isCartOpen,setIsCartOpen, toggleCart}) => {
  const [cart, setCart] = useState([])
 
  return (
    <>
      
      <HeroSection />
      <CardLayout cart = {cart} setCart= {setCart} data={groceryItems} />
      <Cart cart={cart} setCart={setCart} isOpen ={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default Home;
