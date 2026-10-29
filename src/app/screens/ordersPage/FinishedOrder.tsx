import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

export default function FinishedOrders() {
  const isEmpty = false;

  return (
    <TabPanel value={"3"}>
      {isEmpty ? (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="/icons/noimage-list.svg"
            alt="No finished orders"
            style={{ width: 300, height: 300 }}
          />
        </Box>
      ) : (
        <Stack>
          {[1, 2].map((ele, index) => {
            return (
              <Box key={index} className="order-main-box">
                <Box className="order-box-scroll">
                  {[1, 2, 3].map((ele2, index2) => {
                    return (
                      <Box key={index2} className="orders-name-price">
                        <img
                          src="/img/kebab-fresh.webp"
                          className="order-dish-img"
                          alt="Kebab"
                        />

                        <p className="title-dish">Kebab</p>

                        <Box className="price-box">
                          <p>$12</p>
                          <img src="/icons/close.svg" alt="" />
                          <p>2</p>
                          <img src="/icons/pause.svg" alt="" />
                          <p style={{ marginLeft: "15px" }}>$24</p>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                <Box className="total-price-box">
                  <Box className="box-total">
                    <p>Product price</p>
                    <p>$24</p>

                    <img
                      src="/icons/plus.svg"
                      style={{ marginLeft: "20px" }}
                      alt=""
                    />

                    <p>Delivery cost</p>
                    <p>$2</p>

                    <img
                      src="/icons/pause.svg"
                      style={{ marginLeft: "20px" }}
                      alt=""
                    />

                    <p>Total</p>
                    <p>$26</p>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}
    </TabPanel>
  );
}
