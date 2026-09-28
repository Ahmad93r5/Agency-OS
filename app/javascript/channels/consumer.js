import { createConsumer } from "@rails/actioncable";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

const CABLE_URL = `${API_URL.replace(/^http/, "ws")}/cable`;

export default createConsumer(CABLE_URL);