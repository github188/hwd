package com.springapp.mvc.web.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;

/**
 * Created by lyp on 2015-12-23.
 * RestTemplate异常处理
 * http://www.mkyong.com/spring-mvc/spring-mvc-exceptionhandler-example/
 */
public class MyErrorHandler implements ResponseErrorHandler {
    @Override
    public boolean hasError(ClientHttpResponse clientHttpResponse) throws IOException {
        if (clientHttpResponse.getStatusCode() != HttpStatus.OK) {
            System.out.println(clientHttpResponse.getStatusCode());
            if (clientHttpResponse.getStatusCode() == HttpStatus.FORBIDDEN) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void handleError(ClientHttpResponse clientHttpResponse) throws IOException {
        if (hasError(clientHttpResponse)) {
            System.out.println(clientHttpResponse.getStatusCode());
        }
    }
}
