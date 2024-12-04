Feature: create Assignment for Class

    As a teacher
    I want to create an assignemnt for my class
    So I can assign my students to it

    Scenario: Sucessfully create an assignment
        Given I have a class room
        When I create a assignment for the class
        Then The assignment should be created successfully
