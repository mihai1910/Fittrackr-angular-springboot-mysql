package com.fittrackr.fitness_service.workout.service;

import com.fittrackr.fitness_service.workout.dto.WorkoutRequest;
import com.fittrackr.fitness_service.workout.dto.WorkoutResponse;
import com.fittrackr.fitness_service.workout.model.Workout;
import com.fittrackr.fitness_service.workout.model.WorkoutType;
import com.fittrackr.fitness_service.workout.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public WorkoutResponse createWorkout(WorkoutRequest request) {
        Workout workout = new Workout();

        workout.setType(WorkoutType.valueOf(request.getType().trim().toUpperCase()));

        workout.setDurationMinutes(request.getDurationMinutes());

        workout.setDate(LocalDate.parse(request.getDate()));
        Workout saved = workoutRepository.save(workout);

        WorkoutResponse response = new WorkoutResponse();
        response.setId(saved.getId());
        response.setType(saved.getType().name());
        response.setDurationMinutes(saved.getDurationMinutes());
        response.setDate(saved.getDate().toString());

        return response;
    }
}
