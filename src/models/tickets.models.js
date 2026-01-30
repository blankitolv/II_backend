import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new mongoose.Schema(
  {
    order_number: { type: String, unique: true, default: () => uuidv4() },
    amount: { type: Number, required: true },
    purchaser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: { type: String, default: "generada" },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

const TicketModel = mongoose.model("Ticket", ticketSchema);
export default TicketModel;
