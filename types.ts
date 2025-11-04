export enum OrderStatus {
  RECEIVED = 'ได้รับออเดอร์แล้ว',
  PREPARING = 'กำลังเตรียม',
  READY = 'พร้อมรับ',
  COMPLETED = 'เสร็จสิ้น'
}

export enum View {
  MENU = 'menu',
  CART = 'cart',
  TRACKER = 'tracker'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'เครื่องดื่ม' | 'ของหวาน';
  imageUrl: string;
  temperatureOptions?: ('ร้อน' | 'เย็น')[];
  sweetnessOptions?: string[];
}

export interface CartItem extends MenuItem {
  cartItemId: string; // Unique ID for this specific cart entry (e.g., itemID-hot-50sweet)
  quantity: number;
  selectedTemperature?: 'ร้อน' | 'เย็น';
  selectedSweetness?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: Date;
  userId?: string; // For future LINE integration
}