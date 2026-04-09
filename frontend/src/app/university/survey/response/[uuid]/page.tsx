"use client";

import { useEffect } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import styles from "./response.module.css";
import { getResponses } from "@/redux/feature/university/universityAction";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";

export default function ResponsePage() {
    const dispatch = useAppDispatch();
    const { responses, loading } = useAppSelector((state: RootState) => state.unniversityReducer);
    const params = useParams();
    const survey_uuid = params?.uuid;

    useEffect(() => {
        dispatch(getResponses({}));
    }, [dispatch]);

    const filteredResponses = responses.filter((res) => res.survey_uuid === survey_uuid);

    return (
        <Box className={styles.container}>
            <Typography variant="h5" className={styles.header}>
                Student Responses
            </Typography>

            {loading && <p>Loading...</p>}

            {filteredResponses.length === 0 && !loading && (
                <Typography>No responses found</Typography>
            )}

            {filteredResponses.map((res) => (
                <Card key={res.uuid} className={styles.card}>
                    <CardContent>
                        <Typography variant="h6">
                            {res.student.name}
                        </Typography>

                        <Typography className={styles.email}>
                            {res.student.email}
                        </Typography>

                        <Divider className={styles.divider} />

                        {res.entries.length === 0 ? (
                            <Typography>No answers submitted</Typography>
                        ) : (
                            res.entries.map((entry, index) => (
                                <Box key={entry.uuid} className={styles.entry}>
                                    <Typography className={styles.question}>
                                        Q{index + 1}
                                    </Typography>
                                    <Typography className={styles.answer}>
                                        {entry.answer}
                                    </Typography>
                                </Box>
                            ))
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}