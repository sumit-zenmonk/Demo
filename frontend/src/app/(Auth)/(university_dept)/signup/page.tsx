"use client"

import styles from "./signup.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, SignupSchemaType } from "@/schemas/university/signup"
import { signupUser } from "@/redux/feature/Auth/authAction"
import { useRouter } from "next/navigation"
import { Box, Button, Card, MenuItem, TextField, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import Image from "next/image"
import { useAppDispatch } from "@/redux/hooks.ts"
import { UniversityDepartmentRoleEnum } from "@/enums/university.dept.enum"

export default function SignupForm() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: UniversityDepartmentRoleEnum.TEACHER
        }
    })

    const onSubmit = async (data: SignupSchemaType) => {
        try {
            await dispatch(signupUser(data)).unwrap()
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
                    Join Us! It's free
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <TextField
                            label="Name"
                            type="text"
                            fullWidth
                            {...register("name")}
                        />
                        {errors.name && (
                            <span className={styles.error}>
                                {errors.name.message}
                            </span>
                        )}
                    </Box>

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

                    <TextField
                        select
                        label="Role"
                        defaultValue="teacher"
                        {...register("role")}
                    >
                        <MenuItem value="administrators">{UniversityDepartmentRoleEnum.ADMINISTRATORS}</MenuItem>
                        <MenuItem value="hod">{UniversityDepartmentRoleEnum.HOD}</MenuItem>
                        <MenuItem value="teacher">{UniversityDepartmentRoleEnum.TEACHER}</MenuItem>
                    </TextField>

                    <Box className={styles.field}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className={styles.error}>
                                {errors.password.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <span className={styles.error}>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        className={styles.button}
                    >
                        Signup
                    </Button>

                    <Button
                        // variant="outlined"
                        className={styles.loginBtn}
                        onClick={() => router.replace("/login")}
                    >
                        Already have an account?
                    </Button>
                </form>
            </Card>
            <Image src={"/signup-logo-page.svg"} alt="Signup side page missing" width={500} height={500} loading="eager" />
        </Box >
    )
}