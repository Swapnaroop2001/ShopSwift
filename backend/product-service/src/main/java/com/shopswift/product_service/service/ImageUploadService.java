package com.shopswift.product_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.regions.Region;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImageUploadService {

    private final S3Client s3Client;
    private final String bucketName;

    public ImageUploadService(
            @Value("${aws.s3.bucket}") String bucketName,
            @Value("${aws.s3.region}") String region) {
        this.bucketName = bucketName;
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .build();
    }
    
    public List<String> uploadImages(List<MultipartFile> images) throws IOException {
        if (images == null || images.isEmpty()) {
            return new ArrayList<>(); // Return empty list if no images provided
        }
        System.out.println("hello");
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            if (image != null && !image.isEmpty()) {
                String fileName = UUID.randomUUID() + "-" + image.getOriginalFilename();
                PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(fileName)
                        .build();
                s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(image.getInputStream(), image.getSize()));
                String imageUrl = "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
                imageUrls.add(imageUrl);
                System.out.println(imageUrls);
            }
        }

        return imageUrls;
    }
}