Feature: Enroll Student to Class

    As an administrator
    I want to enrolle a student to a class
    So that I can assign them to assignments

    Scenario: Sucessfully enroll student to class
        Given I have a class room named "Math"
        And I have a student named "John Doe"
        When I send a request to enroll student to class
        Then The student should be enrolled to the class


