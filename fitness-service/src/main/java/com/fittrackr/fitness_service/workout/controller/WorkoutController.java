package com.fittrackr.fitness_service.workout.controller;

import com.fittrackr.fitness_service.workout.dto.WorkoutRequest;
import com.fittrackr.fitness_service.workout.dto.WorkoutResponse;
import com.fittrackr.fitness_service.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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

    @GetMapping("/{id}")
    public WorkoutResponse getWorkoutById(@PathVariable Long id) {
        return workoutService.getWorkoutById(id);
    }

    @PutMapping("/{id}")
    public WorkoutResponse updateWorkout(@PathVariable Long id, @RequestBody @Valid WorkoutRequest request) {
        return workoutService.updateWorkout(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
    }
}