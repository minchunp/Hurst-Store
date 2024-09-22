import e, { Request, Response } from "express";
import { Order } from "../models/Order";
import { User } from "../models/User";
import { Product } from "../models/Product";
export class AdminController {
   public async dashboard(req: Request, res: Response) {
      let orderPendingLists: Order[] = await Order.getNewOrderPending();
      let orderPendingListsWithLimit: Order[] = await Order.getNewOrderPendingWithLimit(10);
      let orderLists: Order[] = await Order.getOrderLists();
      let totalSale: number = 0;
      orderLists.forEach((order) => {
         let pricePro: number = 0;
         order.products?.forEach((pro) => {
            if (pro.price_pro && pro.sale_pro) {
               pricePro += (pro.sale_pro < pro.price_pro ? pro.sale_pro : pro.price_pro) * pro.quantity_pro;
            }
         });
         totalSale += pricePro;
      });
      let userLists: User[] = await User.getUserLists();

      res.render("admin_dashboard", {
         title: "Dashboard",
         orderPendingListsWithLimit: orderPendingListsWithLimit,
         orderPendingLists: orderPendingLists,
         orderLists: orderLists,
         userLists: userLists,
         totalSale: totalSale,
      });
   }

   public async order(req: Request, res: Response) {
      let orderLists: Order[] = await Order.getOrderLists();

      res.render("admin_order", {
         title: "Orders",
         orderLists: orderLists,
      });
   }

   public async orderDetail(req: Request, res: Response) {
      let _id: string = req.params.id;
      let order: Order = new Order();
      order._id = _id;
      await order.getDetail();

      res.render("admin_order_detail", {
         title: "Order detail",
         order: order,
      });
   }

   public async updateStatus(req: Request, res: Response) {
      let statusUpdate: "cart" | "order" | "shipping" | "success" | "cancel" = req.body.status;
      let _id: string = req.params.id;
      let order: Order = new Order();
      order._id = _id;
      await order.getDetail();
      order.status_order = statusUpdate;
      await order.update();

      res.redirect(`/admin/order/${_id}`);
   }

   public async product(req: Request, res: Response) {
      let productLists: Product[] = await Product.getProductLists();

      res.render("admin_product", {
         title: "Products",
         productLists: productLists,
      });
   }

   public async addProduct(req: Request, res: Response) {
      let name: string = req.body.name_product;
      let image: string = "hoathoaBright.jpg";
      let price: number = req.body.price_product;
      let sale: number = req.body.sale_product;
      let description: string = req.body.description_product;
      let trending: "1" | "0" = req.body.trending_product!= undefined ? "1" : "0";

      if (name && image && price && sale && description && trending) {
         let product: Product = new Product(name, price, sale, image, trending, description);
         console.log(product);
         
         await product.add();
         res.redirect(`/admin/product`);
      }

      res.render("admin_add_product", {
         title: "Add Product",
      });
   }

   public async updateProduct(req: Request, res: Response) {
      let _id = req.params.id;
      let pro: Product = new Product();
      pro._id = _id;
      await pro.getDetail();

      let edit_name: string = req.body.edit_name;
      let edit_image: string = req.body.edit_image != "" ? req.body.edit_image : pro.image_pro;
      let edit_price: number = req.body.edit_price;
      let edit_sale: number = req.body.edit_sale;
      let edit_description: string = req.body.edit_description;
      let edit_trending: "1" | "0" = req.body.edit_trending != undefined ? "1" : "0";

      if (edit_name && edit_image && edit_price && edit_sale && edit_description && edit_trending) {
         pro.name_pro = edit_name;
         pro.image_pro = edit_image;
         pro.sale_pro = edit_sale;
         pro.price_pro = edit_price;
         pro.sale_pro = edit_sale;
         pro.description_pro = edit_description;
         pro.trending_pro = edit_trending;
         await pro.update();
         res.redirect(`/admin/product/${_id}/update`);
      }

      res.render("admin_edit_product", {
         title: "Edit Product",
         pro: pro,
      });
   }

   public async deleteProduct(req: Request, res: Response) {
      let id = req.params.id;
      let pro: Product = new Product();
      pro._id = id;
      await pro.getDetail();

      await pro.delete();

      res.redirect(`/admin/product`);
   }

   public async user(req: Request, res: Response) {
      let userLists: User[] = await User.getUserLists();

      res.render('admin_user', {
         title: "Users",
         userLists: userLists
      });
   }

   public async addUser(req: Request, res: Response) {
      let name_user: string = req.body.name_user;
      let email_user: string = req.body.email_user;
      let password_user: string = "user123";
      let role_user: "Admin" | "User" = req.body.role_user;
      
      if (name_user && email_user && role_user && password_user) {
         let user: User = new User(email_user, password_user, name_user, role_user) ;
         console.log(user);
         
         await user.add();
         res.redirect(`/admin/user`);
      }
      
      res.render('admin_add_user', {
         title: 'Add User'
      });
   }

   public async updateUser(req: Request, res: Response) {
      let _id = req.params.id;
      let user: User = new User();
      user._id = _id;
      await user.getDetail();

      let name_user: string = req.body.name_user;
      let email_user: string = req.body.email_user;
      let role_user:"Admin" | "User" = req.body.role_user;

      if (name_user && email_user && role_user) {
         user.name_user = name_user;
         user.email_user = email_user;
         user.role_user = role_user;
         user.pass_user = user.pass_user;
         
         console.log(user);
         
         await user.update();
         res.redirect(`/admin/user/${_id}/update`);
      }

      res.render('admin_edit_user', {
         title: "Edit User",
         user: user
      });
   }

   public async deleteUser(req: Request, res: Response) {
      let id = req.params.id;
      let user: User = new User();
      user._id = id;
      await user.getDetail();

      await user.delete();
      res.redirect(`/admin/user`);
   }
}
