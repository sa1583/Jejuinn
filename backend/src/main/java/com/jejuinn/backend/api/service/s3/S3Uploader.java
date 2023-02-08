package com.jejuinn.backend.api.service.s3;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.repository.ImageRepository;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@NoArgsConstructor
public class S3Uploader {
    private AmazonS3 s3Client;

    @Autowired
    private ImageRepository imageRepository;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    public String upload(MultipartFile file, String type) throws IOException {
        String fileName =  generateRandomFileName(file.getOriginalFilename(), type);

        ObjectMetadata objMeta = new ObjectMetadata();
        byte[] bytes = IOUtils.toByteArray(file.getInputStream());
        objMeta.setContentLength(bytes.length);
        ByteArrayInputStream byteArrayIs = new ByteArrayInputStream(bytes);

        s3Client.putObject(new PutObjectRequest(bucket, fileName, byteArrayIs, objMeta)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        log.info("이미지 저장 : {}", s3Client.getUrl(bucket, fileName).toString().substring(7));
        return fileName;
    }

    public void delete(Long uid) throws IOException{
        String fileName = imageRepository.findImgPathByUid(uid);
        imageRepository.deleteById(uid);
        s3Client.deleteObject(bucket, fileName);
//        imageRepository.
//
//        s3Client.deleteObject(bucket, fileName);
    }

    private String generateRandomFileName(String value, String type) throws IOException{
        return "image/"+type+"/"+UUID.randomUUID()+"_"+value;
    }

    public void uploadImages(List<MultipartFile> images, String guestType, Long uid) throws IOException {
        for (MultipartFile image : images) {
            String imgPath= upload(image, guestType);
            imageRepository.save(Image.init(guestType, uid, imgPath));
        }
    }

    public void uploadImage(MultipartFile image, String guestType, Long uid) throws IOException {
        String imgPath= upload(image, guestType);
        imageRepository.save(Image.init(guestType, uid, imgPath));
    }

    public void deleteImages(List<Long> list) throws IOException {
        for (Long uid : list) {
            delete(uid);
        }
    }
}
