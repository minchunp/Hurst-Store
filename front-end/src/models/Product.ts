import { Database } from './../Database';

let DB = new Database();
export class Product {
   static delete(id: string | import("qs").ParsedQs | string[] | import("qs").ParsedQs[] | undefined) {
      throw new Error("Method not implemented.");
   }
   public _id?: string;
   protected cate_id?: string;
   public name_pro?: string;
   public price_pro?: number;
   public sale_pro?: number;
   public image_pro?: string;
   public trending_pro?: "1" | "0";
   public description_pro?: string;
   public quantity_pro: number = 0;
   public size_pro: string = "";

   public constructor(
      name_pro?: string,
      price_pro?: number,
      sale_pro?: number,
      image_pro?: string,
      trending_pro?: "1" | "0",
      description_pro?: string
   ) {
     this.name_pro = name_pro;
     this.price_pro = price_pro;
     this.sale_pro = sale_pro;
     this.image_pro = image_pro;
     this.trending_pro = trending_pro;
     this.description_pro = description_pro;
   }

   public copy(product: Product) {
      this._id = product._id;
      this.cate_id = product.cate_id;
      this.name_pro = product.name_pro;
      this.price_pro = product.price_pro;
      this.sale_pro = product.sale_pro;
      this.image_pro = product.image_pro;
      this.trending_pro = product.trending_pro;
      this.description_pro = product.description_pro;
   }

   // Method
   public static async getProductLists() {
      return await DB.getData(`/product-api/getProductLists`);
      // return await DB.getData(`/products`);
   }

   public static async getAllByTrending(trending_pro: "1" | "0") {
      return await DB.getData(`/product-api/getByTrending?trending_pro=${trending_pro}`);
      // return await DB.getData(`/products?trending_pro=${trending_pro}`);
   }

   public static async getById(id: string) {
      return await DB.getData(`/product-api/getById?id=${id}`);
   }

   public static async getByPrice() {
      return await DB.getData(`/product-api/getListByPrice`);
   }

   public async getDetail() {
      let data = await DB.getData(`/product-api/getById?id=${this._id}`);

      this.name_pro = data.name_pro;
      this.price_pro = data.price_pro;
      this.sale_pro = data.sale_pro;
      this.image_pro = data.image_pro;
      this.trending_pro = data.trending_pro;
      this.description_pro = data.description_pro;
   }

   public async update() {
      return await DB.updateData<Product>(`/product-api/updateProduct`, this);
   }

   public async add() {
      return await DB.insertData<Product>(`/product-api/addProduct`, this);
   }

   public async delete() {
      return await DB.deleteData<Product>(`/product-api/deleteProduct`, this);
   }
}
