package com.rainbowforest.paymentservice.controller;

import java.net.URLEncoder;

import com.rainbowforest.paymentservice.config.VnPayConfig;
import com.rainbowforest.paymentservice.entity.Payment;
import com.rainbowforest.paymentservice.repository.PaymentRepository;
import com.rainbowforest.paymentservice.util.VNPayUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/create")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        payment.setStatus("PENDING");
        return ResponseEntity.ok(paymentRepository.save(payment));
    }

    @GetMapping("/all")
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @GetMapping("/vnpay-return")
    public void handleVnPayReturn(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String orderIdStr = request.getParameter("vnp_TxnRef");
        String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
        String vnp_SecureHash = request.getParameter("vnp_SecureHash");

        // TODO: verify hash (tạm thời chưa cần nếu mới test)
        if ("00".equals(vnp_ResponseCode)) {
            Long orderId = Long.parseLong(orderIdStr);

            Payment payment = paymentRepository.findByOrderId(orderId);
            if (payment != null) {
                payment.setStatus("SUCCESS");
                paymentRepository.save(payment);
            }

            response.sendRedirect("http://localhost:5173/payment-success?orderId=" + orderIdStr);

        } else {
            response.sendRedirect("http://localhost:5173/payment-fail");
        }
    }

    @GetMapping("/vnpay-link")
    public ResponseEntity<?> getVnPayLink(
            @RequestParam("orderId") String orderId,
            @RequestParam("amount") long amount,
            HttpServletRequest request) {

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "Thanh toan don hang: " + orderId;
        String vnp_OrderType = "other";
        String vnp_TxnRef = orderId;
        String vnp_IpAddr = request.getRemoteAddr();
        String vnp_TmnCode = VnPayConfig.vnp_TmnCode;

        long vnp_Amount = Math.round(amount * 100);

        java.util.Map<String, String> vnp_Params = new java.util.HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(vnp_Amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VnPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        // Lấy thời gian hiện tại
        java.util.Calendar cld = java.util.Calendar.getInstance(java.util.TimeZone.getTimeZone("Etc/GMT+7"));
        java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator<String> iterator = fieldNames.iterator();

        while (iterator.hasNext()) {
            String fieldName = iterator.next();
            String fieldValue = vnp_Params.get(fieldName);

            if (fieldValue != null && fieldValue.length() > 0) {

                String encodedName = URLEncoder.encode(fieldName, StandardCharsets.UTF_8).replace("+", "%20");
                String encodedValue = URLEncoder.encode(fieldValue, StandardCharsets.UTF_8).replace("+", "%20");

                // HASH DATA
                hashData.append(encodedName);
                hashData.append("=");
                hashData.append(encodedValue);

                // QUERY
                query.append(encodedName);
                query.append("=");
                query.append(encodedValue);

                if (iterator.hasNext()) {
                    hashData.append("&");
                    query.append("&");
                }
            }
        }

        String queryUrl = query.toString();
        String vnp_SecureHash = VnPayConfig.hmacSHA512(
                VnPayConfig.vnp_HashSecret,
                hashData.toString());

        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VnPayConfig.vnp_PayUrl + "?" + queryUrl;
        java.util.Map<String, String> result = new java.util.HashMap<>();
        result.put("url", paymentUrl);

        return ResponseEntity.ok(result);
    }
}