import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const catalog = {
  Electronics: [
    "Wireless Mouse",
    "Gaming Keyboard",
    "Bluetooth Speaker",
    "USB-C Hub",
    "Mechanical Keyboard",
    "Webcam",
    "Laptop Stand",
    "Monitor",
    "SSD",
    "Wireless Earbuds",
    "Smart Watch",
    "Power Bank",
    "Router",
    "Microphone",
    "Graphics Tablet"
  ],

  Books: [
    "JavaScript Guide",
    "Node.js Handbook",
    "React Cookbook",
    "Python Basics",
    "Clean Code",
    "Design Patterns",
    "System Design",
    "Docker Deep Dive",
    "Kubernetes Essentials",
    "Algorithms"
  ],

  Sports: [
    "Football",
    "Basketball",
    "Cricket Bat",
    "Yoga Mat",
    "Running Shoes",
    "Skipping Rope",
    "Gym Gloves",
    "Dumbbells",
    "Resistance Band",
    "Water Bottle"
  ],

  Home: [
    "Coffee Maker",
    "Vacuum Cleaner",
    "Air Fryer",
    "Electric Kettle",
    "Mixer Grinder",
    "Ceiling Fan",
    "Dining Chair",
    "Office Desk",
    "LED Lamp",
    "Storage Box"
  ],

  Fashion: [
    "Leather Jacket",
    "Running T-Shirt",
    "Sneakers",
    "Jeans",
    "Hoodie",
    "Cap",
    "Backpack",
    "Wallet",
    "Sunglasses",
    "Formal Shirt"
  ]
};

const adjectives = [
  "Premium",
  "Portable",
  "Smart",
  "Compact",
  "Advanced",
  "Professional",
  "Gaming",
  "Wireless",
  "Modern",
  "Ultra"
];

const tags = [
  "gaming",
  "wireless",
  "portable",
  "office",
  "smart",
  "premium",
  "bluetooth",
  "usb",
  "rgb",
  "travel",
  "fitness",
  "professional",
  "audio",
  "storage",
  "computer"
];

const categories = Object.keys(catalog);

const products = [];

for (let id = 1; id <= 500; id++) {

    const category =
        faker.helpers.arrayElement(categories);

    const product =
        faker.helpers.arrayElement(
            catalog[category as keyof typeof catalog]
        );

    const adjective =
        faker.helpers.arrayElement(adjectives);

    products.push({

        id,

        name: `${adjective} ${product}`,

        description:
            faker.commerce.productDescription(),

        category,

        price:
            faker.number.int({
                min: 200,
                max: 5000
            }),

        tags:
            faker.helpers.arrayElements(tags,3)

    });

}

const outputPath = path.join(
    __dirname,
    "../data/products.json"
);

fs.writeFileSync(
    outputPath,
    JSON.stringify(products,null,2)
);

console.log(
    `Generated ${products.length} products`
);