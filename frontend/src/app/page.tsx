"use client"

import { useAppSelector } from "@/redux/hooks.ts"
import styles from "./home.module.css"
import { Box, Button, Typography, } from "@mui/material"
import { RootState } from "@/redux/store";

export default function Home() {
  const { user } = useAppSelector((state: RootState) => state.authReducer);

  return (
    <Box className={styles.container}>
      <Typography>Name - {user?.name}</Typography>
      <Typography>Email - {user?.email}</Typography>
      <Typography>Role - {user?.role}</Typography>
    </Box>
  )
}