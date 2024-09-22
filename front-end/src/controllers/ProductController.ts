import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { User } from "../models/User";
export class ProductController {
   // Req là yêu cầu, Res là kết quả trả về
   public async detail(req: Request, res: Response) {
      let id = req.params.id;
      let pro = (await Product.getById(id)) as Product;
      let listProByPrice = (await Product.getByPrice()) as Product;

      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
      let cart = await Order.checkCart(id_user);
      // Nếu chưa có giỏ hàng
      // Tạo 1 mảng trống, 0 có sản phẩm
      if (!cart) {
         cart = new Order([]);
      }

      res.render("product_detail", {
         title: "Product #" + id,
         cart: cart,
         pro: pro,
         listProByPrice: listProByPrice,
         titleToast: "Wellcome customer",
         messageToast: "This is the product detail page!",
         typeToast: "welcome",
         durationToast: 5000,
      });
   }

   public async addToCart(req: Request, res: Response) {
      let id: string = req.params.id;
      let pro = (await Product.getById(id)) as Product;
      let listProByPrice = (await Product.getByPrice()) as Product;

      let quantity = req.body.quantity_product;
      let size = req.body.size_product;
      let productData = (await Product.getById(id)) as Product;
      let product = new Product();
      product.copy(productData);
      if (size) {
         product.size_pro = size;
      } else {
         product.size_pro = "S";
      }

      if (quantity) {
         product.quantity_pro = Number(quantity);
      } else {
         pro.quantity_pro = 1;
      }

      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
      let user_order = await User.getUserById(id_user) as User;
      console.log(user_order);
      
      // Kiểm tra xem đã tồn tại giỏ hàng hay chưa
      let cart: Order = (await Order.checkCart(id_user)) as Order;
      console.log(cart);
      if (!cart) {
         // Nếu chưa có (idUser = user.id && status == 'cart')
         // => Thì tạo giỏ hàng
         cart = new Order([product], id_user);
         cart.name_user = user_order.name_user;
         cart.putInDatabase();
      } else {
         // Nếu đã có -> Thêm sản phẩm vào giỏ hàng
         let cartData = cart;
         cart = new Order();
         cart.copy(cartData);
         cart.addProduct(product);
      }

      res.render('product_detail', {
         title: "Product #" + id,
         pro: pro,
         cart: cart,
         listProByPrice: listProByPrice,
         titleToast: "Success",
         messageToast: "Added product to cart successfully!",
         typeToast: "success",
         durationToast: 5000,
      });
   }
}
