"use client"

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const createSurvey = createAsyncThunk(
    "survey/create",
    async (payload: any, { getState, rejectWithValue }: any) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(`${API_URL}/university/survey`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return data.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const getSurveys = createAsyncThunk(
    "survey/getAll",
    async (
        { limit = 10, offset = 0 }: { limit?: number; offset?: number },
        { getState, rejectWithValue }: any
    ) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(
                `${API_URL}/university/survey?limit=${limit}&offset=${offset}`,
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

export const deleteSurvey = createAsyncThunk(
    "survey/delete",
    async (uuid: string, { getState, rejectWithValue }: any) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(
                `${API_URL}/university/survey/${uuid}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return uuid;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const createSurveyQuestion = createAsyncThunk(
    "question/create",
    async (payload, { getState, rejectWithValue }: any) => {
        try {
            const token = getState().authReducer.token;

            const res = await fetch(
                `${API_URL}/university/survey/question`,
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

export const deleteSurveyQuestion = createAsyncThunk(
    "survey/question/delete",
    async (uuid: string, { getState, rejectWithValue }: any) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(
                `${API_URL}/university/survey/question/${uuid}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return uuid;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const getResponses = createAsyncThunk(
    "response/getAll",
    async (
        { limit = 10, offset = 0 }: { limit?: number; offset?: number },
        { getState, rejectWithValue }: any
    ) => {
        try {
            const token = (getState() as RootState).authReducer.token;

            const res = await fetch(
                `${API_URL}/university/response?limit=${limit}&offset=${offset}`,
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