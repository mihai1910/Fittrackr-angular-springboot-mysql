package com.fittrackr.fitness_service.exercise.service;

import com.fittrackr.fitness_service.exercise.dto.ExerciseRequest;
import com.fittrackr.fitness_service.exercise.dto.ExerciseResponse;
import com.fittrackr.fitness_service.exercise.model.Exercise;
import com.fittrackr.fitness_service.exercise.model.ExerciseCategory;
import com.fittrackr.fitness_service.exercise.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public ExerciseResponse createExercise(ExerciseRequest request) {
        Exercise exercise = new Exercise();
        exercise.setName(request.getName());
        exercise.setCategory(ExerciseCategory.valueOf(request.getCategory().trim().toUpperCase()));
        exercise.setSets(request.getSets());
        exercise.setReps(request.getReps());
        exercise.setWeight(request.getWeight());
        exercise.setWorkoutId(request.getWorkoutId());

        Exercise saved = exerciseRepository.save(exercise);
        return toResponse(saved);
    }

    public List<ExerciseResponse> getAllExercises() {
        return exerciseRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ExerciseResponse> getExercisesByWorkoutId(Long workoutId) {
        return exerciseRepository.findByWorkoutId(workoutId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));
        return toResponse(exercise);
    }

    public ExerciseResponse updateExercise(Long id, ExerciseRequest request) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));

        exercise.setName(request.getName());
        exercise.setCategory(ExerciseCategory.valueOf(request.getCategory().trim().toUpperCase()));
        exercise.setSets(request.getSets());
        exercise.setReps(request.getReps());
        exercise.setWeight(request.getWeight());
        exercise.setWorkoutId(request.getWorkoutId());

        Exercise saved = exerciseRepository.save(exercise);
        return toResponse(saved);
    }

    public void deleteExercise(Long id) {
        if (!exerciseRepository.existsById(id)) {
            throw new RuntimeException("Exercise not found with id: " + id);
        }
        exerciseRepository.deleteById(id);
    }

    private ExerciseResponse toResponse(Exercise exercise) {
        ExerciseResponse response = new ExerciseResponse();
        response.setId(exercise.getId());
        response.setName(exercise.getName());
        response.setCategory(exercise.getCategory().name());
        response.setSets(exercise.getSets());
        response.setReps(exercise.getReps());
        response.setWeight(exercise.getWeight());
        response.setWorkoutId(exercise.getWorkoutId());
        return response;
    }
}

