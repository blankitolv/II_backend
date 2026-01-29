import ProductService from "../services/products.service.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("ClientNeedProducts", async (data) => {
      console.log("(ClientNeedProducts) Mensaje recibido:", data);
      // Assuming getAllProducts can return all products without specific query params for this use case
      const productsResponse = await ProductService.getAllProducts({}); 
      socket.emit("serverSendProducts", productsResponse.docs);
    });

    socket.on("del_product", (data) => {
      console.log("SE EMITE DEL_ ", data)
      io.emit("del_product", data);
    });
    
    socket.on("new_product", (product) => {
      console.log("producto creado: ",product)
      io.emit("new_product", product);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};
