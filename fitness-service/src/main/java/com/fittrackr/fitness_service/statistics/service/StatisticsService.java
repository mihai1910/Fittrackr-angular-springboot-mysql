package com.fittrackr.fitness_service.statistics.service;

import com.fittrackr.fitness_service.statistics.dto.WorkoutStatisticsResponse;
import com.fittrackr.fitness_service.workout.model.Workout;
import com.fittrackr.fitness_service.workout.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsService {
    private final WorkoutRepository workoutRepository;

    public StatisticsService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public WorkoutStatisticsResponse getWorkoutStatistics() {
        List<Workout> allWorkouts = workoutRepository.findAll();
        
        WorkoutStatisticsResponse stats = new WorkoutStatisticsResponse();
        stats.setTotalWorkouts(allWorkouts.size());
        
        int totalDuration = allWorkouts.stream()
                .mapToInt(Workout::getDurationMinutes)
                .sum();
        stats.setTotalDuration(totalDuration);
        
        double avgDuration = allWorkouts.isEmpty() ? 0.0 : 
                (double) totalDuration / allWorkouts.size();
        stats.setAverageDuration(avgDuration);
        
        Map<String, Integer> byType = new HashMap<>();
        for (Workout workout : allWorkouts) {
            String type = workout.getType().name();
            byType.put(type, byType.getOrDefault(type, 0) + 1);
        }
        stats.setWorkoutsByType(byType);
        
        YearMonth currentMonth = YearMonth.now();
        long thisMonth = allWorkouts.stream()
                .filter(w -> {
                    LocalDate date = w.getDate();
                    return YearMonth.from(date).equals(currentMonth);
                })
                .count();
        stats.setWorkoutsThisMonth((int) thisMonth);
        
        return stats;
    }
}

