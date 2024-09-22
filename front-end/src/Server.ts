import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { PageController } from "./controllers/PageController";
import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";
import { LocalStorage } from "node-localstorage";
import { AdminController } from "./controllers/AdminController";
import { OrderController } from "./controllers/OrderController";

export class Server {
   private app = express();
   private port: number = 5001;

   public start() {
      global.localStorage = new LocalStorage('./storage');
      this.app.set("view engine", "ejs");
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use("/public", express.static("public"));

      this.app.use(function(req: Request, res: Response, next: NextFunction) {
         res.locals.user = JSON.parse(localStorage.getItem('user') || '{"id":-1}');
         next();
      });

      this.app.get("/", new PageController().index);
      this.app.get("/login", new UserController().login);
      this.app.post("/login", new UserController().login);
      this.app.get("/logout", new UserController().logout);

      this.app.get("/register", new UserController().register);
      this.app.post("/register", new UserController().register);

      this.app.get("/detail/:id", new ProductController().detail);
      this.app.post("/detail/:id", new ProductController().addToCart);

      this.app.get("/cart", new OrderController().cart);
      this.app.get("/cart/:index/:action", new OrderController().updateCart);
      this.app.get("/cart/checkout", new OrderController().checkout);

      this.app.get("/admin", new AdminController().dashboard);
      this.app.get("/admin/order", new AdminController().order);
      this.app.get("/admin/order/:id", new AdminController().orderDetail);
      this.app.post("/admin/order/:id", new AdminController().updateStatus);

      this.app.get("/admin/product", new AdminController().product);
      this.app.get("/admin/product/add", new AdminController().addProduct);
      this.app.post("/admin/product/add", new AdminController().addProduct);
      this.app.get("/admin/product/:id/update", new AdminController().updateProduct);
      this.app.post("/admin/product/:id/update", new AdminController().updateProduct);
      this.app.get("/admin/product/:id/delete", new AdminController().deleteProduct);

      this.app.get("/admin/user", new AdminController().user);
      this.app.get("/admin/user/add", new AdminController().addUser);
      this.app.post("/admin/user/add", new AdminController().addUser);
      this.app.get("/admin/user/:id/update", new AdminController().updateUser);
      this.app.post("/admin/user/:id/update", new AdminController().updateUser);
      this.app.get("/admin/user/:id/delete", new AdminController().deleteUser);

      this.app.listen(this.port, () => {
         console.log(`Link app: http://localhost:${this.port}`);  
      });
   }
}
