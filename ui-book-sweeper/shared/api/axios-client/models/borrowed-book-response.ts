/* tslint:disable */
/* eslint-disable */
/**
 * OpenApi specification
 * OpenApi documentation
 *
 * The version of the OpenAPI document: 1.0
 * Contact: gpatrik101@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface BorrowedBookResponse
 */
export interface BorrowedBookResponse {
    /**
     * 
     * @type {number}
     * @memberof BorrowedBookResponse
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof BorrowedBookResponse
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof BorrowedBookResponse
     */
    'authorName'?: string;
    /**
     * 
     * @type {string}
     * @memberof BorrowedBookResponse
     */
    'isbn'?: string;
    /**
     * 
     * @type {number}
     * @memberof BorrowedBookResponse
     */
    'rate'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof BorrowedBookResponse
     */
    'returned'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof BorrowedBookResponse
     */
    'returnApproved'?: boolean;
}

