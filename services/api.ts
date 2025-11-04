
import { Order } from '../types';

// This is a mock function. In a real application, this would be an HTTP request to your backend.
export const submitOrderToBackend = async (order: Order): Promise<{ success: boolean; orderId: string }> => {
  console.log("--- Sending Order to Backend ---");
  // The data sent here should be stored in your database
  // and be retrievable by the owner's app via an API.
  console.log(JSON.stringify(order, null, 2));
  console.log("-------------------------------");
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real scenario, the backend would generate and return the ID.
  return { success: true, orderId: order.id };
}
