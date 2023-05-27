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
    private String object;
    private String ava_label;
    private String link;
    private String image;

    private String category;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


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
    public void setObject(String object) { this.object = object; }
    public void setAva_label(String ava_label) { this.ava_label = ava_label; }

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
    public String getObject() { return object; }
    public String getAva_label() { return ava_label; }
}