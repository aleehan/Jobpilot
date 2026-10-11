import { APPLICATION_STATUSES } from "../../utils/constants.js";
import "./StatusBadge.css";

/**
 * @typedef {Object} StatusBadgeProps
 * @property {"pending" | "reviewed" | "accepted" | "rejected"} [status] статус отклика
 */

/** @param {StatusBadgeProps} props */
function StatusBadge({ status = "pending" }) {
  const found = APPLICATION_STATUSES.find((item) => item.value === status);
  const label = found ? found.label : status;

  return <span className={"status-badge status-badge--" + status}>{label}</span>;
}

export default StatusBadge;