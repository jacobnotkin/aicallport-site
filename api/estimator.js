import accountHandler from "../lib/estimator-account-handler.js";
import calendarHandler from "../lib/estimator-calendar-handler.js";
import recordsHandler from "../lib/estimator-records-handler.js";
import { json } from "../lib/estimator-api-shared.js";

export const config = { api: { bodyParser: true } };

const handlers = {
  account: accountHandler,
  calendar: calendarHandler,
  records: recordsHandler
};

export default async function handler(req, res) {
  const resource = Array.isArray(req.query?.resource) ? req.query.resource[0] : req.query?.resource;
  const resourceHandler = handlers[resource];
  if (!resourceHandler) return json(res, 404, { error: "Estimator resource not found." });
  return resourceHandler(req, res);
}
