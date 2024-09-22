import { Request, Response } from "express";
import { User } from "../models/User";
import { json } from "body-parser";
import { Order } from "../models/Order";
export class UserController {
   public async login(req: Request, res: Response) {
      let email_login: string = req.body.email_login;
      let password_login: string = req.body.password_login;

      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
      let cart = await Order.checkCart(id_user);
      // Nếu chưa có giỏ hàng
      // Tạo 1 mảng trống, 0 có sản phẩm
      if (!cart) {
         cart = new Order([]);
      }

      // Xử lý đăng nhập
      // Gửi dữ liệu -> Xử lý đăng nhập
      if (email_login && password_login) {
         let user: User = new User(email_login, password_login);
         
         if (await user.login()) {
            // Đăng nhập thành công -> Về Home
            localStorage.setItem('user', JSON.stringify(user));
            res.redirect("/");
         } else {
            // Đăng nhập không thành công
            res.render("user_login", {
               title: "Account",
               cart: cart,
               titleToast: "Error",
               messageToast: "Login unsuccessful!",
               typeToast: "error",
               durationToast: 5000,
            });
         }
      } else {
         // Không gửi dữ liệu -> Load View
         res.render("user_login", {
            title: "Account",
            cart: cart,
            titleToast: "Wellcome customer",
            messageToast: "Please log in to your account!",
            typeToast: "welcome",
            durationToast: 5000,
         });
      }
   }

   public logout(req: Request, res: Response) {
      localStorage.removeItem('user');
      res.redirect('/login');
   }

   public async register(req: Request, res: Response) {
      let id_user: string = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
      let cart = await Order.checkCart(id_user);
      // Nếu chưa có giỏ hàng
      // Tạo 1 mảng trống, 0 có sản phẩm
      if (!cart) {
         cart = new Order([]);
      }

      let name_register: string = req.body.name_register;
      let email_register: string = req.body.email_register;
      let password_register: string = req.body.password_register;
      let password_confirm: string = req.body.password_confirm;

      // Xử lý chức năng đăng ký
      if (name_register && email_register && password_register && password_confirm) {
         let titleToast: string = "";
         let messageToast: string = "";
         let typeToast: string = "";
         let durationToast: number = 0;
         if (password_register == password_confirm) {
            let user = new User(email_register, password_register, name_register, "User");
            if (await user.register()) {
               // Đăng ký thành công -> Về trang đăng nhập
               res.redirect("/login");
               // res.render("user_login", {
               //    title: "Account",
               //    cart: cart,
               //    titleToast: "Success",
               //    messageToast: "Account registration successful!",
               //    typeToast: "success",
               //    durationToast: 5000,
               // });
            } else {
               // Đăng ký không thành công -> Báo lỗi
               titleToast = "Error";
               messageToast = "Account registration failed!";
               typeToast = "error";
               durationToast = 5000;
            }
         } else {
            // Mật khẩu không khớp -> Báo lỗi
            titleToast = "Error";
            messageToast = "Password mismatch!";
            typeToast = "error";
            durationToast = 5000;
         }
         res.render("user_register", {
            title: "Account",
            cart: cart,
            titleToast: titleToast,
            messageToast: messageToast,
            typeToast: typeToast,
            durationToast: durationToast,
         });
      } else {
         res.render("user_register", {
            title: "Account",
            cart: cart,
            titleToast: "Welcome customer",
            messageToast: "Please fill in registration information!",
            typeToast: "welcome",
            durationToast: 5000
         });
      }
   }
}
