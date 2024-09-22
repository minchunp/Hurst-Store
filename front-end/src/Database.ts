export class Database {
   protected APIurl: string = "http://localhost:3000";

   public async getData(url: string) {
      return await fetch(this.APIurl + url, {
         method: 'GET'
      }).then((res: Response) => res.json());
   }

   public async insertData<T>(url: string, data: T) {
      return await fetch(this.APIurl + url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body:JSON.stringify(data),
      }).then((res: Response) => res.json());
   }

   public async updateData<T>(url: string, data: T) {
      return await fetch(this.APIurl + url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body:JSON.stringify(data),
      }).then((res: Response) => res.json());
   }

   public async deleteData<T>(url: string, data: T) {
      return await fetch(this.APIurl + url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body:JSON.stringify(data),
      }).then((res: Response) => res.json());
   }
}