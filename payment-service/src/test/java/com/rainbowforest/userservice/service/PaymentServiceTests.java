package com.rainbowforest.paymentservice.service;

import com.rainbowforest.paymentservice.entity.Payment;
import com.rainbowforest.paymentservice.repository.PaymentRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PaymentServiceTests {

    private final Long PAYMENT_ID = 1L;
    private final Long ORDER_ID = 101L;
    private final String STATUS = "SUCCESS";
    
    private Payment payment;
    private List<Payment> paymentList;

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentServiceImpl paymentService; 

    @Before
    public void setUp(){
        payment = new Payment();
        payment.setId(PAYMENT_ID);
        payment.setOrderId(ORDER_ID);
        payment.setStatus(STATUS);
        payment.setAmount(500000.0);
        
        paymentList = new ArrayList<>();
        paymentList.add(payment);
    }

    @Test
    public void get_all_payments_test(){
        // given
        when(paymentRepository.findAll()).thenReturn(paymentList);

        // when
        List<Payment> foundPayments = paymentService.getAllPayments();

        // then
        assertEquals(foundPayments.get(0).getOrderId(), ORDER_ID);
        Mockito.verify(paymentRepository, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(paymentRepository);
    }

    @Test
    public void get_payment_by_id_test(){
        // given
        // Trong Spring Boot 2.1.5, findById trả về Optional
        when(paymentRepository.findById(anyLong())).thenReturn(Optional.of(payment));

        // when
        Payment foundPayment = paymentService.getPaymentById(PAYMENT_ID);

        // then
        assertEquals(foundPayment.getOrderId(), ORDER_ID);
        Mockito.verify(paymentRepository, Mockito.times(1)).findById(anyLong());
        Mockito.verifyNoMoreInteractions(paymentRepository);
    }

    @Test
    public void get_payment_by_order_id_test(){
        // given
        // Giả sử service của bạn có hàm tìm theo mã đơn hàng
        when(paymentRepository.findByOrderId(anyLong())).thenReturn(payment);

        // when
        Payment foundPayment = paymentService.getPaymentByOrderId(ORDER_ID);

        // then
        assertEquals(foundPayment.getId(), PAYMENT_ID);
        Mockito.verify(paymentRepository, Mockito.times(1)).findByOrderId(ORDER_ID);
        Mockito.verifyNoMoreInteractions(paymentRepository);
    }
}