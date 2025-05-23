import React, { useState } from "react";
import OrderImage from "@/assets/images/Order 1.png";
import ArrowDownIcon from "@/assets/icons/ArrowDown";
import ArrowUpIcon from "@/assets/icons/ArrowUp";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Represents an order item.
 * @typedef {Object} OrderItem
 * @property {string} name - The name of the item.
 * @property {string} description - A description of the item.
 * @property {number} price - The price of the item.
 */
export type OrderItem = {
  name: string;
  description: string;
  price: number;
};

/**
 * Represents an order.
 * @typedef {Object} Order
 * @property {string} id - The unique identifier for the order.
 * @property {string} date - The date and time of the order.
 * @property {OrderItem[]} items - The list of items in the order.
 * @property {number} total - The total cost of the order.
 * @property {"Pending" | "Cancelled" | "Delivered"} status - The current status of the order.
 * @property {number} [subtotal] - The subtotal amount before taxes and discounts (optional).
 * @property {number} [tax] - The tax amount applied to the order (optional).
 * @property {number} [promo] - The promotional discount applied to the order (optional).
 */
export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Cancelled" | "Delivered";
  subtotal?: number;
  tax?: number;
  promo?: number;
};

/**
 * OrderCard component displays the details of a single order.
 *
 * @component
 * @param {Object} props
 * @param {Order} props.order - The order details to display.
 * @returns {JSX.Element} The rendered component.
 * @example
 * const order = {
 *   id: "123456",
 *   date: "20 December, 2025 - 2:00 PM",
 *   items: [
 *     { name: "Item 1", description: "Skimmed Milk | Without Sugar", price: 125 },
 *   ],
 *   total: 375,
 *   status: "Pending",
 *   subtotal?: 100,
 *   tax?: 10,
 *   promo?: 20
 * };
 * return <OrderCard order={order} />;
 */
const OrderCard: React.FC<{ order: Order, tab: "upcoming" | "history" }> = ({ order, tab }) => {
  const { status } = order;

  console.log(tab)

  const [orderStatus] = useState<
    "Pending" | "Cancelled" | "Delivered"
  >(status);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-background-white dark:bg-background-navygrey text-text-blackish dark:text-text-whitish shadow rounded-[20px] p-8">
      {/* Order Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-row justify-between items-start lg:items-center flex-nowrap"
      >
        <div className="flex items-center gap-4 flex-wrap sm:justify-start sm:items-start">
          <div className="mb-2 lg:mb-0 text-nowrap">
            <p className="font-bold self-start">Order ID: #{order.id}</p>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
          <span
            className={
              orderStatus === "Pending"
                ? "bg-accent-yellow dark:bg-[#FFCC0033] text-accent-brown shadow-neutral-300 font-bold text-xs px-2.5 py-1.5 rounded self-start"
                : orderStatus === "Cancelled"
                ? "bg-[#ffeceb] text-[#FF3B30] dark:bg-[#FF3B301A] shadow-neutral-300 font-bold text-xs px-2.5 py-1.5 rounded self-start"
                : orderStatus === "Delivered"
                ? "bg-[#ebfaef] text-[#34C759] dark:bg-[#34C7591A] shadow-neutral-300 font-bold text-xs px-2.5 py-1.5 rounded self-start"
                : "bg-gray-500 text-white shadow-neutral-300 shadow-md font-bold text-xs px-2 py-1 rounded self-start"
            }
          >
            {orderStatus}
          </span>
        </div>

        <div className="flex items-start justify-center gap-4 text-text-blackish dark:text-text-whitish text-nowrap">
          <p className="flex-nowrap">{order.items.length} Items</p>
          <button className="focus:outline-none text-text-blackish dark:text-text-whitish">
            {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
        </div>
      </div>

      {/* Order Items */}
      {tab === "upcoming" && (
        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              key="order-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-4 space-y-2 bg-background-gray dark:bg-background-navy text-text-blackish dark:text-text-whitish rounded-[10px] px-4 py-6 overflow-hidden"
            >
              {order.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1, // Staggered animation for items
                  }}
                  className="flex lg:flex-row justify-between border-b border-text-whitish dark:border-[#2E3439]  text-text-blackish dark:text-text-whitish last:border-0 p-2"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      loading="lazy"
                      src={OrderImage}
                      alt={`Image of ${item.name}`}
                      className="w-[3.125rem] h-[3.125rem] rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-text-blackish dark:text-text-whitish text-nowrap">
                    <p className="mt-2 lg:mt-0 flex items-center justify-center font-medium">
                      EGP {item.price}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}

      {tab === "history" && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="history-order-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-4 bg-background-white dark:bg-background-navygrey text-text-blackish dark:text-text-whitish rounded-[10px] px-4 py-6 overflow-hidden"
            >
              {/* Parent Container - Side by Side Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                {/* Order List */}
                <motion.ul className="bg-background-gray dark:bg-background-navy text-text-blackish dark:text-text-whitish p-4 rounded-lg shadow-sm">
                  {order.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between border-b border-text-whitish dark:border-[#2E3439] text-text-blackish dark:text-text-whitish bg-background-gray dark:bg-background-navy last:border-0 py-3"
                    >
                      <div className="flex items-center gap-4 text-text-blackish dark:text-text-whitish">
                        <img
                          loading="lazy"
                          src={OrderImage}
                          alt={`Image of ${item.name}`}
                          className="w-[3.125rem] h-[3.125rem] rounded-md"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      </div>
                      <p className="font-medium">EGP {item.price}</p>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Summary Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.3,
                    delay: order.items.length * 0.1,
                  }}
                  className="bg-background-gray dark:bg-background-navy text-text-blackish dark:text-text-whitish p-4 rounded-lg shadow-sm flex items-center"
                >
                  <div className="w-full space-y-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{order.subtotal} LE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax and Fees</span>
                      <span>{order.tax} LE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Promo Code</span>
                      <span>-{order.promo} LE</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>
                        <span>Total </span>
                        <span className="">({order.items.length} items)</span>
                      </span>
                      <span className="font-bold"> {order.total} LE</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Order Footer */}
      {tab === "upcoming" ? (
        <div className="flex justify-end mt-4 gap-2 text-text-blackish dark:text-text-whitish">
          <p className="font-bold ">Total</p>
          <p className="font-bold ">EGP {order.total}</p>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-4 gap-2 text-text-blackish dark:text-text-whitish">
          <div className="flex items-center justify-center gap-2">
            <p className="font-bold ">Total</p>
            <p className="font-bold ">EGP {order.total}</p>
          </div>
          <button className="bg-orange-500 text-white font-semibold w-[8.5rem] py-2 text-center rounded-full">
            Order again
          </button>
        </div>
      )}
    </section>
  );
};

export default OrderCard;
