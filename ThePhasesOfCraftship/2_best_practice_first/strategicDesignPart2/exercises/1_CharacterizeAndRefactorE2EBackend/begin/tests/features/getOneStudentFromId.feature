Feature: Get one Student from their Id

    As an administrator
    I want to retrieve one specific student
    So I can do something...

    Scenario: Sucessfully get one student from their Id
        Given I have a student named "john doe"
        When I send a request to retrieve john doe from their Id
        Then I receive all information about john doe
