Feature: Get All Students

    As an administrator
    I want to get all students
    So I can do something with this list...

    Scenario: Sucessfully get all students
        Given I have a list of students previously created
        When I send a request to get all of them
        Then I receive a formatted list of all students
