package com.fittrackr.fitness_service.workout.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class WorkoutRequest {
    @NotBlank
    private String type;

    @Min(45)
    private int durationMinutes;

    @NotBlank
    private String date;

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }
}
