"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getStudentSurveys = createAsyncThunk(
    "studentSurvey/getAll",
    async (
        { limit = 10, offset = 0 }: { limit?: number; offset?: number },
        { getState, rejectWithValue }: any
    ) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(
                `${API_URL}/student/survey?limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return {
                surveys: data.data.data,
                total: data.data.total,
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const submitSurveyResponse = createAsyncThunk(
    "studentSurvey/submit",
    async (
        payload: {
            survey_uuid: string;
            responses: { question_uuid: string; answer: string }[];
        },
        { getState, rejectWithValue }: any
    ) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(
                `${API_URL}/student/response`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const getStudentResponses = createAsyncThunk(
    "studentResponses/getAll",
    async (
        { limit = 10, offset = 0 }: { limit?: number; offset?: number },
        { getState, rejectWithValue }: any
    ) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(
                `${API_URL}/student/response?limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return {
                responses: data.data.data,
                total: data.data.total,
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);