package com.fittrackr.fitness_service.statistics.dto;

import java.util.Map;

public class WorkoutStatisticsResponse {
    private int totalWorkouts;
    private int totalDuration;
    private Map<String, Integer> workoutsByType;
    private double averageDuration;
    private int workoutsThisMonth;

    public int getTotalWorkouts() {
        return totalWorkouts;
    }

    public void setTotalWorkouts(int totalWorkouts) {
        this.totalWorkouts = totalWorkouts;
    }

    public int getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(int totalDuration) {
        this.totalDuration = totalDuration;
    }

    public Map<String, Integer> getWorkoutsByType() {
        return workoutsByType;
    }

    public void setWorkoutsByType(Map<String, Integer> workoutsByType) {
        this.workoutsByType = workoutsByType;
    }

    public double getAverageDuration() {
        return averageDuration;
    }

    public void setAverageDuration(double averageDuration) {
        this.averageDuration = averageDuration;
    }

    public int getWorkoutsThisMonth() {
        return workoutsThisMonth;
    }

    public void setWorkoutsThisMonth(int workoutsThisMonth) {
        this.workoutsThisMonth = workoutsThisMonth;
    }
}

