<?php

use Illuminate\Support\Facades\Response;

if(!function_exists("errorResponse")) {
    function errorResponse($message, $code = 500) {
        return Response::json(['success' => false, 'message' => $message], $code);
    }
}
if(!function_exists("successResponse")) {
    function successResponse($message, $code = 200) {
        return Response::json(['success' => true, 'message' => $message], $code);
    }
}