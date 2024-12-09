Feature: Retrieve Assignment From Id

    As a teacher
    I want to retrieve a specific assignment
    So I can view details of a specific assignment

    Scenario: Successfully retrieving an assignment
        Given I have previously created an assignment
        When I request the assignment with its id
        Then I should receive the assignment's details

