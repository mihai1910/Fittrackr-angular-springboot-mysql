package com.fittrackr.fitness_service.workout.controller;

import com.fittrackr.fitness_service.workout.dto.WorkoutRequest;
import com.fittrackr.fitness_service.workout.dto.WorkoutResponse;
import com.fittrackr.fitness_service.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/workouts")
@RestController
public class WorkoutController {
    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public WorkoutResponse createWorkout(@RequestBody @Valid WorkoutRequest request){
        return workoutService.createWorkout(request);
    }

    @GetMapping
    public List<WorkoutResponse> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

}