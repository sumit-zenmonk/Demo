"use client"

import { usePathname, useRouter } from "next/navigation"
import { Box, Button, Tabs, Tab, Avatar, Typography } from "@mui/material"
import { logoutUser } from "@/redux/feature/Auth/authAction"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { enqueueSnackbar } from "notistack"
import Image from "next/image"
import styles from "./headerComp.module.css"
import { StudentRoleNum } from "@/enums/university.dept.enum"

export default function HeaderComp() {
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.authReducer)

    const handleLogOut = async () => {
        try {
            await dispatch(logoutUser()).unwrap()
            localStorage.clear()
            router.replace("/login")
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" })
            console.log(error)
        }
    }

    return (
        <Box className={styles.header}>
            <Box className={styles.leftContainer}>
                <Typography onClick={() => router.replace('/')}>Survey DashBoard</Typography>
            </Box>

            <Box className={styles.rightContainer}>
                <Box className={styles.category}>
                </Box>

                {user && (
                    user?.role == StudentRoleNum.STUDENT ?
                        (
                            <Box>
                                <Button
                                    onClick={() => router.replace('/student/survey')}
                                    className={styles.signinButton}
                                >
                                    Go to Survey
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Button
                                    onClick={() => router.replace('/university/survey')}
                                    className={styles.signinButton}
                                >
                                    Go to Survey
                                </Button>
                            </Box>
                        ))
                }

                {user ? (
                    <Button
                        className={styles.logoutButton}
                        onClick={handleLogOut}
                    >
                        Sign Out
                    </Button>
                ) : (
                    <Box className={styles.authButtons}>
                        <Button
                            onClick={() => router.replace('/login')}
                            className={styles.signinButton}
                        >
                            Sign In
                        </Button>
                        <Button
                            onClick={() => router.replace('/signup')}
                            className={styles.joinusButton}
                        >
                            Join now
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    )
}