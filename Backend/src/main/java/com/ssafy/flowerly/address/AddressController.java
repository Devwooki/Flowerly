package com.ssafy.flowerly.address;


import com.fasterxml.jackson.databind.ser.std.InetAddressSerializer;
import com.ssafy.flowerly.address.service.AddressService;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;
    @GetMapping
    public DataResponse<?> getSido(){
        return new DataResponse<>(HttpStatus.OK.value(), "시도 반환", addressService.getSido());
    }

    @GetMapping("/sigungu/${sidoCode}")
    public DataResponse<?> getSido(@PathVariable Long sidoCode){
        return new DataResponse<>(HttpStatus.OK.value(), "시도 반환", addressService.getSigungu(sidoCode));
    }
}
