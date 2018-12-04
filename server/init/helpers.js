// const debug = require('debug')('markdown:init:helpers');

import { validationResult } from 'express-validator/check';
import HttpStatus from 'http-status-codes';

import { UnknownError, BadRequestError, RouteNotFoundError, InternalServerError } from '../error';
import { prettyJSON } from '../utils';

/**
 * Builds standard Error response object for API
 * @param  {Object} error Wrapped Error type Object
 * @return {Object}       Built Error Object
*/
function buildErrorResponse(error) {
    const e = {};
    for (let key in error) {
        if (key === 'Error' || key === 'constructor') continue;
        if (error.hasOwnProperty(key)) e[key] = error[key];
    }
    if (error.message) e.message = error.message;

    const response = {
        status: error.statusCode,
        error: e
    };

    delete response.error.statusCode;
    if (!response.error.type) response.error.type = HttpStatus.getStatusText(error.statusCode);

    return response;
}

/**
 *
 * @param  {Object} req         Express Request Object
 * @param  {Object} res         Express Response Object
 * @param  {Number} statusCode  Response HTTP status code
 * @param  {Object} message     Input message Object (or String)
 * @param  {Error}  err         Error message to be logged on the server
 * @return {Object}             Formatted message Object
 */
function buildApiResponse(req, res, statusCode = 200, message, err) {
    let response;

    // Build error response if message is an Error
    if (message && message instanceof Error) {
        response = buildErrorResponse(message);
    } else if (message && typeof message === 'object') { // Build standard response if not passed an object
        response = message;
    } else if (message) {
        if (statusCode.toString().startsWith('2')) { // String message mapping for success
            response = { message };
        } else if (statusCode.toString().startsWith('4') || statusCode.toString().startsWith('5')) { // String message mapping for error
            response = buildErrorResponse(new UnknownError(statusCode, message));
        }
    }

    // Build standard 404 response
    if (statusCode === HttpStatus.NOT_FOUND) {
        response = buildErrorResponse(new RouteNotFoundError(req.method));
    }

    // Build standard 500 response
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
        response = buildErrorResponse(new InternalServerError());
    }

    // debug(`Sending API response: Status Code: ${statusCode}, Response:\n${prettyJSON(response)}`);

    if (err) debug(err); // Log the error if we have it

    return res.status(statusCode).json(response);
}
exports.buildApiResponse = buildApiResponse;

/**
 * Formats Express request validation errors from express-validator
 * @param  {Array.Object} results Errors from validationResult
 * @return {Object}               Formatted error response
 */
function formatValidationResult(results) {
    const errors = [];
    for (let result of results) {
        if (result.msg !== 'Invalid value' && result.msg !== 'Invalid value(s)') errors.push(result.msg);
        if (result.nestedErrors) {
            for (let nested of result.nestedErrors) {
                if (nested.msg !== 'Invalid value' && nested.msg !== 'Invalid value(s)') errors.push(nested.msg);
            }
        }
    }

    const message = errors.length > 0 ? errors[0] : 'An unknown error occurred';
    return new BadRequestError(message);
}

/**
 * Handles the validationResult provided by express-validator, returns API error if any errors were present
 * @param  {Object} req  Express Request Object
 * @param  {Object} res  Express Response Object
 * @return  {Object}     Builds API response containing errors if they exist, undefined otherwise
 */
exports.handleValidationErrors = (req, res) => {
    // Check input validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return buildApiResponse(req, res, HttpStatus.BAD_REQUEST, formatValidationResult(errors.array({ onlyFirstError: true })));
    }

    return undefined;
};

// Middleware wrapper for handleValidationErrors
exports.handleErrors = (req, res, next) => {
    if (exports.handleValidationErrors(req, res)) return;
    next();
};

/**
 * Handles API response when a server error is thrown intentionally or unintentionally
 * @param  {Object} req  Express Request Object
 * @param  {Object} res  Express Response Object
 * @param  {Error}  err  Error object
 */
exports.handleServerError = (req, res, err) => {
    if (err instanceof BadRequestError || BadRequestError.prototype.isPrototypeOf(err)) {
        buildApiResponse(req, res, HttpStatus.BAD_REQUEST, err);
    } else {
        buildApiResponse(req, res, HttpStatus.INTERNAL_SERVER_ERROR, undefined, err);
    }
};

/**
 * Handles API response when a route requires authorization
 * @param  {Object}   req   Express Request Object
 * @param  {Object}   res   Express Response Object
 * @param  {Function} next  Next middleware
 * @return  {Function} API Response
 */
exports.requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return buildApiResponse(req, res, HttpStatus.UNAUTHORIZED, 'You do not have access to this resource');
};
