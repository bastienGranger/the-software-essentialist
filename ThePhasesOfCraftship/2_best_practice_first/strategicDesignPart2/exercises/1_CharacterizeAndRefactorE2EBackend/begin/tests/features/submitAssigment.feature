Feature: Submit Assignment

    As a student
    I want to submit an assignment
    So that I can get a grade

    Scenario: Sucessfully submit assignment
        Given A student enrolled in a class
        And An assignment assigned to a class and a student
        When The student submit his assignment
        Then The assignment should be submitted
