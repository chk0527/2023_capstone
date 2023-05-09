package com.example.springserver;

import javax.persistence.*;

@Entity
@Table(name = "video_info")
public class VideoInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description;
    private String link;
    private String image;


    public void setLink(String link) {
        this.link = link;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setImage(String image) {
        this.image = image;
    }


    public int getId() {
        return id;
    }
    public String getTitle() { return title; }
    public String getLink() {
        return link;
    }
    public String getDescription() {
        return description;
    }
    public String getImage() {
        return image;
    }

}