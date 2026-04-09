"use client";

import { useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, RadioGroup, FormControlLabel, Radio, Rating, } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { getStudentSurveys, submitSurveyResponse, } from "@/redux/feature/student/studentAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { SurveyQuestionTypeEnum } from "@/enums/survery.enum";

export default function SurveyPage() {
    const { uuid } = useParams();
    const surveyId = Array.isArray(uuid) ? uuid[0] : uuid;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { surveys, loading, submitLoading, responses } = useAppSelector((state: RootState) => state.studentReducer);
    const { control, handleSubmit } = useForm();

    const alreadySubmitted = responses?.some((r: any) => r.survey_uuid === surveyId);
    const survey = surveys.find((s) => s.uuid === surveyId);

    useEffect(() => {
        dispatch(getStudentSurveys({}));
    }, [dispatch]);

    const onSubmit = async (data: any) => {
        if (!survey || alreadySubmitted) return;

        const payload = {
            survey_uuid: survey.uuid,
            responses: Object.keys(data).map((question_uuid) => ({
                question_uuid,
                answer: String(data[question_uuid]),
            })),
        };

        await dispatch(submitSurveyResponse(payload));
        router.push("/student/survey");
    };

    if (loading || !survey) return <p className={styles.loading}>Loading...</p>;

    return (
        <Box className={styles.container}>
            <Paper className={styles.card} elevation={2}>
                <Typography variant="h5" className={styles.title}>
                    {survey.title}
                </Typography>

                <Typography className={styles.description}>
                    {survey.description}
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {survey.questions.map((q: any) => (
                        <Box key={q.uuid} className={styles.question}>
                            <Typography className={styles.label}>
                                {q.question} {q.mandatory && "*"}
                            </Typography>

                            {q.question_type === SurveyQuestionTypeEnum.INPUT && (
                                <Controller
                                    name={q.uuid}
                                    control={control}
                                    rules={{
                                        required: q.mandatory ? "This field is required" : false,
                                    }}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            )}

                            {q.question_type === SurveyQuestionTypeEnum.MCQ && (
                                <Controller
                                    name={q.uuid}
                                    control={control}
                                    rules={{
                                        required: q.mandatory ? "Select one option" : false,
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <RadioGroup {...field}>
                                                {q.options?.map((opt: any) => (
                                                    <FormControlLabel
                                                        key={opt.uuid}
                                                        value={opt.option}
                                                        control={<Radio />}
                                                        label={opt.option}
                                                    />
                                                ))}
                                            </RadioGroup>
                                            {fieldState.error && (
                                                <Typography color="error" variant="caption">
                                                    {fieldState.error.message}
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                />
                            )}

                            {q.question_type === SurveyQuestionTypeEnum.RATING && (
                                <Controller
                                    name={q.uuid}
                                    control={control}
                                    defaultValue={null}
                                    rules={{
                                        required: q.mandatory ? "Please select a rating" : false,
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Rating
                                                {...field}
                                                value={field.value ?? 0}
                                                onChange={(_, val) => field.onChange(val)}
                                            />
                                            {fieldState.error && (
                                                <Typography color="error" variant="caption">
                                                    {fieldState.error.message}
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                />
                            )}
                        </Box>
                    ))}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className={styles.button}
                        disabled={submitLoading || alreadySubmitted}
                    >
                        {alreadySubmitted ? "Already Submitted" : submitLoading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}