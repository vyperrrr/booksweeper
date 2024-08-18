/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
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


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { FeedbackRequest } from '../models';
// @ts-ignore
import { PageResponseFeedbackResponse } from '../models';
/**
 * FeedbackApi - axios parameter creator
 * @export
 */
export const FeedbackApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} bookId 
         * @param {number} [page] 
         * @param {number} [size] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllFeedbacksByBook: async (bookId: number, page?: number, size?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bookId' is not null or undefined
            assertParamExists('findAllFeedbacksByBook', 'bookId', bookId)
            const localVarPath = `/feedback/book/{bookId}`
                .replace(`{${"bookId"}}`, encodeURIComponent(String(bookId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {FeedbackRequest} feedbackRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveFeedback: async (feedbackRequest: FeedbackRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'feedbackRequest' is not null or undefined
            assertParamExists('saveFeedback', 'feedbackRequest', feedbackRequest)
            const localVarPath = `/feedback`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(feedbackRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * FeedbackApi - functional programming interface
 * @export
 */
export const FeedbackApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = FeedbackApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} bookId 
         * @param {number} [page] 
         * @param {number} [size] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAllFeedbacksByBook(bookId: number, page?: number, size?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageResponseFeedbackResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAllFeedbacksByBook(bookId, page, size, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {FeedbackRequest} feedbackRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saveFeedback(feedbackRequest: FeedbackRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saveFeedback(feedbackRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * FeedbackApi - factory interface
 * @export
 */
export const FeedbackApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = FeedbackApiFp(configuration)
    return {
        /**
         * 
         * @param {number} bookId 
         * @param {number} [page] 
         * @param {number} [size] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllFeedbacksByBook(bookId: number, page?: number, size?: number, options?: any): AxiosPromise<PageResponseFeedbackResponse> {
            return localVarFp.findAllFeedbacksByBook(bookId, page, size, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {FeedbackRequest} feedbackRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveFeedback(feedbackRequest: FeedbackRequest, options?: any): AxiosPromise<number> {
            return localVarFp.saveFeedback(feedbackRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * FeedbackApi - interface
 * @export
 * @interface FeedbackApi
 */
export interface FeedbackApiInterface {
    /**
     * 
     * @param {number} bookId 
     * @param {number} [page] 
     * @param {number} [size] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FeedbackApiInterface
     */
    findAllFeedbacksByBook(bookId: number, page?: number, size?: number, options?: AxiosRequestConfig): AxiosPromise<PageResponseFeedbackResponse>;

    /**
     * 
     * @param {FeedbackRequest} feedbackRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FeedbackApiInterface
     */
    saveFeedback(feedbackRequest: FeedbackRequest, options?: AxiosRequestConfig): AxiosPromise<number>;

}

/**
 * Request parameters for findAllFeedbacksByBook operation in FeedbackApi.
 * @export
 * @interface FeedbackApiFindAllFeedbacksByBookRequest
 */
export interface FeedbackApiFindAllFeedbacksByBookRequest {
    /**
     * 
     * @type {number}
     * @memberof FeedbackApiFindAllFeedbacksByBook
     */
    readonly bookId: number

    /**
     * 
     * @type {number}
     * @memberof FeedbackApiFindAllFeedbacksByBook
     */
    readonly page?: number

    /**
     * 
     * @type {number}
     * @memberof FeedbackApiFindAllFeedbacksByBook
     */
    readonly size?: number
}

/**
 * Request parameters for saveFeedback operation in FeedbackApi.
 * @export
 * @interface FeedbackApiSaveFeedbackRequest
 */
export interface FeedbackApiSaveFeedbackRequest {
    /**
     * 
     * @type {FeedbackRequest}
     * @memberof FeedbackApiSaveFeedback
     */
    readonly feedbackRequest: FeedbackRequest
}

/**
 * FeedbackApi - object-oriented interface
 * @export
 * @class FeedbackApi
 * @extends {BaseAPI}
 */
export class FeedbackApi extends BaseAPI implements FeedbackApiInterface {
    /**
     * 
     * @param {FeedbackApiFindAllFeedbacksByBookRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FeedbackApi
     */
    public findAllFeedbacksByBook(requestParameters: FeedbackApiFindAllFeedbacksByBookRequest, options?: AxiosRequestConfig) {
        return FeedbackApiFp(this.configuration).findAllFeedbacksByBook(requestParameters.bookId, requestParameters.page, requestParameters.size, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {FeedbackApiSaveFeedbackRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FeedbackApi
     */
    public saveFeedback(requestParameters: FeedbackApiSaveFeedbackRequest, options?: AxiosRequestConfig) {
        return FeedbackApiFp(this.configuration).saveFeedback(requestParameters.feedbackRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
