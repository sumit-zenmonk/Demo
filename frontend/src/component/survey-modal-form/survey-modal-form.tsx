"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks.ts";
import { SurveyFormData, surveySchema } from "@/schemas/university/schema";
import { createSurvey } from "@/redux/feature/university/universityAction";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateSurveyModal({ open, onClose }: Props) {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SurveyFormData>({
        resolver: zodResolver(surveySchema),
    });

    const onSubmit = async (data: SurveyFormData) => {
        await dispatch(createSurvey(data));
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create Survey</DialogTitle>

            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />

                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />

                <TextField
                    label="Target Program"
                    fullWidth
                    margin="normal"
                    {...register("target_program")}
                    error={!!errors.target_program}
                    helperText={errors.target_program?.message}
                />

                <TextField
                    type="date"
                    label="Start Date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    {...register("start_date")}
                    error={!!errors.start_date}
                    helperText={errors.start_date?.message}
                />

                <TextField
                    type="date"
                    label="End Date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    {...register("end_date")}
                    error={!!errors.end_date}
                    helperText={errors.end_date?.message}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}