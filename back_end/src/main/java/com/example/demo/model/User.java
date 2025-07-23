package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;
    private String aadhar;
    private String password; // ✅ Added password field

    // Constructors
    public User() {}

    public User(String email, String aadhar, String password) {
        this.email = email;
        this.aadhar = aadhar;
        this.password = password;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getAadhar() {
        return aadhar;
    }

    public String getPassword() {
        return password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAadhar(String aadhar) {
        this.aadhar = aadhar;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
