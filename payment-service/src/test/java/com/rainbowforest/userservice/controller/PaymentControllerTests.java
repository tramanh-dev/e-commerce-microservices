package com.rainbowforest.paymentservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rainbowforest.paymentservice.entity.Payment;
import com.rainbowforest.paymentservice.repository.PaymentRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PaymentControllerTests {

    private final Long PAYMENT_ID = 1L;
    private final Long ORDER_ID = 101L;
    private final Double AMOUNT = 500000.0;
    private final String STATUS_SUCCESS = "SUCCESS";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PaymentRepository paymentRepository; // Mock thẳng Repo luôn

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ObjectMapper objectMapper;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    // 1. Test lấy tất cả thanh toán - Trả về 200 OK
    @Test
    public void get_all_payments_should_return200_when_exist() throws Exception {
        // given
        Payment payment = new Payment();
        payment.setId(PAYMENT_ID);
        payment.setOrderId(ORDER_ID);
        List<Payment> paymentList = new ArrayList<>();
        paymentList.add(payment);

        // when
        when(paymentRepository.findAll()).thenReturn(paymentList);

        // then
        mockMvc.perform(get("/payment/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$[0].id").value(PAYMENT_ID))
                .andExpect(jsonPath("$[0].orderId").value(ORDER_ID));

        verify(paymentRepository, times(1)).findAll();
    }

    // 2. Test tạo thanh toán mới - Trả về 200 OK (theo controller của Trâm Anh)
    @Test
    public void create_payment_should_return200_when_valid() throws Exception {
        // given
        Payment payment = new Payment();
        payment.setOrderId(ORDER_ID);
        payment.setAmount(AMOUNT);

        // when
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        // then
        mockMvc.perform(post("/payment/create")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(payment)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(ORDER_ID));

        verify(paymentRepository, times(1)).save(any(Payment.class));
    }

    // 3. Test tìm theo Order ID
    @Test
    public void get_payment_by_order_id_should_return200() throws Exception {
        // given
        Payment payment = new Payment();
        payment.setOrderId(ORDER_ID);
        payment.setStatus(STATUS_SUCCESS);
        List<Payment> list = new ArrayList<>();
        list.add(payment);

        // when (Logic controller là findAll rồi lọc stream)
        when(paymentRepository.findAll()).thenReturn(list);

        // then
        mockMvc.perform(get("/payment/order/{orderId}", ORDER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(ORDER_ID))
                .andExpect(jsonPath("$.status").value(STATUS_SUCCESS));
    }
}