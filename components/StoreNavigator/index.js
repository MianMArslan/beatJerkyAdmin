import { Box, Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import react, { useEffect, useRef } from "react";

export default function StoreNavigator() {
  const router = useRouter();
  const storeId = useRef(null);
  useEffect(() => {
    if (router.query.storeId) storeId.current = router.query.storeId;
  }, [router.query.storeId]);
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <ButtonGroup>
          <Button
            onClick={() => {
              router.push(`/selectedStore/products?storeId=${storeId.current}`);
            }}
            style={{ width: "120px" }}
            variant={
              router.pathname === "/selectedStore/products"
                ? "contained"
                : "outlined"
            }
          >
            Products
          </Button>
          <Button
            onClick={() => {
              router.push(`/selectedStore/feed?storeId=${storeId.current}`);
            }}
            style={{ width: "120px" }}
            variant={
              router.pathname === "/selectedStore/feed"
                ? "contained"
                : "outlined"
            }
          >
            Feed
          </Button>
          <Button
            onClick={() => {
              router.push(`/selectedStore/chat?storeId=${storeId.current}`);
            }}
            style={{ width: "120px" }}
            variant={
              router.pathname === "/selectedStore/chat"
                ? "contained"
                : "outlined"
            }
          >
            Chat
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
