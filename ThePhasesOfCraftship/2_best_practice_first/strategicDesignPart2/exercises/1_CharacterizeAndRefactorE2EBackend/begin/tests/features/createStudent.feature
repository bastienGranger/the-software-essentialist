Feature: Create Student

    As an administrator
    I want to create a student
    So that I can assign them to studentes and assignments

    Scenario: Sucessfully create a student
        Given I want to create a student named "John Doe" with email "john.doe@gmail.com"
        When I send a request to create a student
        Then The student should be created successfully

    Scenario: Fail to create a student when no name is provided
        Given I want to create a student with no name
        When I send a request to create a student
        Then The student should not be created

    Scenario: Fail to create a student when no email is provided
        Given I want to create a student with no name
        When I send a request to create a student
        Then The student should not be created

    Scenario: Fail to create a student when a student with the same email already exists
        Given I previously created a student with email "john.doe@gmail.com"
        When I send a request to create a student with the same email
        Then The student should not be created
