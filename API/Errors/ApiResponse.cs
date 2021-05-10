﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            //null coalescing operator in this case if message is null then GetDefaultMessageForStatusCode method will execute
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request, you have made",
                401 => "Authorized You are not",
                403 => "Forbidden from doing this, you are",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Error lead to anger. Anger lead to hate. Hate leads to career change",
                _ => null
            };
        }

        
    }
}
