"use client";

import { useEffect } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import styles from "./response.module.css";
import { getResponses } from "@/redux/feature/university/universityAction";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";

export default function ResponsePage() {
    const dispatch = useAppDispatch();
    const { responses, loading } = useAppSelector((state: RootState) => state.unniversityReducer);

    useEffect(() => {
        dispatch(getResponses({}));
    }, [dispatch]);

    return (
        <Box className={styles.container}>
            <Typography variant="h5" className={styles.header}>
                Student Responses
            </Typography>

            {loading && <p>Loading...</p>}

            {responses.map((res) => (
                <Card key={res.uuid} className={styles.card}>
                    <CardContent>
                        <Typography variant="h6">
                            {res.student.name}
                        </Typography>
                        <Typography className={styles.email}>
                            {res.student.email}
                        </Typography>

                        <Divider className={styles.divider} />

                        {res.entries.map((entry, index) => (
                            <Box key={entry.uuid} className={styles.entry}>
                                <Typography className={styles.question}>
                                    Q{index + 1}
                                </Typography>
                                <Typography className={styles.answer}>
                                    {entry.answer}
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}