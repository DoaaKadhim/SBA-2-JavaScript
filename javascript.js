// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  if (ag.course_id !== course.id) {
    throw new Error('assignment group does not belong to the course');
  }

  const assignmentPoints = {};
  ag.assignments.forEach(assignment => {
    if (typeof assignment.points_possible !== 'number' || assignment.points_possible <= 0) {
      throw new Error(`Assignment ${assignment.id} has invalid points_possible`);
    } else {
      assignmentPoints[assignment.id] = assignment.points_possible;
    }
  });
  //--------------------------------------------------
  // create obj to learner submissions by learner-id
  const learnerScores = {};
  let index = 0;
  while (index < submissions.length) {
    const submission = submissions[index];
    try {
      const { learner_id, assignment_id, submission: { submitted_at, score } } = submission;

      if (typeof learner_id !== 'number' || typeof assignment_id !== 'number' || typeof score !== 'number') {
        throw new Error('invalid data submission');
      }
      if (assignmentPoints[assignment_id] === undefined) {
        index++;
      } else {
        const pointsPossible = assignmentPoints[assignment_id];

        //due date part
        let dueDate = '';
        for (let i = 0; i < ag.assignments.length; i++) {
          if (ag.assignments[i].id === assignment_id) {
            dueDate = ag.assignments[i].due_at;
            break;
          }
        }
        const isSubmissionLate = isLate(submitted_at, dueDate);
        const finalScore = isSubmissionLate ? score - (pointsPossible * 0.10) : score;
        if (isSubmissionLate) {
          throw new Error(`Submission for assignment ${assignment_id} by learner ${learner_id} is late`);
        }

        if (!learnerScores[learner_id]) {
          learnerScores[learner_id] = { totalWeight: 0, totalScore: 0, scores: {} };
        }

        learnerScores[learner_id].totalWeight += pointsPossible;
        learnerScores[learner_id].totalScore += Math.max(0, finalScore);
        learnerScores[learner_id].scores[assignment_id] = finalScore / pointsPossible;
      }
    } catch (error) {
      console.error('Error processing submission:', error.message);
    }
    index++;
  }

  //iterate through object.
  const result = [];
  Object.keys(learnerScores).forEach(learner_id => {
    const data = learnerScores[learner_id];
    const average = calculateWeightedAverage(data);
    const learnerResult = { id: learner_id, avg: parseFloat(average.toFixed(3)) };

    Object.keys(data.scores).forEach(assignment_id => {
      const score = data.scores[assignment_id];
      learnerResult[assignment_id] = parseFloat(score.toFixed(3));

    });

    result.push(learnerResult);
  });

  return result;
}

function isLate(submittedAt, dueAt) {
  return new Date(submittedAt) > new Date(dueAt);
}

function calculateWeightedAverage(learnerData) {
  return learnerData.totalWeight === 0 ? 0 : (learnerData.totalScore / learnerData.totalWeight) * 100;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);




