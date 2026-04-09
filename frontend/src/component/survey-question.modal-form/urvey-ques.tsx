"use client";

import { Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem, Box, IconButton, FormControlLabel, Switch, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, useFieldArray } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks.ts";
import { createSurveyQuestion, getSurveys } from "@/redux/feature/university/universityAction";
import { SurveyQuestionTypeEnum } from "@/enums/survery.enum";
import { useEffect, useState } from "react";

export default function CreateQuestionModal({
    open,
    onClose,
    survey_uuid,
}: any) {
    const dispatch = useAppDispatch();
    const [submit, setSubmit] = useState(false);

    const { control, register, handleSubmit, watch } = useForm({
        defaultValues: {
            question: "",
            question_type: SurveyQuestionTypeEnum.INPUT,
            mandatory: true,
            options: [{ option: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    const questionType = watch("question_type");

    const onSubmit = async (data: any) => {
        await dispatch(createSurveyQuestion({ survey_uuid, ...data })).unwrap();
        setSubmit(true)
        onClose();
    };

    useEffect(() => {
        dispatch(getSurveys({}));
        setSubmit(false);
    }, [dispatch, submit]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add Question</DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    label="Question"
                    margin="normal"
                    {...register("question")}
                />

                <TextField
                    select
                    fullWidth
                    label="Question Type"
                    margin="normal"
                    {...register("question_type")}
                >
                    <MenuItem value={SurveyQuestionTypeEnum.INPUT}>text</MenuItem>
                    <MenuItem value={SurveyQuestionTypeEnum.MCQ}>mcq</MenuItem>
                    <MenuItem value={SurveyQuestionTypeEnum.RATING}>rating</MenuItem>
                </TextField>

                <FormControlLabel
                    control={<Switch {...register("mandatory")} defaultChecked />}
                    label="Mandatory Question"
                />

                {questionType === SurveyQuestionTypeEnum.MCQ && (
                    <Box mt={2}>
                        {fields.map((field, index) => (
                            <Box
                                key={field.id}
                                display="flex"
                                gap={1}
                                mb={1}
                            >
                                <TextField
                                    fullWidth
                                    label={`Option ${index + 1}`}
                                    {...register(`options.${index}.option`)}
                                />

                                <IconButton
                                    color="error"
                                    onClick={() => remove(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}

                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => append({ option: "" })}
                        >
                            Add Option
                        </Button>
                    </Box>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Create
                </Button>
            </DialogContent>
        </Dialog>
    );
}