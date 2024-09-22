import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { User } from "../models/User";
export class OrderController {
   public async cart(req: Request, res: Response) {
      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
      let cart = await Order.checkCart(id_user);

      // Nếu chưa có giỏ hàng
      // Tạo 1 mảng trống, 0 có sản phẩm
      if (!cart) {
         cart = new Order([]);
      }
      res.render('product_cart', {
         title: "Cart",
         cart: cart,
         titleToast: "Wellcome customer",
         messageToast: "This is your shopping cart page!",
         typeToast: "welcome",
         durationToast: 5000,
      });
   }

   public async updateCart(req: Request, res: Response) {
      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
      let cartData = await Order.checkCart(id_user);
      let cart = new Order();
      if (cartData) {
         cart.copy(cartData);
      }
      let indexPro: number = Number(req.params.index);
      if (cart.products) {
         if (req.params.action == "inc") {
            cart.products[indexPro].quantity_pro++;
         } else if (req.params.action == "dec") {
            if (cart.products[indexPro].quantity_pro <= 1) {
               cart.products.splice(indexPro,1);
            } else {
               cart.products[indexPro].quantity_pro--;
            }
         } else if (req.params.action == "delete") {
            cart.products.splice(indexPro,1);
         }
      }
      await cart.update();
      res.redirect('/cart');
   }

   public async checkout(req: Request, res: Response) {
      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
      let cartData = await Order.checkCart(id_user);
      let order = new Order();
      if (cartData) {
         order.copy(cartData);
         if (order.products && order.products.length > 0) {
            let user_info = await User.getUserById(id_user) as User;
            const email_user = user_info.email_user;
            const name_user = user_info.name_user;
            const subject = "Dear " + name_user;
            const content = `<p style="line-height: 30px;">Thank you for choosing HURST. We appreciate your recent purchase and would love to hear about your experience. <br>Your satisfaction is crucial to us. Could you spare a moment to share your thoughts on the product/service and your overall experience? Your feedback helps us improve. <br>Reply to this email with your feedback. We look forward to serving you again. <br>Best, <br><h3 style="color: #c8a165;">HURST</h3></p>`;
            const mainInfor_mail = {
               email: email_user,
               subject: subject,
               content: content
            }

            let orderTotal: number = 0;
            order.products.forEach(pro => {
               let total: number = 0;
               if (pro.sale_pro && pro.price_pro) {
                  if (pro.sale_pro < pro.price_pro) {
                     total += pro.sale_pro;
                  } else {
                     total += pro.price_pro;
                  }
               }
               orderTotal += total * pro.quantity_pro;
            });

            order.total_order = orderTotal;
            order.date_order = new Date().toLocaleString('sv-SE');
            order.status_order = 'order';

            await order.sendMailToCustomer(mainInfor_mail);
            await order.update();

            res.render('product_cart', {
               title: "Cart",
               cart: order,
               titleToast: "Success",
               messageToast: "Your order has been placed successfully!",
               typeToast: "success",
               durationToast: 5000,
            });
         } else if (order.products && order.products.length == 0) {
            res.render('product_cart', {
               title: "Cart",
               cart: order,
               titleToast: "Error",
               messageToast: "There are no products in your shopping cart!",
               typeToast: "error",
               durationToast: 5000,
            });
         }
      }
   }
}
