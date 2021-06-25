package com.example.providerservice.service;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>description：自动发布接口地址注解</p>
 *
 * @author newzhong
 * @version 1.0
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoPublish {
    /**
     *<p>description：发布地址</p>
     * @return String
     * @author newzhong
     */
    String publishAddress();
}

