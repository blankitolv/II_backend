import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String], default: [] },
});

productSchema.methods.validate_quantity_stock = function (quantity_to_buy) {
  console.log("STOCK: ", this.stock, " QUANTITY: ", quantity_to_buy);
  return this.stock >= quantity_to_buy;
};

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
