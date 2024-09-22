import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
export class PageController {
   // Req là yêu cầu, Res là kết quả trả về
   public async index(req: Request, res: Response) {
      let listProductTrending = await Product.getAllByTrending('1');
      let listProductOur = await Product.getAllByTrending('0');

      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
      
      let cart = await Order.checkCart(id_user);
      // // Nếu chưa có giỏ hàng
      // // Tạo 1 mảng trống, 0 có sản phẩm
      if (!cart) {
         cart = new Order([]);
      }
      res.render("page_index", {
         title: "Home",
         listProductTrending: listProductTrending,
         listProductOur: listProductOur,
         cart: cart
      });
   }
}
