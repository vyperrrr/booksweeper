package com.cicau.book.service;

import com.amazonaws.services.s3.AmazonS3;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final AmazonS3 amazonS3;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    public String upload(@NonNull MultipartFile file) throws IOException {
        amazonS3.putObject(bucketName, file.getName(), file.getInputStream(), null);
        return amazonS3.getUrl(bucketName, file.getName()).toString();
    }
}
