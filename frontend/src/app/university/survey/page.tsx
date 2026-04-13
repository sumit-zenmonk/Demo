"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Typography, Box, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import styles from "./survey.module.css";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { deleteSurvey, getResponses, getSurveys } from "@/redux/feature/university/universityAction";
import CreateSurveyModal from "@/component/survey-modal-form/survey-modal-form";
import { useRouter } from "next/navigation";
import { getActiveobj } from "@/services/filter.survey";
import { toLowerCase } from "zod";

export default function SurveyPage() {
    const dispatch = useAppDispatch();
    const { surveys, loading } = useAppSelector((state: RootState) => state.unniversityReducer);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [filterExpiry, setFilterExpiry] = useState('all');
    const [filterProgramme, setFilterProgramme] = useState('all');

    useEffect(() => {
        dispatch(getSurveys({}));
        dispatch(getResponses({}));
    }, [dispatch]);

    const filtered_surveys = useMemo(() => {
        let data = getActiveobj(surveys, filterExpiry);
        if (filterProgramme == 'all') return data;
        return data.filter((item: any) => item.target_program.toLowerCase() == filterProgramme.toLowerCase());
    }, [surveys, filterExpiry, filterProgramme]);

    const handleDelete = async (uuid: string) => {
        await dispatch(deleteSurvey(uuid)).unwrap();
    };

    const handleFilterExpiry = (event: SelectChangeEvent) => {
        setFilterExpiry(event.target.value as string);
    };

    const handleFilterProgramme = (event: SelectChangeEvent) => {
        setFilterProgramme(event.target.value as string);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <Typography variant="h5">Surveys</Typography>

                <Box>
                    <Select
                        value={filterExpiry}
                        label="Filter"
                        onChange={handleFilterExpiry}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'active'}>Active</MenuItem>
                        <MenuItem value={'expired'}>Expired</MenuItem>
                    </Select>
                    <Select
                        value={filterProgramme}
                        label="Filter"
                        onChange={handleFilterProgramme}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'btech'}>Btech</MenuItem>
                        <MenuItem value={'mtech'}>Mtech</MenuItem>
                        <MenuItem value={'bca'}>Bca</MenuItem>
                    </Select>
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

            {filtered_surveys && filtered_surveys.map((survey: any) => (
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