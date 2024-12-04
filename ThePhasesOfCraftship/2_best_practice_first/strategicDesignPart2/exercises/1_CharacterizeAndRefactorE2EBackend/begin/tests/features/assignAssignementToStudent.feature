Feature: Assign an assignment to a student

    As a teacher
    I want to assign a student to an assignment
    So that the student can achieve learning objectives

    Scenario: Assign a student to an assignment
        Given There is an existing student enrolled to a class
        And An assignment exists for the class
        When I assign the student the assignment
        Then The student should be assigned to the assignment
