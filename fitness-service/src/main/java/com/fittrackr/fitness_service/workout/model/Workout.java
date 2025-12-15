package com.fittrackr.fitness_service.workout.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table (name= "workouts")
public class Workout {

        public Workout(){}

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotNull
        @Enumerated(EnumType.STRING)
        private WorkoutType type;

        @Min(45)
        private int durationMinutes;

        @NotNull
        private LocalDate date;

        public void setId(Long id){
                this.id = id;
        }
        public Long getId() {
                return id;
        }

        public void setType(WorkoutType type) {
                this.type = type;
        }
        public WorkoutType getType() {
                return type;
        }

        public void setDurationMinutes( int durationMinutes ){
                this.durationMinutes = durationMinutes;
        }
        public int getDurationMinutes() {
                return durationMinutes;
        }

        public void setDate(LocalDate date) {
                this.date = date;
        }
        public LocalDate getDate() { return date; }
}
