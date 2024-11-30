import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [menu, setMenu] = useState([]);
	const [order, setOrder] = useState([]);
	const [orderHistory, setOrderHistory] = useState([]);
	const [total, setTotal] = useState(0);

	// Fetch menu from backend
	useEffect(() => {
		axios.get("http://localhost:5000/api/menu").then((response) => {
			setMenu(response.data);
		});
	}, []);

	// Fetch order history
	useEffect(() => {
		axios.get("http://localhost:5000/api/orders").then((response) => {
			setOrderHistory(response.data);
		});
	}, []);

	// Add item to the order
	const addToOrder = (item) => {
		setOrder([...order, item]);
		setTotal(total + item.price);
	};

	// Confirm the order
	const confirmOrder = () => {
		axios
			.post("http://localhost:5000/api/order", { items: order, total })
			.then((response) => {
				setOrder([]);
				setTotal(0);
				setOrderHistory([...orderHistory, response.data.order]);
			});
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Order Management</h1>

			{/* Menu Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{menu.map((item) => (
					<div key={item.id} className="border p-4 rounded-lg">
						<h2 className="text-xl font-semibold">{item.name}</h2>
						<p>₹{item.price.toFixed(2)}</p>
						<button
							className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
							onClick={() => addToOrder(item)}
						>
							Add to Order
						</button>
					</div>
				))}
			</div>

			{/* Current Order */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Current Order</h2>
				{order.length === 0 ? (
					<p>No items in order.</p>
				) : (
					<ul>
						{order.map((item, index) => (
							<li key={index}>
								{item.name} - ₹{item.price.toFixed(2)}
							</li>
						))}
					</ul>
				)}
				<p className="font-bold mt-4">Total: ₹{total.toFixed(2)}</p>
				<button
					className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
					onClick={confirmOrder}
				>
					Confirm Order
				</button>
			</div>

			{/* Order History */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Order History</h2>
				{orderHistory.length === 0 ? (
					<p>No past orders.</p>
				) : (
					<ul>
						{orderHistory.map((order) => (
							<li key={order.id}>
								Order #{order.id} - ₹{order.total.toFixed(2)} on{" "}
								{new Date(order.timestamp).toLocaleString()} for{" "}
								{order.items.length} items.
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
