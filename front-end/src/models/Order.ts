import { Database } from "../Database";
import { Product } from "./Product";

let DB = new Database();
export class Order {
   public _id?: string;
   public user_id?: string;
   public products?: Product[];
   public name_user?: string;
   public date_order: string;
   public total_order: number;
   public status_order: "cart" | "order" | "shipping" | "success" | "cancel";
   
   public constructor(products?: Product[], user_id?: string) {
      this.user_id = user_id;
      this.products = products;
      this.date_order = new Date().toLocaleString("sv-SE");
      this.total_order = 0;
      this.status_order = 'cart';
   }

   public copy(order: Order) {
      this._id = order._id;
      this.user_id = order.user_id;
      this.products = order.products;
      this.name_user = order.name_user;
      this.date_order = order.date_order;
      this.total_order = order.total_order;
      this.status_order = order.status_order;
   }

   public static async checkCart(user_id: string) {
      let data = (await DB.getData(`/order-api/checkCart?id_user=${user_id}`)) as Order[];
      
      if (data.length == 0) {
         // Chưa có giỏ hàng
         return false;
      } else {
         // Đã có cart -> cập nhập dữ liệu và trả về True
         return data[0];
      }
   }

   public async putInDatabase() {
      return await DB.insertData<Order>(`/order-api/addOrder`, this);
   }

   public async addProduct(product: Product) {
      if (this.products) {
         let inCart: boolean = false;  // Giả sử sản phẩm không có trong giỏ hàng
         for (const pro of this.products) {
            if (pro._id == product._id && pro.size_pro == product.size_pro) {
               inCart = true;
               pro.quantity_pro += product.quantity_pro;
               break;
            }
         }
         if (!inCart) {
            this.products.push(product);
         }
      }
      return await DB.updateData<Order>(`/order-api/updateOrder`, this);
   }

   public async update() {
      return await DB.updateData<Order>(`/order-api/updateOrder`, this);
   }

   public static async getOrderLists() {
      return await DB.getData(`/order-api/getOrderLists`);
   }

   public static async getNewOrderPending() {
      return await DB.getData(`/order-api/getNewOrderPending`);
   }

   public static async getNewOrderPendingWithLimit(limit: number = -1) {
      return await DB.getData(`/order-api/getNewOrderPendingWithLimit?limit=${limit}`);
   }

   public async sendMailToCustomer(data: Object) {
      return await DB.insertData(`/order-api/send-mail`, data);
   }

   public async getDetail() {
      let data = await DB.getData(`/order-api/getOrderById?id=${this._id}`);
      
      this.products = data.products;
      this.user_id = data.user_id;
      this.name_user = data.name_user;
      this.date_order = data.date_order;
      this.total_order = data.total_order;
      this.status_order = data.status_order;
   }
}
