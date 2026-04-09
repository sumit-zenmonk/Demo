"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import styles from "./survey.module.css";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { useRouter } from "next/navigation";
import { getStudentResponses, getStudentSurveys } from "@/redux/feature/student/studentAction";
import { StudentResponse, StudentSurvey } from "@/redux/feature/student/tudentType";

export default function SurveyPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { surveys, loading, responses } = useAppSelector((state: RootState) => state.studentReducer);

    useEffect(() => {
        dispatch(getStudentSurveys({}));
        dispatch(getStudentResponses({}));
    }, [dispatch]);

    return (
        <Box className={styles.container}>
            {loading && <p>Loading...</p>}

            <Box className={styles.sidebar}>
                <Box className={styles.header}>
                    <Typography variant="h5">Surveys</Typography>

                </Box>
                {surveys.map((survey: any) => {
                    const isSubmitted = responses?.some(
                        (r: any) => r.survey_uuid === survey.uuid
                    );

                    return (
                        <Box
                            key={survey.uuid}
                            className={styles.card}
                            onClick={() =>
                                router.push(`/student/survey/${survey.uuid}`)
                            }
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <Box>
                                <Box className={styles.title}>{survey.title}</Box>
                                <Box className={styles.desc}>{survey.description}</Box>
                            </Box>

                            <Box>
                                <Typography
                                    style={{
                                        padding: "4px 10px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        backgroundColor: isSubmitted ? "#e6f4ea" : "#fff3cd",
                                        color: isSubmitted ? "#2e7d32" : "#856404",
                                    }}
                                >
                                    {isSubmitted ? "Submitted" : "Pending"}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Box className={styles.sidebar}>
                <Box className={styles.header}>
                    <Typography variant="h5">Responses</Typography>

                </Box>
                {responses.map((response: StudentResponse) => {
                    const survey = surveys.find(
                        (s: StudentSurvey) => s.uuid === response.survey_uuid
                    );

                    return (
                        <Box
                            key={response.uuid}
                            className={styles.card}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                                cursor: "pointer",
                            }}
                        >
                            <Box className={styles.title}>
                                {survey?.title || "Untitled Survey"}
                            </Box>

                            <Box className={styles.desc}>
                                {survey?.description || "No description available"}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}