package com.fittrackr.fitness_service.workout.controller;

import com.fittrackr.fitness_service.workout.dto.WorkoutRequest;
import com.fittrackr.fitness_service.workout.dto.WorkoutResponse;
import com.fittrackr.fitness_service.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WorkoutController {
    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping("/workouts")
    public WorkoutResponse createWorkout(@RequestBody @Valid WorkoutRequest request){
        return workoutService.createWorkout(request);
    }
}
