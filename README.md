# JavaScript Assignment

## Objectives

- **Basic Syntax:** Employ JavaScript syntax accurately.
- **Control Flow:** Implement control flow structures such as conditionals and loops.
- **Data Management:** Use arrays and objects to organize and manage data.
- **Reusable Code:** Develop functions for reusable code.
- **Iteration:** Utilize loops to navigate through data collections.
- **Error Handling:** Implement error handling for code failures and data validation.

## Functionality

### `getLearnerData()`

- **Parameters:**
  - `CourseInfo`: Information about the course.
  - `AssignmentGroup`: Details about the assignment group.
  - `[LearnerSubmission]`: Array of learner submissions.

- **Returns:** An array of objects with formatted results.

### Error Handling

- **Invalid `AssignmentGroup`:** Throws an error if the assignment group does not belong to its course (`course_id` mismatch).
- **Data Validation:** Handles potential errors such as division by zero and incorrect data types using `try/catch`.
- **Late Submissions:** Deducts 10% of the total points for assignments submitted past the due date.
- **Not Due Assignments:** Excludes assignments that are not yet due from results and average calculations.
# SBA-2-JavaScript
