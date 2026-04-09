"use client"

import styles from "./student.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser, studentloginUser } from "@/redux/feature/Auth/authAction"
import { useRouter } from "next/navigation"
import { Box, Button, Card, TextField, Typography, Divider } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import Image from "next/image"
import { useAppDispatch } from "@/redux/hooks.ts"
import { StudentloginSchema, StudentLoginSchemaType } from "@/schemas/student/login"

export default function StudentLoginForm() {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<StudentLoginSchemaType>({
        resolver: zodResolver(StudentloginSchema)
    })

    const onSubmit = async (data: StudentLoginSchemaType) => {
        try {
            await dispatch(studentloginUser(data)).unwrap()
            router.replace("/")
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" });
            console.log(error)
        }
    }

    return (
        <Box className={styles.container}>
            <Card className={styles.formWrapper} elevation={3}>
                <Typography variant="h5" className={styles.title}>
                    Student Sign In
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <TextField
                            label="card_uuid"
                            type="card_uuid"
                            fullWidth
                            {...register("card_uuid")}
                        />
                        {errors.card_uuid && (
                            <span className={styles.error}>
                                {errors.card_uuid.message}
                            </span>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        className={styles.button}
                    >
                        Login
                    </Button>
                </form>
            </Card>
            <Image src={"/login-logo-page.svg"} alt="login side page missing" width={500} height={500} loading="eager" />
        </Box>
    )
}