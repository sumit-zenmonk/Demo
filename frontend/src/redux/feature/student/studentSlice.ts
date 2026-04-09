"use client";

import { createSlice } from "@reduxjs/toolkit";
import { getStudentResponses, getStudentSurveys, submitSurveyResponse } from "./studentAction";
import { StudentState } from "./tudentType";

const initialState: StudentState = {
    surveys: [],
    responses: [],
    total_surveys: 0,
    total_responses: 0,
    loading: false,
    error: null,
    status: "pending",
    submitLoading: false,
    submitSuccess: false,
};

const studentSlice = createSlice({
    name: "studentSurvey",
    initialState,
    reducers: {
        resetStudentSurvey: (state) => {
            state.surveys = [];
            state.total_surveys = 0;
            state.loading = false;
            state.error = null;
            state.status = "pending";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentSurveys.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(getStudentSurveys.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeed";
                state.surveys = action.payload.surveys;
                state.total_surveys = action.payload.total;
            })
            .addCase(getStudentSurveys.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
            })
            .addCase(submitSurveyResponse.pending, (state) => {
                state.submitLoading = true;
                state.submitSuccess = false;
            })
            .addCase(submitSurveyResponse.fulfilled, (state) => {
                state.submitLoading = false;
                state.submitSuccess = true;
            })
            .addCase(submitSurveyResponse.rejected, (state, action) => {
                state.submitLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getStudentResponses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStudentResponses.fulfilled, (state, action) => {
                state.loading = false;
                state.responses = action.payload.responses;
                state.total_responses = action.payload.total;
            })
            .addCase(getStudentResponses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetStudentSurvey } = studentSlice.actions;
export default studentSlice.reducer;