package com.jinhuan.literature_game.models;

import java.util.List;

public class player {
    private int id;
    private List<card> cards;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<card> getCards() {
        return cards;
    }

    public void setCards(List<card> cards) {
        this.cards = cards;
    }


}
