"use client"

import { createSlice } from "@reduxjs/toolkit";
import { UniversityState } from "./universityType";
import { createSurvey, deleteSurvey, getResponses, getSurveys } from "./universityAction";

const initialState: UniversityState = {
    surveys: [],
    responses: [],
    total_survey: 0,
    total_response: 0,
    loading: false,
    error: null,
    status: "pending",
};

const surveySlice = createSlice({
    name: "survey",
    initialState,
    reducers: {
        resetSurvey: (state) => {
            state.surveys = [];
            state.total_survey = 0;
            state.loading = false;
            state.error = null;
            state.status = "pending";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSurvey.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(createSurvey.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeed";
                state.surveys.unshift(action.payload);
            })
            .addCase(createSurvey.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
            })
            .addCase(getSurveys.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(getSurveys.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeed";
                state.surveys = action.payload.surveys;
                state.total_survey = action.payload.total;
            })
            .addCase(getSurveys.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
            })
            .addCase(deleteSurvey.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(deleteSurvey.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeed";
                state.surveys = state.surveys.filter(
                    (s) => s.uuid !== action.payload
                );
            })
            .addCase(deleteSurvey.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
            })
            .addCase(getResponses.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(getResponses.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeed";
                state.responses = action.payload.responses;
                state.total_response = action.payload.total;
            })
            .addCase(getResponses.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
            })
    },
});

export const { resetSurvey } = surveySlice.actions;
export default surveySlice.reducer;