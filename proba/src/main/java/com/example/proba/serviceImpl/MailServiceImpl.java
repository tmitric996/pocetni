package com.example.proba.serviceImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl {


    @Autowired
    JavaMailSender javaMailSender;
    @Autowired
    Environment env;

    @Async
    public void sendNotificaitionAsync(String name, String email) throws MailException, InterruptedException, MessagingException {

        System.out.println("Slanje emaila...");
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");

        String htmlMsg = "<h3>Hello "+name+"</h3><br> Your account is verified</p>";
        System.out.println(htmlMsg);
        mimeMessage.setContent(htmlMsg, "text/html");
        helper.setTo(email);
        helper.setSubject("Verification");
        helper.setFrom(env.getProperty("spring.mail.username"));
        javaMailSender.send(mimeMessage);
        System.out.println("Email poslat!");
    }
}
