import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

// Bosh sahifadagi restoran statistikasi (filiallar, tajriba, menyu va mijozlar soni)
export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          {/* Filiallar soni */}
          <Stack className="static-box">
            <Box className="static-num">12</Box>
            <Box className="static-text">Restaurants</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />

          {/* Ish tajribasi */}
          <Stack className="static-box">
            <Box className="static-num">8</Box>
            <Box className="static-text">Experience</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />

          {/* Menyu xillari */}
          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Menu</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />

          {/* Doimiy mijozlar soni */}
          <Stack className="static-box">
            <Box className="static-num">200+</Box>
            <Box className="static-text">Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
