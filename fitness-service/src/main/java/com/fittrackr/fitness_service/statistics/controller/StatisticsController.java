package com.fittrackr.fitness_service.statistics.controller;

import com.fittrackr.fitness_service.statistics.dto.WorkoutStatisticsResponse;
import com.fittrackr.fitness_service.statistics.service.StatisticsService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/statistics")
@RestController
public class StatisticsController {
    private final StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/workouts")
    public WorkoutStatisticsResponse getWorkoutStatistics() {
        return statisticsService.getWorkoutStatistics();
    }
}

