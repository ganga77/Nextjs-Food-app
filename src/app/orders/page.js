'use client'
import { useState, useEffect } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/orders')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            });
    }, []);

    return (
        <div className="bg-gray-100 p-4">
            {orders.map(order => (
                <div key={order._id} className="bg-white p-4 rounded shadow mb-4">
                    {order.orderNames.map(od => (
                        <div key={od._id}>
                            <h3 className="text-lg font-bold">Order Number: {od._id}</h3>
                            <h4 className="text-lg font-semibold">Order Name: {od.name}</h4>
                            <h4 className="text-lg font-semibold">Toppings: </h4>
                            {od.extraIngredients.map((o, idx) => (
                                <div key={o._id} className="pl-4">
                                    {o.name}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}