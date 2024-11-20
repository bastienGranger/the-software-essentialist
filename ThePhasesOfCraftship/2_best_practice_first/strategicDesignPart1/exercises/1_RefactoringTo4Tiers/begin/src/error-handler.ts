import { NextFunction, Request, Response } from "express";

export class InvalidRequestBodyException extends Error {
  constructor(missingKeys: string[]) {
    super("Body is missing required key: " + missingKeys.join(", "));
  }
}

export class StudentNotFoundException extends Error {
  constructor() {
    super("Student not found");
  }
}

export class ClassNotFoundException extends Error {
  constructor(id: string) {
    super(`export class with id ${id} not found`);
  }
}

export class StudentAlreadyEnrolledException extends Error {
  constructor() {
    super("Student is already enrolled in class");
  }
}

export class AssignmentNotFoundException extends Error {
  constructor() {
    super("Assignment not found");
  }
}

export class StudentAssignmentNotFoundException extends Error {
  constructor() {
    super(
      "Student assignment not found. Please, make sure the student is assigned to the assignment.",
    );
  }
}

const ErrorExceptionType = {
  ValidationError: "ValidationError",
  StudentNotFound: "StudentNotFound",
  ClassNotFound: "ClassNotFound",
  AssignmentNotFound: "AssignmentNotFound",
  ServerError: "ServerError",
  ClientError: "ClientError",
  StudentAlreadyEnrolled: "StudentAlreadyEnrolled",
  StudentAssignmentNotFoundException: "StudentAssignmentNotFoundException",
};

export type ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => Response;

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof InvalidRequestBodyException) {
    return res.status(400).json({
      error: ErrorExceptionType.ValidationError,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof StudentNotFoundException) {
    return res.status(404).json({
      error: ErrorExceptionType.StudentNotFound,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof ClassNotFoundException) {
    return res.status(404).json({
      error: ErrorExceptionType.ClassNotFound,
      data: undefined,
      success: false,
    });
  }

  if (error instanceof StudentAlreadyEnrolledException) {
    return res.status(400).json({
      error: ErrorExceptionType.StudentAlreadyEnrolled,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof AssignmentNotFoundException) {
    return res.status(400).json({
      error: ErrorExceptionType.AssignmentNotFound,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof StudentAssignmentNotFoundException) {
    return res.status(400).json({
      error: ErrorExceptionType.StudentAssignmentNotFoundException,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    error: ErrorExceptionType.ServerError,
    data: undefined,
    success: false,
    message: error.message,
  });
}
