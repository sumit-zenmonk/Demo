"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import styles from "./survey.module.css";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { deleteSurvey, getResponses, getSurveys } from "@/redux/feature/university/universityAction";
import CreateSurveyModal from "@/component/survey-modal-form/survey-modal-form";
import { useRouter } from "next/navigation";

export default function SurveyPage() {
    const dispatch = useAppDispatch();
    const { surveys, loading } = useAppSelector((state: RootState) => state.unniversityReducer);
    const router = useRouter();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getSurveys({}));
        dispatch(getResponses({}));
    }, [dispatch]);

    const handleDelete = async (uuid: string) => {
        await dispatch(deleteSurvey(uuid)).unwrap();
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <Typography variant="h5">Surveys</Typography>

                <Box>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        Create Survey
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => router.push(`/university/survey/response`)}
                    >
                        Latest Responses
                    </Button>
                </Box>
            </Box>

            {loading && <p>Loading...</p>}

            {surveys.map((survey: any) => (
                <Box key={survey.uuid} className={styles.card}>
                    <Box>
                        <Box className={styles.title}>{survey.title}</Box>
                        <Box className={styles.desc}>{survey.description}</Box>
                    </Box>
                    <Box>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => handleDelete(survey.uuid)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => router.push(`/university/survey/${survey.uuid}`)}
                        >
                            Create Question
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => router.push(`/university/survey/response/${survey.uuid}`)}
                        >
                            Check Student Responses
                        </Button>
                    </Box>
                </Box>
            ))}

            <CreateSurveyModal open={open} onClose={() => setOpen(false)} />
        </Box>
    );
}