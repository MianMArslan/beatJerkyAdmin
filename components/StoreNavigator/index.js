import { Box, Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import react, { useEffect, useRef } from "react";

export default function StoreNavigator() {
  const router = useRouter();
  const storeId = useRef(null);
  const storeName = useRef(null);
  const storeImage = useRef(null);
  useEffect(() => {
    if (
      router.query.storeId &&
      router.query.storeName &&
      router.query.storeImage
    ) {
      storeId.current = router.query.storeId;
      storeName.current = router.query.storeName;
      storeImage.current = router.query.storeImage;
    }
  }, [router.query.storeId, router.query.storeName, router.query.storeImage]);
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <ButtonGroup color="secondary">
          <Button
            onClick={() => {
              router.push(
                `/selectedStore/products?storeId=${storeId.current}&&storeName=${storeName.current}&&storeImage=${storeImage.current}`
              );
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
              router.push(
                `/selectedStore/feed?storeId=${storeId.current}&&storeName=${storeName.current}&&storeImage=${storeImage.current}`
              );
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
              router.push(
                `/selectedStore/chat?storeId=${storeId.current}&&storeName=${storeName.current}&&storeImage=${storeImage.current}`
              );
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
