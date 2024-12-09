Feature: Grade Assignment

    As a teacher
    I want to grade an assignment a student submitted
    So student can get a feedback

    Scenario: Successfully grade assignment
        Given A student submitted an assignment
        When Teacher submit grade for assignment
        Then Assignment should be marked as graded
