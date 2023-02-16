package com.jejuinn.backend.api.service;

import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService{

    private final JavaMailSender emailSender;

    public static final String ePw = createKey();

    private MimeMessage createMessage(String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ePw);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("[Jejuinn] 비밀번호 초기화 안내 메일입니다.");//제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h2> 안녕하세요 JejuInn 입니다. </h2>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 복사해 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>비밀번호 변경 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("ssafy.jaewook@gmail.com","jejuinn"));//보내는 사람

        return message;
    }

    private MimeMessage createMessage(String to, String url, GuestHouse guestHouse)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("[Jejuinn] 화상 면접 안내 링크입니다.");//제목
        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h2> 안녕하세요 JejuInn 입니다. </h2>";
        msgg+= "<br>";
        msgg+= "<p>아래의 링크를 눌러 \""+guestHouse.getGuestHouseName()+"\" 게스트 하우스의 면접해 참여해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>\""+guestHouse.getGuestHouseName()+"\" 게스트 하우스의 화상 면접 접속 링크입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "<a href=\"";
        msgg+= url+"\">"+ url +"</a><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(guestHouse.getEmail(),guestHouse.getGuestHouseName()));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    public String sendMessage(String to)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = createMessage(to);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }

    public String sendMessage(String to, String url, GuestHouse guestHouse)throws Exception {
        MimeMessage message = createMessage(to, url, guestHouse);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }
}

