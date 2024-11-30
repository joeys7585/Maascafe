const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orderHistory = [];

// Mock menu data
const menu = [
	{
		id: 1,
		name: "Moong Dal Pakoda",
		price: 40,
	},
	{
		id: 2,
		name: "V. Manchurian (6pc)",
		price: 40,
	},
	{
		id: 3,
		name: "Batata Vada (2pc)",
		price: 30,
	},
	{
		id: 4,
		name: "Idli (3pc)",
		price: 40,
	},
	{
		id: 5,
		name: "Appe (6pc)",
		price: 40,
	},
	{
		id: 6,
		name: "Medu Vada (3pc)",
		price: 50,
	},
	{
		id: 7,
		name: "Dal Vada (2pc)",
		price: 20,
	},
	{
		id: 8,
		name: "Dosa (3pc)",
		price: 40,
	},
	{
		id: 9,
		name: "Chicken Cutlet (2pc)",
		price: 80,
	},
	{
		id: 10,
		name: "Chicken Spring Roll (2pc)",
		price: 60,
	},
	{
		id: 11,
		name: "Chicken 65",
		price: 120,
	},
	{
		id: 12,
		name: "Unniappam (8pc)",
		price: 40,
	},
	{
		id: 13,
		name: "Achappam (8pc)",
		price: 80,
	},
	{
		id: 14,
		name: "Kuzhalappam (8pc)",
		price: 60,
	},
	{
		id: 15,
		name: "Idli & Dosa Podi (50gm)",
		price: 20,
	},
	{
		id: 16,
		name: "Sambar Powder (50gm)",
		price: 30,
	},
];

// API to fetch menu
app.get("/api/menu", (req, res) => {
	res.json(menu);
});

// API to place order
app.post("/api/order", (req, res) => {
	const { items, total } = req.body;
	const order = { id: Date.now(), items, total, timestamp: new Date() };
	orderHistory.push(order);
	res.status(201).json({ message: "Order placed successfully", order });
});

// API to fetch order history
app.get("/api/orders", (req, res) => {
	res.json(orderHistory);
});

const PORT = 5000;
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
