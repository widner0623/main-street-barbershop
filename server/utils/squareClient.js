import { SquareClient, SquareEnvironment } from "square";

const environment =
  process.env.SQUARE_ENVIRONMENT === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN || "missing-token",
  environment,
});

export default squareClient;