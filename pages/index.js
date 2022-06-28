import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Head>
        <title>Take Notes for Dev</title>
        <meta name="description" content="Created by Phanindra Reddy" />
        <link rel="icon" href="/takeNote.svg" />
      </Head>

      <Box sx={{ background: "#f2f2f2", height: "100%", padding: "0.5rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src="/takeNote.svg"
            alt="takenotefordev"
            width={200}
            height={200}
          />

          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{ color: "#404040", textAlign: "Center" }}
          >
            The Note Taking App for Developers
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#888888", textAlign: "center" }}
          >
            A web-based notes app for developers.
          </Typography>

          {matches ? (
            <Box
              sx={{
                background: "#fff",
                border: "1px solid #404040",
                borderRadius: "0.2rem",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                my: 5,
              }}
            >
              <Typography
                sx={{
                  width: "50vw",
                  color: "#404040",
                  textAlign: "center",
                  my: 1,
                }}
              >
                TakeNote is only available as a demo. Your notes will be saved
                to local storage and <b>not</b> persisted in any database or
                cloud.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                <Link href="/takenotesfordev">
                  <a style={{ color: "white" }}>View Demo</a>
                </Link>
              </Button>
            </Box>
          ) : (
            <Typography
              variant="h5"
              sx={{ my: 5, color: "#5183f5", textAlign: "center" }}
            >
              <b>
                TakeNote is not currently supported for tablet and mobile
                devices.
              </b>
            </Typography>
          )}
          <Box
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              marginBottom: "5rem",
            }}
          >
            <Image
              src="/takenotes_ss.png"
              alt="takenotefordev"
              width={900}
              height={500}
              priority
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#5183f5",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 0px",
        }}
      >
        <Image
          src="/takenote2.svg"
          alt="takenotefordev"
          width={50}
          height={50}
        />
        <Typography variant="h5" component="div" sx={{ color: "white", mt: 2 }}>
          Take Notes for Dev
        </Typography>
        <Link href="https://github.com/Phanindra-Reddy/next-takenotes">
          <a
            target="_blank"
            style={{ marginLeft: "10px", color: "white", margin: "2rem 0" }}
          >
            View Source
          </a>
        </Link>
      </Box>
    </>
  );
}
