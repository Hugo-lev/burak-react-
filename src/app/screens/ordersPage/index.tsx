import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PausedOrders from "./PausedOrder";
import ProcessOrders from "./ProcessOrder";
import FinishedOrders from "./FinishedOrder";

import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Order status tabs"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>

            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          {/* USER INFORMATION */}
          <Box className="order-info-box member-box">
            <Box className="order-user-img">
              <img
                src="/icons/default-user.svg"
                className="order-user-avatar"
                alt="User avatar"
              />
            </Box>

            <div className="order-user-name">Martin</div>
            <div className="order-user-prof">User</div>

            <div className="order-user-address">
              <LocationOnIcon className="order-location-icon" />
              <span className="spec-address-txt">
                123 Main Street, New York, NY 10001
              </span>
            </div>
          </Box>

          {/* PAYMENT METHOD */}
          <Box className="order-info-box payment-info-box">
            <div className="payment-card-title"></div>

            <form
              className="payment-card-fields"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="payment-field-label" htmlFor="card-number">
                Card Number
              </label>
              <input
                id="card-number"
                className="payment-card-input"
                type="text"
                inputMode="numeric"
                placeholder="Enter card number"
                autoComplete="cc-number"
              />

              <div className="payment-card-row">
                <div className="payment-card-field">
                  <label className="payment-field-label" htmlFor="card-expiry">
                    Expiry Date
                  </label>
                  <input
                    id="card-expiry"
                    className="payment-card-input"
                    type="text"
                    placeholder="MM/YY"
                    autoComplete="cc-exp"
                  />
                </div>

                <div className="payment-card-field">
                  <label className="payment-field-label" htmlFor="card-cvv">
                    CVV
                  </label>
                  <input
                    id="card-cvv"
                    className="payment-card-input"
                    type="password"
                    inputMode="numeric"
                    placeholder="CVV"
                    autoComplete="cc-csc"
                  />
                </div>
              </div>

              <label className="payment-field-label" htmlFor="card-holder">
                Card Holder
              </label>
              <input
                id="card-holder"
                className="payment-card-input"
                type="text"
                placeholder="Name on card"
                autoComplete="cc-name"
              />

              <div className="payment-card-logos">
                <img src="/icons/visa-card.svg" alt="Visa" />
                <img src="/icons/master-card.svg" alt="Mastercard" />
                <img src="/icons/paypal-card.svg" alt="PayPal" />
                <img src="/icons/western-card.svg" alt="Western Union" />
              </div>
            </form>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
