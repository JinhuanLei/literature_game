package com.jinhuan.literature_game.exceptions;



import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.PAYMENT_REQUIRED, reason="NoCard")
public class BadRequestException extends Exception {

}
