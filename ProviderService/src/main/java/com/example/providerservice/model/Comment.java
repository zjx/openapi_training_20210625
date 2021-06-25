package com.example.providerservice.model;

public class Comment {

  private Long id;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Comment(Long id, String description) {
    this.id = id;
    this.description = description;
  }

  private String description;
}
