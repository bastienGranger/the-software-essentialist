Feature: Get Student Grades

    As a student
    I want to retrieve all my grades
    So I can follow my progress

    Scenario: Successfully retrieve student's grades
        Given A student has submitted assignments
        And A Teacher has grades the student's assignments
        When The Student requests their grades
        Then The student receive the list of all their grades
