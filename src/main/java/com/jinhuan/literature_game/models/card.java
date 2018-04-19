package com.jinhuan.literature_game.models;

public class card {
    private String suit;
    private String point;

    public String getSuit() {
        return suit;
    }

    public void setSuit(String suit) {
        this.suit = suit;
    }

    public String getPoint() {
        return point;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public static class Builder {
        private String suit;
        private String point;
        public Builder suit(String suit){
            this.suit=suit;
            return this;
        }

        public Builder point(String point){
            this.point=point;
            return this;
        }
    }
}
