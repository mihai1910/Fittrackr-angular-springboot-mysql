package com.fittrackr.fitness_service.exercise.controller;

import com.fittrackr.fitness_service.exercise.dto.ExerciseRequest;
import com.fittrackr.fitness_service.exercise.dto.ExerciseResponse;
import com.fittrackr.fitness_service.exercise.service.ExerciseService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/exercises")
@RestController
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping
    public ExerciseResponse createExercise(@RequestBody @Valid ExerciseRequest request) {
        return exerciseService.createExercise(request);
    }

    @GetMapping
    public List<ExerciseResponse> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/workout/{workoutId}")
    public List<ExerciseResponse> getExercisesByWorkoutId(@PathVariable Long workoutId) {
        return exerciseService.getExercisesByWorkoutId(workoutId);
    }

    @GetMapping("/{id}")
    public ExerciseResponse getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id);
    }

    @PutMapping("/{id}")
    public ExerciseResponse updateExercise(@PathVariable Long id, @RequestBody @Valid ExerciseRequest request) {
        return exerciseService.updateExercise(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
    }
}

