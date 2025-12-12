package com.fittrackr.fitness_service.workout.repository;

import com.fittrackr.fitness_service.workout.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
