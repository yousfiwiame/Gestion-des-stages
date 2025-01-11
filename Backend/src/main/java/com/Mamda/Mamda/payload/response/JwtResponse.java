package com.Mamda.Mamda.payload.response;

import lombok.Data;

@Data
public class JwtResponse {
  private String token;
  private int id;
  private String username;
  private String email;
  private String role;
  private String redirectUrl;

  public JwtResponse(String token, int id, String username, String email, String role, String redirectUrl) {
    this.token = token;
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.redirectUrl = redirectUrl;
  }

public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getRedirectUrl() {
    return redirectUrl;
  }

  public void setRedirectUrl(String redirectUrl) {
    this.redirectUrl = redirectUrl;
  }
}
