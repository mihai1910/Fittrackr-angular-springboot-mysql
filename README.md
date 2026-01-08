# FitTrackr - Fitness Tracking Application

Hey! This is my fitness tracking app that I built to learn Angular and Spring Boot. It's basically a full-stack app where you can track your workouts, log exercises, and see some cool stats about your fitness journey.

## What It Does

So the idea is pretty simple - you can:
- Create workouts (Push, Pull, or Legs days)
- Add exercises to each workout with sets, reps, and weight
- View all your workouts in a nice dashboard
- See statistics like total workouts, duration, averages, etc.
- Browse all exercises you've done

It's like a personal trainer app but way simpler and I built it myself!

## Tech Stack

### Frontend
- **Angular 21** - The latest Angular with standalone components (no NgModules!)
- **Tailwind CSS** - For styling (makes everything look pretty)
- **TypeScript** - Because JavaScript wasn't enough
- **RxJS** - For handling async stuff and observables

### Backend
- **Java 21** - Using the latest Java features
- **Spring Boot 4.0** - Makes building REST APIs way easier
- **Spring Data JPA** - Handles all the database stuff
- **MySQL** - The database where everything is stored
- **Maven** - For dependency management

## Features I Implemented

### Workout Management
- Create, read, update, delete workouts (full CRUD)
- Each workout has a type (Push/Pull/Legs), duration, and date
- Nice card-based UI to view all workouts

### Exercise Tracking
- Add exercises to workouts
- Track sets, reps, and weight for each exercise
- Exercise categories (Chest, Back, Shoulders, Arms, Legs, Core, Cardio, Full Body)
- View all exercises across all workouts

### Dashboard
- Statistics cards showing:
  - Total workouts
  - Total duration
  - Average duration
  - Workouts this month
- Breakdown by workout type
- Recent activity feed

### Angular Features I Used
- **Routing** - Multiple pages with navigation
- **Reactive Forms** - For creating/editing workouts and exercises
- **HTTP Interceptors** - For error handling and logging
- **Custom Pipes** - For formatting duration (like "2 hr 30 min")
- **Route Guards** - Structure for authentication (not fully implemented yet)
- **Standalone Components** - Modern Angular approach
- **Router Subscriptions** - Components reload data when you navigate back (makes it feel more "stateful")

## How to Run This Thing

### Prerequisites
- Node.js and npm (for Angular)
- Java 21 JDK
- Maven
- MySQL running locally

### Database Setup
1. Create a MySQL database called `fitness`
2. Update the connection details in `fitness-service/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/fitness
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
3. Spring Boot will auto-create the tables (thanks to `spring.jpa.hibernate.ddl-auto=update`)

### Running the Backend
```bash
cd fitness-service
./mvnw spring-boot:run
```
The API will be available at `http://localhost:8080`

### Running the Frontend
```bash
cd client
npm install  # First time only
npm start
```
The app will be available at `http://localhost:4200`

The Angular dev server is configured to proxy API requests to the backend, so everything should work seamlessly.

## API Endpoints

### Workouts
- `GET /workouts` - Get all workouts
- `GET /workouts/{id}` - Get workout by ID
- `POST /workouts` - Create a new workout
- `PUT /workouts/{id}` - Update a workout
- `DELETE /workouts/{id}` - Delete a workout

### Exercises
- `GET /exercises` - Get all exercises
- `GET /exercises/{id}` - Get exercise by ID
- `GET /exercises/workout/{workoutId}` - Get exercises for a workout
- `POST /exercises` - Create a new exercise
- `PUT /exercises/{id}` - Update an exercise
- `DELETE /exercises/{id}` - Delete an exercise

### Statistics
- `GET /statistics/workouts` - Get workout statistics

## Things I Struggled With

- Getting components to update automatically when navigating back (solved with router subscriptions)
- Understanding Angular's change detection (still learning!)
- Setting up the proxy configuration for API calls
- Making sure data refreshes after create/update/delete operations

## Future Improvements

If I had more time, I'd add:
- User authentication (login/signup)
- User profiles
- Workout templates/routines
- Progress charts and graphs
- Export data to CSV/PDF
- Mobile app version
- Social features (share workouts, follow friends)
- Exercise library with descriptions and images

## Notes

- The app uses CORS to allow the frontend to talk to the backend
- All dates are stored as LocalDate in Java and strings in Angular (could be improved)
- No authentication yet, so it's basically a single-user app
- The database password is in the properties file (not secure, but fine for local dev)

---

Built with ❤️ and lots of coffee ☕
