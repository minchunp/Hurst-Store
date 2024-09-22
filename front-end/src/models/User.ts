import { Database } from "../Database";
import { Order } from "./Order";

let DB = new Database();
export class User {
   public _id?: string;
   public name_user?: string;
   public email_user?: string;
   public pass_user?: string;
   protected image_user?: string;
   public role_user?: "Admin" | "User";

   public constructor(
      email_user?: string,
      pass_user?: string,
      name_user?: string,
      role_user?: "Admin" | "User",
   ) {
      this.email_user = email_user;
      this.pass_user = pass_user;
      this.name_user = name_user;
      this.role_user = role_user;
   }

   // Method
   public async login() {
      let data = await DB.getData(`/user-api/getUserByEmailAndPass?email_user=${this.email_user}&pass_user=${this.pass_user}`);
      console.log(data);
      
      if (data.length == 1) {
         // Đăng nhập thành công
         this._id = data[0]._id;
         this.name_user = data[0].name_user;
         this.role_user = data[0].role_user;
         return true;
      } else {
         // Đăng nhập thất bại
         return false;
      }
   }

   public async register() {
      let data = await DB.insertData<User>(`/user-api/addUser`, this);
      return data.status;
       // Kiểm tra xem có 'id' trong data không
   }

   public static async getUserById(id_user: string) {
      return await DB.getData(`/user-api/getUserById?id=${id_user}`);
   }

   public static async getUserLists() {
      return await DB.getData(`/user-api/getUserLists`);
   }

   public async add() {
      return await DB.insertData<User>(`/user-api/addUser`, this);
   }

   public async update() {
      return await DB.updateData<User>(`/user-api/updateUser`, this);
   }

   public async delete() {
      return await DB.deleteData<User>(`/user-api/deleteUser`, this);
   }

   public async getDetail() {
      let data = await DB.getData(`/user-api/getUserById?id=${this._id}`);

      this.email_user = data.email_user;
      this.pass_user = data.pass_user;
      this.name_user = data.name_user;
      this.role_user = data.role_user;
   }
}
