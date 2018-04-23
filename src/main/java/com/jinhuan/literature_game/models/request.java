package com.jinhuan.literature_game.models;

import java.util.ArrayList;
import java.util.List;

public class request {
    private List<card> cards = new ArrayList<card>();

    public List<card> getCards() {
        return cards;
    }

    public void setCards(List<card> cards) {
        this.cards = cards;
    }
}
