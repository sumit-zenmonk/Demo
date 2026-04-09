"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent, IconButton, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import CreateQuestionModal from "@/component/survey-question.modal-form/urvey-ques";
import { RootState } from "@/redux/store";
import { deleteSurveyQuestion } from "@/redux/feature/university/universityAction";

export default function SurveyQuestionsPage() {
    const { uuid } = useParams();
    const dispatch = useAppDispatch();
    const { surveys, loading } = useAppSelector((state: RootState) => state.unniversityReducer);
    const [open, setOpen] = useState(false);

    const handleDelete = async (id: string) => {
        await dispatch(deleteSurveyQuestion(id)).unwrap();
    };

    const survey = surveys.find((s) => s.uuid === uuid);

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h5">Survey Questions</Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                >
                    Add Question
                </Button>
            </Box>

            {loading && <Typography>Loading...</Typography>}

            {survey?.questions?.map((q: any) => (
                <Card key={q.uuid} sx={{ mb: 2 }}>
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography fontWeight="bold">
                                {q.question}
                            </Typography>
                            <Typography color="text.secondary">
                                Type: {q.question_type}
                            </Typography>
                        </Box>

                        <IconButton
                            color="error"
                            onClick={() => handleDelete(q.uuid)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}

            <CreateQuestionModal
                open={open}
                onClose={() => setOpen(false)}
                survey_uuid={uuid as string}
            />
        </Box>
    );
}